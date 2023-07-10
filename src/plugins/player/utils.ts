import { playMusic as handlePlayMusic } from './playList'
import Player from "../../plugins/streams/player";
// import { PlayerMusicInfo } from '@/store/modules/player/playInfo'

export { useProgress } from './hook'

const emptyIdRxp = /\/\/default$/
const tempIdRxp = /\/\/default$|\/\/default\/\/restorePlay$/
export const isEmpty = (trackId = global.lx.playerTrackId) => {
  //console.log(trackId)
  return !trackId || emptyIdRxp.test(trackId)
}
export const isTempId = (trackId = global.lx.playerTrackId) => !trackId || tempIdRxp.test(trackId)

const playMusic = ((fn: (musicInfo: LX.Player.PlayMusic, url: string, time: number) => void, delay = 800) => {
  let delayTimer: number | null = null
  let isDelayRun = false
  let timer: number | null = null
  let _musicInfo: LX.Player.PlayMusic | null = null
  let _url = ''
  let _time = 0
  return (musicInfo: LX.Player.PlayMusic, url: string, time: number) => {
    _musicInfo = musicInfo
    _url = url
    _time = time
    if (timer) {
      timer = null
    }
    if (isDelayRun) {
      if (delayTimer) {
        delayTimer = null
      }
      setTimeout(() => {
        timer = null
        let musicInfo = _musicInfo
        let url = _url
        let time = _time
        _musicInfo = null
        _url = ''
        _time = 0
        isDelayRun = false
        fn(musicInfo as LX.Player.PlayMusic, url, time)
      }, 1000)
    } else {
      isDelayRun = true
      fn(musicInfo, url, time)
      setTimeout(() => {
        delayTimer = null
        isDelayRun = false
      }, 500)
    }
  }
})((musicInfo, url, time) => {
  handlePlayMusic(musicInfo, url, time)
})

export const setResource = (musicInfo: LX.Player.PlayMusic, url: string, duration?: number) => {
  playMusic(musicInfo, url, duration ?? 0)
}

export const setPlay = async() => {
  global.lx.trackPlayer.play()
}
export const getPosition = async() => global.lx.trackPlayer.getPosition()
export const getDuration = async() => global.lx.trackPlayer.getDuration()
export const setStop = async() => {
  await global.lx.trackPlayer.stop()
  if (!isEmpty()) await global.lx.trackPlayer.skipToNext()
}
export const setPause = async() => global.lx.trackPlayer.pause()
// export const skipToNext = () => TrackPlayer.skipToNext()
export const setCurrentTime = async(time: number) => global.lx.trackPlayer.seekTo(time)
export const setVolume = async(num: number) => global.lx.trackPlayer.setVolume(num)
export const setPlaybackRate = async(num: number) => global.lx.trackPlayer.setRate(num)

export const resetPlay = async() => Promise.all([setPause(), setCurrentTime(0)])

export const destroy = async() => {
  if (global.lx.playerStatus.isIniting || !global.lx.playerStatus.isInitialized) return
  await global.lx.trackPlayer.destroy()
  global.lx.playerStatus.isInitialized = false
}

type PlayStatus = 'None' | 'Ready' | 'Playing' | 'Paused' | 'Stopped' | 'Buffering' | 'Connecting'

export const onStateChange = async (listener: (state: PlayStatus) => void) => {

  const sub = global.lx.ac.addEventListener('statechange', () => {
    const currentState = global.lx.ac.state;
    const _state: PlayStatus = convertPlaybackState(currentState);
    listener(_state);
  });

  const convertPlaybackState = (state: AudioContextState): PlayStatus => {
    switch (state) {
      case 'suspended':
        return 'Paused';
      case 'running':
        return 'Playing';
      case 'closed':
        return 'Stopped';
      default:
        return 'None';
    }
  };
  return () => {
    global.lx.ac.close(); // Fermer l'AudioContext lorsque vous avez fini de l'utiliser
  };
};
export { updateMetaData } from './playList'
