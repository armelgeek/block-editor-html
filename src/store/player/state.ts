export interface InitState {
  playMusicInfo: {
    /**
     * 当前播放歌曲的列表 id
     */
    musicInfo: LX.Player.PlayMusicInfo['musicInfo'] | null
    /**
     * 当前播放歌曲的列表 id
     */
    listId: LX.Player.PlayMusicInfo['listId'] | null
    /**
     * 是否属于 “稍后播放”
     */
    isTempPlay: boolean,
    isStudioPlay?: boolean | null
  }
  playInfo: LX.Player.PlayInfo
  musicInfo: LX.Player.MusicInfo

  isPlay: boolean
  volume: number
  playRate: number
  statusText: string

  playedList: LX.Player.PlayMusicInfo[]
  tempPlayList: LX.Player.PlayMusicInfo[]
  studioPlayList: LX.Player.PlayStudioMusicInfo[],


  progress: {
    nowPlayTime: number
    maxPlayTime: number
    progress: number
    nowPlayTimeStr: string
    maxPlayTimeStr: string
    nowPlayTimeStrWithMs: string
  },
  modeCreator: boolean,
  playCreatorMusicInfo: {
    musicInfo: LX.Player.PlayMusicInfo['musicInfo'] | null
  }
}

const state: any = {
  playInfo: {
    playIndex: -1,
    playerListId: null,
    playerPlayIndex: -1,
  },
  playMusicInfo: {
    listId: null,
    musicInfo: null,
    isTempPlay: false,
    isStudioPlay: false
  },
  musicInfo: {
    id: null,
    pic: null,
    lrc: null,
    tlrc: null,
    rlrc: null,
    lxlrc: null,
    rawlrc: null,
    // url: null,
    name: '',
    singer: '',
    album: '',
  },

  isPlay: false,
  volume: 1,
  playRate: 1,
  statusText: '',

  playedList: [],
  tempPlayList: [],
  studioPlayList: [],
  progress: {
    nowPlayTime: 0,
    maxPlayTime: 0,
    progress: 0,
    nowPlayTimeStr: '00:00',
    maxPlayTimeStr: '00:00',
    nowPlayTimeStrWithMs: '00:00:00'
  },
  duration: 0,
  modeCreator: false,
  playCreatorMusicInfo: {
    musicInfo: null
  }
}


export default state
