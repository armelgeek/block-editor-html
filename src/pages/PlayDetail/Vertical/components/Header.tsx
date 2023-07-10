import React, { memo, useRef } from 'react'
import { useTheme } from '../../../../store/theme/hook'
import { usePlayerMusicInfo } from '../../../../store/player/hook'
import { scaleSizeH } from '../../../../utils/pixelRatio'
import { HEADER_HEIGHT as _HEADER_HEIGHT, NAV_SHEAR_NATIVE_IDS } from '../../../../config/constant'
import commonState from '../../../../store/common/state'
//import SettingPopup, { type SettingPopupType } from '../../../components/SettingPopup'

const HEADER_HEIGHT = scaleSizeH(_HEADER_HEIGHT)


const Title = () => {
  const theme = useTheme()
  const musicInfo = usePlayerMusicInfo()


  return (
    <div>
      <p>{musicInfo.name}</p>
      <p>{musicInfo.singer}</p>
    </div>
  )
}

export default memo(() => {
 // const popupRef = useRef<SettingPopupType>(null)

  const back = () => {
    //void pop(commonState.componentIds.playDetail as string)
  }
  const showSetting = () => {
   // popupRef.current?.show()
  }

  return (
    <div>
     <div>
        <button onClick={back} style={{ width: HEADER_HEIGHT }}>
          {"<"}
        </button>
        <Title />
        <button onClick={showSetting} style={{ width: HEADER_HEIGHT }}>
          Show setting
        </button>
      </div>
      {/**<SettingPopup ref={popupRef} direction="vertical" />**/}
    </div>
  )
})

