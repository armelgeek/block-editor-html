import { useEffect, useState, useCallback } from 'react'
//import { Dimensions } from 'react-native'

//const screen = Dimensions.get('screen')
const screen = 1200
export default () => {
  const isOrientationPortrait = ({
    width,
    height,
  }) => height >= width
  const isOrientationLandscape = ({
    width,
    height,
  }) => width >= height

  const [orientation, setOrientation] = useState({
    portrait: isOrientationPortrait(screen),
    landscape: isOrientationLandscape(screen),
  })

  const onChange = useCallback(({ screen: scr }) => {
    setOrientation({
      portrait: isOrientationPortrait(scr),
      landscape: isOrientationLandscape(scr),
    })
  }, [])

  useEffect(() => {
    //const changeEvent = Dimensions.addEventListener('change', onChange)

    return () => {
      //changeEvent.remove()
    }
  }, [orientation.portrait, orientation.landscape, onChange])

  return orientation
}
