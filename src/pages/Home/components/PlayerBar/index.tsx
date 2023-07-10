import React, { memo, useMemo } from 'react'
import { useKeyboard } from '../../../../utils/hooks'

import Title from './components/Title'
import PlayInfo from './components/PlayInfo'
import ControlBtn from './components/ControlBtn'
// import { useSettingValue } from '../../../../store/setting/hook'
import { useTheme } from '../../../../store/theme/hook'
import { useSettingValue } from '../../../../store/setting/hook'
import { usePlayMusicInfo } from '../../../../store/player/hook'
import { Link } from 'react-router-dom'
export default memo(() => {
  // const { onLayout, ...layout } = useLayout()
  const { musicInfo } = usePlayMusicInfo()

  const { keyboardShown } = useKeyboard()
  const theme = useTheme()
  const autoHidePlayBar = useSettingValue('common.autoHidePlayBar')

  const playerComponent = useMemo(() => (
    <Link to={"/song/player"} style={{
        position:'fixed',
        bottom:20,
        left:50,
        right:50,
        padding:20,
        borderColor: theme['c-button-font-selected'],
        backgroundColor:'white',
        border:'1px solid #000',
        flexDirection: 'row' }}>
        <Title />
        <div style={{
            display:'flex',
            flexDirection:'row',
            justifyContent: 'space-between',
            alignItems:'center'
        }}>
        {/**<Pic/>**/}

        <PlayInfo />
        <ControlBtn />
        </div>
    </Link>
  ), [theme])

  // console.log('render pb')
  //console.log(musicInfo?.isStudio);
  return (autoHidePlayBar && keyboardShown) || (musicInfo?.isStudio != undefined) ? null : playerComponent
})
