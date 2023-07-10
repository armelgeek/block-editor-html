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

  const handleSlidingStart: any['onSlidingStart'] = (value:any) => {
    setSliding(true)
  }
  const handleValueChange: any['onValueChange'] =  (value:any) => {
    setSliderSize(value)
  }
  const handleSlidingComplete: any['onSlidingComplete'] =  (value:any) => {
    setSliding(false)
    if (lrcFontSize == value) return
    updateSetting({ [settingKey]: value })
  }

  return (
    <div>
      <p>{'play_detail_setting_lrc_font_size'}</p>
      <div>
        <p>{sliderSize}</p>
        <input
            type="range"
            min="0"
            max="300"
            step={2}
            value={sliderSize}
            onChange={(e) => handleValueChange(e.target.value)}
            className="progress-bar"
        />
      </div>
    </div>
  )
}

export default LrcFontSize
