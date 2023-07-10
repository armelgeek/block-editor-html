import React from 'react'
import { usePlayerMusicInfo } from '../../../../../store/player/hook'
// import { toast } from '../../../../utils/tools'
import { useSettingValue } from '../../../../../store/setting/hook'
import { useTheme } from '../../../../../store/theme/hook'
import playerState from '../../../../../store/player/state'
import { LIST_IDS } from '../../../../../config/constant'
import _ from 'lodash';


export default () => {
  // const { t } = useTranslation()
  const musicInfo = usePlayerMusicInfo()
  const downloadFileName = useSettingValue('download.fileName')
  const theme = useTheme()

  const handlePress = () => {
    // console.log('')
    // console.log(playMusicInfo)
    if (!musicInfo.id) return
   // navigations.pushPlayDetailScreen(commonState.componentIds.home as string)
    // toast(global.i18n.t('play_detail_todo_tip'), 'long')
  }

  const handleLongPress = () => {
    const listId = playerState.playMusicInfo.listId
    if (!listId || listId == LIST_IDS.DOWNLOAD) return
    global.app_event.jumpListPosition()
  }
  // console.log('render title')

  const title = musicInfo.id ? downloadFileName.replace('歌手', musicInfo.singer).replace('歌名', musicInfo.name) : ''
  // console.log(playMusicInfo)
  return (
    <div style={{ width: '100%', textAlign:'center',marginBottom:20}} onClick={handlePress}>
      {title}
    </div>
  )
}
// const Singer = () => {
//   const playMusicInfo = useGetter('player', 'playMusicInfo')
//   return (
//     <View style={{ flexGrow: 0, flexShrink: 0 }}>
//       <Text style={{ width: '100%', color: AppColors.normal }} numberOfLines={1}>
//         {playMusicInfo ? playMusicInfo.musicInfo.singer : ''}
//       </Text>
//     </View>
//   )
// }
// const MusicName = () => {
//   const playMusicInfo = useGetter('player', 'playMusicInfo')
//   return (
//     <View style={{ flexGrow: 0, flexShrink: 1 }}>
//       <Text style={{ width: '100%', color: AppColors.normal }} numberOfLines={1}>
//         {playMusicInfo ? playMusicInfo.musicInfo.name : '^-^'}
//       </Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({

// })
