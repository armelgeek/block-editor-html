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
    <button style={{width: WIDTH, height: WIDTH }} onClick={handlePlayPrev}>
      PrevMusc
    </button>
  )
}
const NextBtn = () => {
  const theme = useTheme()
  const handlePlayNext = () => {
    void playNext()
  }
  return (
    <button style={{ width: WIDTH, height: WIDTH }} onClick={handlePlayNext}>
      Next Music
    </button>
  )
}

const TogglePlayBtn = () => {
  const theme = useTheme()
  const isPlay = useIsPlay()
  return (
    <button style={{ width: WIDTH, height: WIDTH }} onClick={togglePlay}>
      {isPlay ? 'pause' : 'play'}
    </button>
  )
}

export default () => {
  return (
    <>
      <PrevBtn />
      <TogglePlayBtn />
      <NextBtn />
    </>
  )
}
