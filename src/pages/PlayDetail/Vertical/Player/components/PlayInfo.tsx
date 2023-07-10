import React, { memo } from 'react'
import Progress from './Progress'
import Status from './Status'
import { useProgress } from '../../../../../store/player/hook'
import { useTheme } from '../../../../../store/theme/hook'
// const FONT_SIZE = 13

const PlayTimeCurrent = ({ timeStr }: { timeStr: string }) => {
  const theme = useTheme()
  // console.log(timeStr)
  return <p>{timeStr}</p>
}

const PlayTimeMax = memo(({ timeStr }: { timeStr: string }) => {
  const theme = useTheme()
  return <p>{timeStr}</p>
})

export default () => {
  const { maxPlayTimeStr, nowPlayTimeStr, progress, maxPlayTime } = useProgress()


  return (
    <>
      <div><Progress progress={progress} duration={maxPlayTime} /></div>
      <div>
        <PlayTimeCurrent timeStr={nowPlayTimeStr} />
        <div>
          <Status />
        </div>
        <PlayTimeMax timeStr={maxPlayTimeStr} />
      </div>
    </>
  )
}
