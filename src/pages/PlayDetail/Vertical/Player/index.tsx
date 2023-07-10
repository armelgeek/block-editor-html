import React, { memo } from 'react'
// import Title from './components/Title'
import MoreBtn from './components/MoreBtn'
import PlayInfo from './components/PlayInfo'
import ControlBtn from './components/ControlBtn'


export default memo(() => {
  return (
    <>
      <div>
        <PlayInfo />
      </div>
      <div>
        <ControlBtn />
      </div>
      <div>
        <MoreBtn />
      </div>
    </>
  )
})
