import React, { useEffect, useRef } from 'react'
import settingState from '../../../../store/setting/state'
import Content from './Content'
import { useTheme } from '../../../../store/theme/hook'
import { scaleSizeW } from '../../../../utils/pixelRatio'
import type { InitState as CommonState } from '../../../../store/common/state'

const MAX_WIDTH = scaleSizeW(560)

export default () => {
  const theme = useTheme()

  useEffect(() => {
    const handleFixDrawer = (id: CommonState['navActiveId']) => {
    //  if (id == 'nav_songlist') drawer.current?.fixWidth()
    }
   
    global.app_event.searchTypeChanged('songlist');
    global.state_event.on('navActiveIdUpdated', handleFixDrawer)

    return () => {
      global.state_event.off('navActiveIdUpdated', handleFixDrawer)
    }
  }, [])
  return (
      <Content />
  )
}
