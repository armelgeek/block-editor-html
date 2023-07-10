import React, { memo } from 'react'
import { createStyle } from '../../../../../../utils/tools'
import { type ListInfoItem } from '../../../../../../store/songlist/state'
import { scaleSizeW } from '../../../../../../utils/pixelRatio'
import { NAV_SHEAR_NATIVE_IDS } from '../../../../../../config/constant'
import { useTheme } from '../../../../../../store/theme/hook'
import { formatLargeNumber } from '../../../../../../utils'

const gap = scaleSizeW(15)
export default memo(({ item, index, width, showSource, onPress }: {
  item: ListInfoItem
  index: number
  showSource: boolean
  width: number
  onPress: (item: ListInfoItem, index: number) => void
}) => {
  const theme = useTheme()
  const itemWidth = width - gap
  const handlePress = () => {
    onPress(item, index)
  }
  return (
    item.source
      ? (
          <div style={{  width: itemWidth }}>
            <div style={{ backgroundColor: theme['c-content-background'] }}>
             
              <button onClick={handlePress}>
                <img src={item.img}  style={{ width: itemWidth, height: itemWidth }} />
                <p style={{ backgroundColor:theme['c-primary-dark-500-alpha-700']}}>{formatLargeNumber(item.total)}</p>
               </button>
            </div>
            <button onClick={handlePress}>
              <p>{item.name}</p>
           </button>
          </div>
        )
      : <div style={{  width: itemWidth }} />
  )
})
