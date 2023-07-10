import React, { memo, useMemo } from 'react'
import { useKeyboard } from '../../../../utils/hooks'

import Title from './components/Title'
import PlayInfo from './components/PlayInfo'
import ControlBtn from './components/ControlBtn'
// import { useSettingValue } from '../../../../store/setting/hook'
import { useTheme } from '../../../../store/theme/hook'
import { useSettingValue } from '../../../../store/setting/hook'
import { usePlayMusicInfo } from '../../../../store/player/hook'
export default memo(() => {
  // const { onLayout, ...layout } = useLayout()
  const { musicInfo } = usePlayMusicInfo()

  const { keyboardShown } = useKeyboard()
  const theme = useTheme()
  const autoHidePlayBar = useSettingValue('common.autoHidePlayBar')

  const playerComponent = useMemo(() => (
    <div style={{ borderColor: theme['c-button-font-selected'],border:'1px solid #000',flexDirection: 'row' }}>
        {/**<Pic/>**/}
        <Title />
          <div>

        {/* <View style={{ ...styles.row, justifyContent: 'space-between' }}>
          <PlayTime />
        </View> */}
        <PlayInfo />
        <ControlBtn />
      </div>
    </div>
  ), [theme])

  // console.log('render pb')
  //console.log(musicInfo?.isStudio);
  return (autoHidePlayBar && keyboardShown) || (musicInfo?.isStudio != undefined) ? null : playerComponent
})
