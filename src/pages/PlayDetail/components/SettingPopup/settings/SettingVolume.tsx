import React, { useState } from 'react'
import { useTheme } from '../../../../../store/theme/hook'
import { useSettingValue } from '../../../../../store/setting/hook'
import { updateSetting } from '../../../../..//core/common'
//import { useI18n } from '../../../../..//lang'
import { setVolume } from '../../../../..//plugins/player'


const Volume = () => {
  const theme = useTheme()
  const volume = Math.trunc(useSettingValue('player.volume') * 100)
  const [sliderSize, setSliderSize] = useState(volume)
  const [isSliding, setSliding] = useState(false)
  //const t = useI18n()

  const handleSlidingStart: any['onSlidingStart'] = value => {
    setSliding(true)
  }
  const handleValueChange: any['onValueChange'] = value => {
    value = Math.trunc(value)
    setSliderSize(value)
    void setVolume(value / 100)
  }
  const handleSlidingComplete: any['onSlidingComplete'] = value => {
    setSliding(false)
    value = Math.trunc(value)
    if (volume == value) return
    updateSetting({ 'player.volume': value / 100 })
  }

  return (
    <div>
      <p>{'play_detail_setting_volume'}</p>
      <div>
        <p>{isSliding ? sliderSize : volume}</p>
       {/**<Slider
          minimumValue={0}
          maximumValue={100}
          onSlidingComplete={handleSlidingComplete}
          onValueChange={handleValueChange}
          onSlidingStart={handleSlidingStart}
          step={1}
          value={volume}
        /> */ }
      </div>
    </div>
  )
}

export default Volume
