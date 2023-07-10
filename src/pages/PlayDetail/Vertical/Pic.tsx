import React, { memo, useState } from 'react'
// import { useLayout } from '../../../../utils/hooks'
import { usePlayerMusicInfo } from '../../../store/player/hook'
import { useTheme } from '../../../store/theme/hook'
import { useDimensions } from '../../../utils/hooks'

const EmptyPic = memo(({ width }: { width: number }) => {
  const theme = useTheme()
  const size = width * 0.2
  return (
    <div style={{ width, height: width, backgroundColor: theme['c-primary-light-900-alpha-200'] }}>
      <p>T</p>
      <p>K</p>
    </div>
  )
})

export default ({ componentId }: { componentId: string }) => {
  const musicInfo = usePlayerMusicInfo()
  const { window } = useDimensions()

  const [animated, setAnimated] = useState(false)
  const imgWidth = window.width * 0.8

  return (
    <div>
      <div>
        {
          musicInfo.pic
            ? (
                <img src={musicInfo.pic} style={{
                  width: imgWidth,
                  height: imgWidth,
                }} />
              )
            : <EmptyPic width={imgWidth} />
        }
      </div>
    </div>
  )
}