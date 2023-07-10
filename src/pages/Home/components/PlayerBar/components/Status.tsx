import React from 'react'
import { useLrcPlay } from '../../../../../plugins/lyric'
import { useIsPlay, useStatusText } from '../../../../../store/player/hook'
// import { createStyle } from '../../../../utils/tools'


export default ({ autoUpdate }: { autoUpdate: boolean }) => {
  //const { text } = useLrcPlay(autoUpdate)
  const statusText = useStatusText()
  const isPlay = useIsPlay()
  // console.log('render status')

  const status = isPlay ? "" : statusText

  return <p>{status}</p>
}

// const styles = createStyle({
//   text: {
//     fontSize: 10,
//   },
// })
