import React from 'react'
import PlayModeBtn from './PlayModeBtn'
import MusicAddBtn from './MusicAddBtn'
import TimeoutExitBtn from './TimeoutExitBtn'
import CommentBtn from './CommentBtn'

export default () => {
  return (
    <div>
      <TimeoutExitBtn />
      <MusicAddBtn />
      <PlayModeBtn />
      <CommentBtn />
    </div>
  )
}