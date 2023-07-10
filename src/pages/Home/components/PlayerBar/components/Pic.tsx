import React, { memo } from 'react'
import { usePlayerMusicInfo } from '../../../../../store/player/hook'
import { useTheme } from '../../../../../store/theme/hook'
import { scaleSizeH } from '../../../../../utils/pixelRatio'
import { createStyle } from '../../../../../utils/tools'
import { BorderRadius } from '../../../../../theme'
import commonState from '../../../../../store/common/state'
import playerState from '../../../../../store/player/state'
import { LIST_IDS, NAV_SHEAR_NATIVE_IDS } from '../../../../../config/constant'

const PIC_HEIGHT = scaleSizeH(46)

const styles = createStyle({
  // content: {
  // marginBottom: 3,
  // },/
  emptyPic: {
    borderRadius: BorderRadius.normal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingLeft: 2,
  },
})

const EmptyPic = memo(() => {
  const theme = useTheme()
  return (
    <div style={{ width: PIC_HEIGHT, height: PIC_HEIGHT, backgroundColor: theme['c-primary-light-900-alpha-200'] }}>
      <p>T</p>
      <p>K</p>
    </div>
  )
})

export default () => {
  const musicInfo = usePlayerMusicInfo()
  const handlePress = () => {
    // console.log('')
    // console.log(playMusicInfo)
    if (!musicInfo.id) return
    //navigations.pushPlayDetailScreen(commonState.componentIds.home as string)

    // toast(global.i18n.t('play_detail_todo_tip'), 'long')
  }

  const handleLongPress = () => {
    const listId = playerState.playMusicInfo.listId
    if (!listId || listId == LIST_IDS.DOWNLOAD) return
    global.app_event.jumpListPosition()
  }

  // console.log('render pic')

  return (
    <button  onClick={handlePress}>
      {
        musicInfo.pic
          ? (
              <img src={musicInfo.pic} style={{
                // ...styles.playInfoImg,
                // backgroundColor: theme.primary,
                width: PIC_HEIGHT,
                height: PIC_HEIGHT,
              }} />
            )
          : <EmptyPic />
      }
    </button>
  )
}


// const styles = StyleSheet.create({
//   playInfoImg: {

//   },
// })
