import React, { useState } from 'react'
import { useTheme } from '../../../../../store/theme/hook'
import { useSettingValue } from '../../../../../store/setting/hook'
import { updateSetting } from '../../../../../core/common'
//import { useI18n } from '../../../../../lang'


const LrcFontSize = ({ direction }: {
  direction: 'horizontal' | 'vertical'
}) => {
  const theme = useTheme()
  const settingKey = direction == 'horizontal' ? 'playDetail.horizontal.style.lrcFontSize' : 'playDetail.vertical.style.lrcFontSize'
  const lrcFontSize = useSettingValue(settingKey)
  const [sliderSize, setSliderSize] = useState(lrcFontSize)
  const [isSliding, setSliding] = useState(false)
  //const t = useI18n()

  const handleSlidingStart: any['onSlidingStart'] = value => {
    setSliding(true)
  }
  const handleValueChange: any['onValueChange'] = value => {
    setSliderSize(value)
  }
  const handleSlidingComplete: any['onSlidingComplete'] = value => {
    setSliding(false)
    if (lrcFontSize == value) return
    updateSetting({ [settingKey]: value })
  }

  return (
    <div>
      <p>{'play_detail_setting_lrc_font_size'}</p>
      <div>
        <p>{isSliding ? sliderSize : lrcFontSize}</p>
        {/**<Slider
          minimumValue={100}
          maximumValue={300}
          onSlidingComplete={handleSlidingComplete}
          onValueChange={handleValueChange}
          onSlidingStart={handleSlidingStart}
          step={2}
          value={lrcFontSize}
  />**/}
      </div>
    </div>
  )
}

export default LrcFontSize
