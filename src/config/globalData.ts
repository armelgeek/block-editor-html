import { createAppEventHub } from '../event/appEvent'
import { createListEventHub } from '../event/listEvent'
import { createStateEventHub } from '../event/stateEvent'

// global.i18n = null

// let screenW = Dimensions.get('window').width
// let screenH = Dimensions.get('window').height
// if (screenW > screenH) {
//   const temp = screenW
//   screenW = screenH
//   screenH = temp
// }
import AudioStore from "../plugins/streams/audiostore";
import TrackPlayer from "../plugins/streams/player";
import Streamer from "../plugins/streams/streamer";
const ac = new (window.AudioContext)();
const store = new AudioStore(ac);
async function init() {
  await store.init()
}
init().then(r => console.log('store audio init ...'));
const streamer = new Streamer('', ac , store);
const trackPlayer = new TrackPlayer();
window.global ||= window;
global.lx = {
  fontSize: 1,
  playerStatus: {
    isInitialized: false,
    isRegisteredService: false,
    isIniting: false,
  },
  trackPlayer,
  ac,
  store,
  streamer,
  currentPosition: 0,
  playlist: [],
  playMode: "singleLoop",
  currentTrackIndex:0,
  restorePlayInfo: null,
  // allList: null,
  // globalObj: null,
  // listScrollPosition: {},
  // listSort: {},

  isScreenKeepAwake: false,

  // 是否播放完后退出应用
  isPlayedStop: false,
  
  isStudioPlay: false,

  // prevListPlayIndex: -1,

  // syncKeyInfo: {},

  isEnableSyncLog: false,

  playerTrackId: '',

  gettingUrlId: '',

  qualityList: {},

  jumpMyListPosition: false,

  settingActiveId: 'basic',

  homePagerIdle: true,

  // syncKeyInfo: initValue as LX.Sync.KeyInfo,

  // windowInfo: {
  //   screenW,
  //   screenH,
  //   fontScale: PixelRatio.getFontScale(),
  //   pixelRatio: PixelRatio.get(),
  //   screenPxW: PixelRatio.getPixelSizeForLayoutSize(screenW),
  //   screenPxH: PixelRatio.getPixelSizeForLayoutSize(screenH),
  // },
}
global.audio = null
global.app_event = createAppEventHub()
global.list_event = createListEventHub()
global.state_event = createStateEventHub()
