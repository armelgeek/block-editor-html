//import TrackPlayer, { State } from 'react-native-track-player'
//import BackgroundTimer from 'react-native-background-timer'
import { defaultUrl } from '../../config'
// import { action as playerAction } from '../../../store/modules/player'
import settingState from '../../store/setting/state'


const list: LX.Player.Track[] = []

const defaultUserAgent = 'Mozilla/5.0 (Linux; Android 10; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Mobile Safari/537.36'
const httpRxp = /^(https?:\/\/.+|\/.+)/

let isPlaying = false
let prevDuration = -1

// @ts-ignore
const formatMusicInfo = (musicInfo: LX.Player.PlayMusic) => {
  return {
    id: musicInfo.id,
    //pic: musicInfo.meta.picUrl,
    pic: '',
    name: musicInfo.name,
    singer: musicInfo.singer,
    album: ''
    //album: musicInfo.meta.albumName,
  }
}

const buildTracks = (musicInfo: LX.Player.PlayMusic, url: any, duration?: any): LX.Player.Track[] => {
  const mInfo = formatMusicInfo(musicInfo)
  const track = [] as any
  const isShowNotificationImage = settingState.setting['player.isShowNotificationImage']
  const album = mInfo.album || undefined
  const artwork = isShowNotificationImage && mInfo.pic && httpRxp.test(mInfo.pic) ? mInfo.pic : undefined
  if (url) {
    track.push({
      id: `${mInfo.id}__//${Math.random()}__//${url}`,
      url,
      title: mInfo.name || 'Unknow',
      artist: mInfo.singer || 'Unknow',
      album,
      artwork,
      userAgent: defaultUserAgent,
      musicId: mInfo.id,
      // original: { ...musicInfo },
      duration,
    })
  }
  track.push({
    id: `${mInfo.id}__//${Math.random()}__//default`,
    url: defaultUrl,
    title: mInfo.name || 'Unknow',
    artist: mInfo.singer || 'Unknow',
    album,
    artwork,
    musicId: mInfo.id,
    // original: { ...musicInfo },
    duration: 0,
  })
  return track
  // console.log('buildTrack', musicInfo.name, url)
}
export const isTempTrack = (trackId: string) => /\/\/default$/.test(trackId)


export const getCurrentTrackId = async() => {
  const currentTrackIndex = global.lx.trackPlayer.getCurrentTrackIndex()
  return list[currentTrackIndex]?.id
}
export const getCurrentTrack = async() => {
  const currentTrackIndex = global.lx.trackPlayer.getCurrentTrackIndex()
  return list[currentTrackIndex];
}

export const updateMetaData = async(musicInfo: LX.Player.MusicInfo, isPlay: boolean, force = false) => {
  if (!force && isPlay == isPlaying) {
    const duration = global.lx.trackPlayer.getDuration()
    if (prevDuration != duration) {
      prevDuration = duration
      const trackInfo = await getCurrentTrack()
      if (trackInfo && musicInfo) {
        delayUpdateMusicInfo(musicInfo)
      }
    }
  } else {
    const [duration, trackInfo] = await Promise.all([
      global.lx.trackPlayer.getDuration(), getCurrentTrack()
    ])
    prevDuration = duration
    if (trackInfo && musicInfo) {
      delayUpdateMusicInfo(musicInfo)
    }
  }
}

const handlePlayMusic = async(musicInfo: LX.Player.PlayMusic, url: string, time: number) => {

  const tracks = buildTracks(musicInfo, url)
  const track = tracks[0]
  //await updateMusicInfo(track)
  const currentTrackIndex = global.lx.trackPlayer.getCurrentTrack()
  global.lx.trackPlayer.add(tracks)
  list.push(...tracks);
  const queue = await global.lx.trackPlayer.getQueue();
  await global.lx.trackPlayer.playTrack(queue.findIndex(t => t.id == track.id))

  if (currentTrackIndex == null) {
    if (!isTempTrack(track.id)) {
      if (time) await global.lx.trackPlayer.seekTo(time)
      if (global.lx.restorePlayInfo) {
        await global.lx.trackPlayer.pause()
        // let startupAutoPlay = settingState.setting['player.startupAutoPlay']
        global.lx.restorePlayInfo = null

      // TODO startupAutoPlay
      // if (startupAutoPlay) store.dispatch(playerAction.playMusic())
      } else {
        await global.lx.trackPlayer.playTrack(queue.findIndex(t => t.id == track.id))
      }
    }
  } else {
    await global.lx.trackPlayer.pause()
    if (!isTempTrack(track.id)) {

      await global.lx.trackPlayer.seekTo(time)
    }
  }

  if (queue.length > 2) {
    void global.lx.trackPlayer.remove(Array(queue.length - 2).fill(null).map((_, i) => i))
    list.splice(0, list.length - 2);
  }
}
let playPromise = Promise.resolve()
let actionId = Math.random()
export const playMusic = (musicInfo: LX.Player.PlayMusic, url: string, time: number) => {
  const id = actionId = Math.random()
  playPromise.finally(() => {
    if (id != actionId) return
    playPromise = handlePlayMusic(musicInfo, url, time)
  })
}

// let musicId = null
// let duration = 0
// let artwork = null
const updateMetaInfo = async(mInfo: LX.Player.MusicInfo) => {
  const isShowNotificationImage = settingState.setting['player.isShowNotificationImage']
  isPlaying = global.lx.ac.state == 'running'
  await global.lx.trackPlayer.updateNowPlayingMetadata({
    title: mInfo.name ?? 'Unknow',
    artist: mInfo.singer ?? 'Unknow',
    album: mInfo.album ?? undefined,
    artwork: isShowNotificationImage ? mInfo.pic ?? undefined : undefined,
    duration: prevDuration || 0,
  }, isPlaying)
}

const debounceUpdateMetaInfoTools = {
  updateMetaPromise: Promise.resolve(),
  musicInfo: null as LX.Player.MusicInfo | null,
  debounce(fn: (musicInfo: LX.Player.MusicInfo) => void | Promise<void>) {
     let delayTimer = null
    let isDelayRun = false
    let timer: number | null = null
    let _musicInfo: LX.Player.MusicInfo | null = null
    return (musicInfo: LX.Player.MusicInfo) => {
      // console.log('debounceUpdateMetaInfoTools', musicInfo)
      if (timer) {
        timer = null
      }
      // if (delayTimer) {
      //   BackgroundTimer.clearTimeout(delayTimer)
      //   delayTimer = null
      // }
      if (isDelayRun) {
        _musicInfo = musicInfo
        /**timer = BackgroundTimer.setTimeout(() => {
          timer = null
          let musicInfo = _musicInfo
          _musicInfo = null
          if (!musicInfo) return
          // isDelayRun = false
          void fn(musicInfo)
        }, 1500)**/
      } else {
        isDelayRun = true
        void fn(musicInfo)
        /**BackgroundTimer.setTimeout(() => {
          // delayTimer = null
          isDelayRun = false
        }, 1000)**/
      }
    }
  },
  init() {
    return this.debounce(async(musicInfo: LX.Player.MusicInfo) => {
      this.musicInfo = musicInfo
      return this.updateMetaPromise.then(() => {
        // console.log('run')
        if (this.musicInfo?.id === musicInfo.id) {
          this.updateMetaPromise = updateMetaInfo(musicInfo)
        }
      })
    })
  },
}

export const delayUpdateMusicInfo = debounceUpdateMetaInfoTools.init()

// export const delayUpdateMusicInfo = ((fn, delay = 800) => {
//   let delayTimer = null
//   let isDelayRun = false
//   let timer = null
//   let _track = null
//   return track => {
//     _track = track
//     if (timer) {
//       BackgroundTimer.clearTimeout(timer)
//       timer = null
//     }
//     if (isDelayRun) {
//       if (delayTimer) {
//         BackgroundTimer.clearTimeout(delayTimer)
//         delayTimer = null
//       }
//       timer = BackgroundTimer.setTimeout(() => {
//         timer = null
//         let track = _track
//         _track = null
//         isDelayRun = false
//         fn(track)
//       }, delay)
//     } else {
//       isDelayRun = true
//       fn(track)
//       delayTimer = BackgroundTimer.setTimeout(() => {
//         delayTimer = null
//         isDelayRun = false
//       }, 500)
//     }
//   }
// })(track => {
//   console.log('+++++delayUpdateMusicPic+++++', track.artwork)
//   updateMetaInfo(track)
// })
