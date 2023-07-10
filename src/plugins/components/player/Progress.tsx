import React, { memo, useMemo } from 'react'
import { useLayout } from '../../../utils/hooks'
import { useTheme } from '../../../store/theme/hook'
import { scaleSizeW } from '../../../utils/pixelRatio'
// import { AppColors } from '../../../../theme'


const DefaultBar = memo(() => {
  const theme = useTheme()

  return <div style={{  backgroundColor: theme['c-primary-light-100-alpha-800'], position: 'absolute', width: '100%', left: 0, top: 0 }}></div>
})

// const BufferedBar = memo(({ bufferedProgress }) => {
//   // console.log(bufferedProgress)
//   const theme = useTheme()
//   return <View style={{ ...styles.progressBar, backgroundColor: theme.secondary45, position: 'absolute', width: bufferedProgress + '%', left: 0, top: 0 }}></View>
// })

const PreassBar = memo(({ duration }: { duration: number }) => {
  const { onLayout, ...layout } = useLayout()
  const handlePress = (event: any) => {
    global.app_event.setProgress(event.nativeEvent.locationX / layout.width * duration)
  }

  return <button onClick={handlePress} />
})


const Progress = ({ progress, duration }: {
  progress: number
  duration: number
}) => {
  // const { progress } = usePlayTimeBuffer()
  const theme = useTheme()
  // console.log(progress)
  const progressStr = `${progress * 100}%`

  const progressDotStyle = useMemo(() => {
    return {
      width: progressDotSize,
      height: progressDotSize,
      borderRadius: progressDotSize,
      position: 'absolute',
      right: -progressDotSize / 2,
      top: -(progressDotSize - progressHeight) / 2,
      backgroundColor: theme['c-primary-light-100'],
      zIndex: 9,
    } as const
  }, [theme])

  return (
    <div>
      <div>
        <DefaultBar />
        {/* <BufferedBar bufferedProgress={bufferedProgress} /> */}
        <div style={{  backgroundColor: theme['c-primary-light-100-alpha-400'], width: progressStr, position: 'absolute', left: 0, top: 0 }}>
          <div></div>
        </div>
      </div>
      <PreassBar duration={duration} />
      {/* <View style={{ ...styles.progressBar, height: '100%', width: progressStr }}><Pressable style={styles.progressDot}></Pressable></View> */}
    </div>
  )
}


const progressContentPadding = 9
const progressHeight = 3
const progressDotSize = scaleSizeW(8)


export default Progress
