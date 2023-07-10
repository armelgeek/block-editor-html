import React from 'react'
import { useTheme } from '../../../../../store/theme/hook'
// import { useIsPlay } from '../../../../../../store/player/hook'
import { playNext, playPrev, togglePlay } from '../../../../../core/player/player'
import { scaleSizeW } from '../../../../../utils/pixelRatio'
import { useIsPlay } from '../../../../../store/player/hook'

const WIDTH = scaleSizeW(50)

const PrevBtn = () => {
  const theme = useTheme()
  const handlePlayPrev = () => {
    void playPrev()
  }
  return (
    <button style={{
      marginLeft: 10,
      marginRight:10
    }} onClick={handlePlayPrev}>
      Previous
    </button>
  )
}
const NextBtn = () => {
  const theme = useTheme()
  const handlePlayNext = () => {
    void playNext()
  }
  return (
    <button style={{
      marginLeft: 10,
      marginRight:10
    }} onClick={handlePlayNext}>
      Next
    </button>
  )
}

const TogglePlayBtn = () => {
  const theme = useTheme()
  const isPlay = useIsPlay()
  return (
    <button style={{
      marginLeft: 10,
      marginRight:10
    }} onClick={togglePlay}>
      {isPlay ? 'pause' : 'play'}
    </button>
  )
}

export default () => {
  return (
    <div style={{
      display:'flex',
      flexDirection:'row'
    }}>
      <PrevBtn />
      <TogglePlayBtn />
      <NextBtn />
    </div>
  )
}
