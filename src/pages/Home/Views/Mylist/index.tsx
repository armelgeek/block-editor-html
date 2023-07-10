import React, { useEffect, useRef } from 'react'
import settingState from '../../../../store/setting/state'
import MusicList from './MusicList'
import MyList from './MyList'
import { useTheme } from '../../../../store/theme/hook'
import { COMPONENT_IDS } from '../../../../config/constant'
import type { InitState as CommonState } from '../../../../store/common/state'

export default () => {
  const theme = useTheme()
  // const [width, setWidth] = useState(0)

  useEffect(() => {



    // setWidth(getWindowSise().width * 0.82)


    // 就放旋转屏幕后的宽度没有更新的问题
    // const changeEvent = onDimensionChange(({ window }) => {
    //   setWidth(window.width * 0.82)
    //   drawer.current?.setNativeProps({
    //     width: window.width,
    //   })
    // })

    return () => {
    // changeEvent.remove()
    }
  }, [])

  const navigationView = () => <MyList />
  // console.log('render drawer content')

  return (
   <>
       <MyList />
     <MusicList />
   </>
  )
}
