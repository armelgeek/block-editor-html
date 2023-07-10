import React from 'react'
import { createStyle } from '../../../../../../utils/tools'
import { useTheme } from '../../../../../../store/theme/hook'
import { scaleSizeW } from '../../../../../../utils/pixelRatio'

export const BTN_WIDTH = scaleSizeW(36)
export const BTN_ICON_SIZE = 24

export default ({ icon, color, onPress }: {
  icon: string
  color?: string
  onPress: () => void
}) => {
  const theme = useTheme()
  return (
    <button style={{ width: BTN_WIDTH, height: BTN_WIDTH }} onClick={onPress}>
      {icon}
    </button>
  )
}
