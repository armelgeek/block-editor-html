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
  return (
    <div>
      <div>
        {
          musicInfo.pic
            ? (
                <img src={musicInfo.pic} style={{
                    width:100,
                    height:100
                }} />
              )
            : <EmptyPic width={100} />
        }
      </div>
    </div>
  )
}