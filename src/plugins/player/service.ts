import { exitApp } from '../../core/common'
import { getCurrentTrackId } from './playList'
import { pause, play, playNext, playPrev } from '../../core/player/player'
let isInitialized = false


//audio context

const registerPlaybackService =  async () => {
  //if (isInitialized) return
  console.log('reg services...')
  //isInitialized = true

}


export default () => {
  //if (global.lx.playerStatus.isRegisteredService) return
  registerPlaybackService().then(() => {
    console.log('handle registerPlaybackService...')
  });
  global.lx.playerStatus.isRegisteredService = true
}
