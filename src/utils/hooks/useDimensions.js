import { useEffect, useState } from 'react'

import { getWindowSise } from '../../utils/tools'

export default () => {
  const [dimensions, setDimensions] = useState({
    window: getWindowSise(),
    screen: 1200,
  })

  useEffect(() => {
    const onChange = ({ window, screen }) => {
      setDimensions({ window: getWindowSise(window), screen })
    }

  }, [])

  return dimensions
}
