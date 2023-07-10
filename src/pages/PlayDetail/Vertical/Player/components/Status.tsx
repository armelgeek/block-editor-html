import React from 'react'
// import { useLrcPlay } from '../../../../../../plugins/lyric'
import { useStatusText } from '../../../../../store/player/hook'
import { createStyle } from '../../../../../utils/tools'

export default () => {
  // const { text } = useLrcPlay()
  const statusText = useStatusText()
  // console.log('render status')

  // const status = playerStatus.isPlay ? text : playerStatus.statusText

  return <p>{statusText}</p>
}
