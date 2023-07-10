import React, { useState } from 'react'
import { useTheme } from '../../../../../store/theme/hook'
import { useSettingValue } from '../../../../../store/setting/hook'
import { updateSetting } from '../../../../../core/common'
//import { useI18n } from '../../../../..//lang'
import { setVolume } from '../../../../../plugins/player/index'


const Volume = () => {
  const theme = useTheme()
  const volume = useSettingValue('player.volume')
  const [sliderSize, setSliderSize] = useState(volume)
  const [isSliding, setSliding] = useState(false)
  //const t = useI18n()

  const handleValueChange: any['onValueChange'] = (value:any) => {
    console.log(value);
    setSliderSize(value)

    void setVolume(value)
  }

  return (
    <div>
      <p>{'play_detail_setting_volume'}</p>
      <div>
        <p>{sliderSize * 100}</p>
        <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={sliderSize}
            onChange={(e) => handleValueChange(e.target.value)}
            className="progress-bar"
        />
      </div>
    </div>
  )
}

export default Volume
