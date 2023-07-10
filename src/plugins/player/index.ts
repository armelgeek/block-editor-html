//import TrackPlayer from 'react-native-track-player'
import { setVolume, setPlaybackRate } from './utils'
const initial = async({ volume, playRate, cacheSize, isHandleAudioFocus }: {
  volume: number
  playRate: number
  cacheSize: number
  isHandleAudioFocus: boolean
}) => {
  if (global.lx.playerStatus.isIniting || global.lx.playerStatus.isInitialized) return
  global.lx.playerStatus.isIniting = true
  console.log('Cache Size', cacheSize * 1024)
  if (global.audio) return
  global.audio = new window.Audio()
  global.audio.controls = false
  global.audio.autoplay = true
  global.audio.preload = 'auto'
  global.lx.playerStatus.isInitialized = true
  global.lx.playerStatus.isIniting = false
  await setVolume(volume)
  await setPlaybackRate(playRate)
  // listenEvent()
}


const isInitialized = () => global.lx.playerStatus.isInitialized


export {
  initial,
  isInitialized,
  setVolume,
  setPlaybackRate,
}

export {
  setResource,
  setPause,
  setPlay,
  setCurrentTime,
  getDuration,
  setStop,
  resetPlay,
  getPosition,
  updateMetaData,
  onStateChange,
  isEmpty,
} from './utils'
