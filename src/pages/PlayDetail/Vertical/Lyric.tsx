import React, { memo, useMemo, useEffect, useRef } from 'react'
// import { useLayout } from '../../../../utils/hooks'
import { type Line, useLrcPlay, useLrcSet } from '../../../plugins/lyric'
import { createStyle } from '../../../utils/tools'
// import { useComponentIds } from '../../../../store/common/hook'
import { useTheme } from '../../../store/theme/hook'
import { useSettingValue } from '../../../store/setting/hook'
import { setSpText } from '../../../utils/pixelRatio'
// import { screenkeepAwake } from '../../../../utils/nativeModules/utils'
// import { log } from '../../../../utils/log'
// import { toast } from '../../../../utils/tools'


// const useLock = () => {
//   const showCommentRef = useRef(false)


//   useEffect(() => {
//     let appstateListener = AppState.addEventListener('change', (state) => {
//       switch (state) {
//         case 'active':
//           if (showLyricRef.current && !showCommentRef.current) screenkeepAwake()
//           break
//         case 'background':
//           screenUnkeepAwake()
//           break
//       }
//     })
//     return () => {
//       appstateListener.remove()
//     }
//   }, [])
//   useEffect(() => {
//     let listener: ReturnType<typeof onNavigationComponentDidDisappearEvent>
//     showCommentRef.current = !!componentIds.comment
//     if (showCommentRef.current) {
//       if (showLyricRef.current) screenUnkeepAwake()
//       listener = onNavigationComponentDidDisappearEvent(componentIds.comment as string, () => {
//         if (showLyricRef.current && AppState.currentState == 'active') screenkeepAwake()
//       })
//     }

//     const rm = global.state_event.on('componentIdsUpdated', (ids) => {

//     })

//     return () => {
//       if (listener) listener.remove()
//     }
//   }, [])
// }

const LrcLine = memo(({ line, lineNum, activeLine }: {
  line: Line
  lineNum: number
  activeLine: number
}) => {
  const theme = useTheme()
  const lrcFontSize = useSettingValue('playDetail.vertical.style.lrcFontSize')
  const textAlign = useSettingValue('playDetail.style.align')
  const size = lrcFontSize / 10
  const lineHeight = setSpText(size) * 1.25

  // textBreakStrategy="simple" 用于解决某些设备上字体被截断的问题
  // https://stackoverflow.com/a/72822360
  return (
    <div>
      <p style={{
        textAlign,
        lineHeight,
        color:activeLine == lineNum ? theme['c-primary'] : theme['c-350']
      }}  >{line.text}</p>
      {
        line.extendedLyrics.map((lrc, index) => {
          return (<p style={{
            textAlign,
            lineHeight: lineHeight * 0.8,
          }}  key={index} color={activeLine == lineNum ? theme['c-primary-alpha-200'] : theme['c-350']}>{lrc}</p>)
        })
      }
    </div>
  )
}, (prevProps, nextProps) => {
  return prevProps.line === nextProps.line &&
    prevProps.activeLine != nextProps.lineNum &&
    nextProps.activeLine != nextProps.lineNum
})
const wait = async() => new Promise(resolve => setTimeout(resolve, 100))

export default () => {
  const lyricLines = useLrcSet()
  const { line } = useLrcPlay()
  const flatListRef = useRef<any>(null)
  const isPauseScrollRef = useRef(true)
  const scrollTimoutRef = useRef<NodeJS.Timeout | null>(null)
  const lineRef = useRef(0)
  const isFirstSetLrc = useRef(true)
  // useLock()
  // const [imgUrl, setImgUrl] = useState(null)
  // const theme = useGetter('common', 'theme')
  // const { onLayout, ...layout } = useLayout()

  // useEffect(() => {
  //   const url = playMusicInfo ? playMusicInfo.musicInfo.img : null
  //   if (imgUrl == url) return
  //   setImgUrl(url)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [playMusicInfo])

  // const imgWidth = useMemo(() => layout.width * 0.75, [layout.width])
  const handleScrollToActive = (index = lineRef.current) => {
    if (index < 0) return
    if (flatListRef.current) {
      try {
        flatListRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.4,
        })
      } catch {}
    }
  }

  const handleScrollBeginDrag = () => {
    isPauseScrollRef.current = true
    if (scrollTimoutRef.current) clearTimeout(scrollTimoutRef.current)
  }

  const onScrollEndDrag = () => {
    if (!isPauseScrollRef.current) return
    if (scrollTimoutRef.current) clearTimeout(scrollTimoutRef.current)
    scrollTimoutRef.current = setTimeout(() => {
      scrollTimoutRef.current = null
      isPauseScrollRef.current = false
      handleScrollToActive()
    }, 3000)
  }


  useEffect(() => {
    return () => {
      if (scrollTimoutRef.current) {
        clearTimeout(scrollTimoutRef.current)
        scrollTimoutRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    // linesRef.current = lyricLines
    if (!flatListRef.current) return
    flatListRef.current.scrollToOffset({
      offset: 0,
      animated: false,
    })
    if (isFirstSetLrc.current) {
      isFirstSetLrc.current = false
      setTimeout(() => {
        isPauseScrollRef.current = false
        handleScrollToActive()
      }, 100)
    } else {
      handleScrollToActive(0)
    }
  }, [lyricLines])

  useEffect(() => {
    //lineRef.current = line
    if (!flatListRef.current || isPauseScrollRef.current) return
    handleScrollToActive()
  }, [])

  const renderItem: any['renderItem'] = ({ item, index }:any) => {
    return (
      <div key={index}>
        <LrcLine line={item} lineNum={index} activeLine={line}/>
      </div>
    )
  }

  return (
    <>
    {lyricLines.map((item:any,index:number) => renderItem({
      item,
      index
    }))}
    </>
   
  )
}
