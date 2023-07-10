import React, { useState } from 'react'
import { useTheme } from '../../../../../store/theme/hook'
import { useSettingValue } from '../../../../../store/setting/hook'
import { updateSetting } from '../../../../../core/common'
//import { useI18n } from '../../../../../lang'
import { setPlaybackRate, updateMetaData } from '../../../../../plugins/player'
import { setPlaybackRate as setLyricPlaybackRate } from '../../../../../core/lyric'
import playerState from '../../../../../store/player/state'
import settingState from '../../../../../store/setting/state'

const MIN_VALUE = 60
const MAX_VALUE = 200

const Volume = () => {
  const theme = useTheme()
  const playbackRate = Math.trunc(useSettingValue('player.playbackRate') * 100)
  const [sliderSize, setSliderSize] = useState(playbackRate)
  const [isSliding, setSliding] = useState(false)
  //const t = useI18n()

  const handleSlidingStart: any['onSlidingStart'] = value => {
    setSliding(true)
  }
  const handleValueChange: any['onValueChange'] = value => {
    value = Math.trunc(value)
    setSliderSize(value)
    void setPlaybackRate(parseFloat((value / 100).toFixed(2)))
  }
  const handleSlidingComplete: any['onSlidingComplete'] = value => {
    setSliding(false)
    value = Math.trunc(value)
    const rate = value / 100
    void setLyricPlaybackRate(rate)
    void updateMetaData(playerState.musicInfo, playerState.isPlay, true) // 更新通知栏的播放速率
    if (playbackRate == value) return
    updateSetting({ 'player.playbackRate': rate })
  }
  const handleReset = () => {
    if (settingState.setting['player.playbackRate'] == 1) return
    setSliderSize(100)
    void setPlaybackRate(1).then(() => {
      void updateMetaData(playerState.musicInfo, playerState.isPlay, true) // 更新通知栏的播放速率
    })
    void setLyricPlaybackRate(1)
    updateSetting({ 'player.playbackRate': 1 })
  }

  return (
    <div>
      <p>{'play_detail_setting_playback_rate'}</p>
      <div>
        <p>{`${((isSliding ? sliderSize : playbackRate) / 100).toFixed(2)}x`}</p>
        {/**<Slider
          minimumValue={MIN_VALUE}
          maximumValue={MAX_VALUE}
          onSlidingComplete={handleSlidingComplete}
          onValueChange={handleValueChange}
          onSlidingStart={handleSlidingStart}
          step={1}
          value={playbackRate}
  />**/}
      </div>
      <button onClick={handleReset}>{'play_detail_setting_playback_rate_reset'}</button>
    </div>
  )
}

export default Volume
