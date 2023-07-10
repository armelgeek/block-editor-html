import playerActions from '../../store/player/action'
import playerState from '../../store/player/state'
import { pause, playNext, stop } from './player'
import { setPlayMusicInfo } from './playInfo'


/**
 * 添加歌曲到稍后播放列表
 * @param list 歌曲列表
 */
export const addTempPlayList = (list: LX.Player.TempPlayListItem[]) => {
  playerActions.addTempPlayList(list)
  if (!playerState.playMusicInfo.musicInfo) void playNext()
}
/**
 * 从稍后播放列表移除歌曲
 * @param index 歌曲位置
 */
export const removeTempPlayList = (index: number) => {
  playerActions.removeTempPlayList(index)
}
/**
 * 清空稍后播放列表
 */
export const clearTempPlayeList = () => {
  playerActions.clearTempPlayeList()
}
// ndraindray misy ereur 0
export const addToStudioPlayList = async (list: any) => {
  try {
    global.app_event.setProgress(0);
    setPlayMusicInfo(null, null);
    playerActions.addToStudioPlayList(list)
    // await pause();
    setTimeout(() => {
      if (!playerState.playMusicInfo.musicInfo) void playNext()
    })
  } catch (err) {
    console.log(err);
  }
}
export const clearActualPlay=()=>{
  setPlayMusicInfo(null, null);
  global.app_event.setProgress(0);
}

export const clearStudioPlayList = () => {
  playerActions.clearStudioPlayList()
}