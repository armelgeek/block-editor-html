import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'

import { useTheme } from '../../../../../store/theme/hook'
//import { useI18n } from '../../../../../lang'
import { createStyle } from '../../../../../utils/tools'

interface TitleType {
  updateTitle: (musicInfo: SelectInfo['musicInfo'], selectedList: SelectInfo['selectedList']) => void
}
const Title = forwardRef<TitleType, {}>((props, ref) => {
  const [title, setTitle] = useState('')

  useImperativeHandle(ref, () => ({
    updateTitle(musicInfo, selectedList) {
      setTitle(selectedList.length
        ? global.i18n.t('change_position_music_multi_title', { num: selectedList.length })
        : global.i18n.t('change_position_music_title', { name: musicInfo.name }))
    },
  }))

  return (
    <p style={{ marginBottom: 5 }}>{title}</p>
  )
})

interface PositionInputType {
  getText: () => string
  setText: (text: string) => void
  focus: () => void
}
const PositionInput = forwardRef<PositionInputType, {}>((props, ref) => {
  const theme = useTheme()
  //const t = useI18n()
  const [text, setText] = useState('')
  const inputRef = useRef<any>(null)

  useImperativeHandle(ref, () => ({
    getText() {
      return text.trim()
    },
    setText(text) {
      setText(text)
    },
    focus() {
      inputRef.current?.focus()
    },
  }))

  return (
    <input
      placeholder={'change_position_tip'}
      value={text}
      onChange={(e)=> setText(e.target.value)}
      ref={inputRef}
      style={{ backgroundColor: theme['c-primary-input-background'] }}
    />
  )
})


export interface SelectInfo {
  musicInfo: LX.Music.MusicInfo
  selectedList: LX.Music.MusicInfo[]
  index: number
  listId: string
  single: boolean
}
const initSelectInfo = {}

interface MusicPositionModalProps {
  onUpdatePosition: (info: SelectInfo, position: number) => void
}

export interface MusicPositionModalType {
  show: (listInfo: SelectInfo) => void
}


export default forwardRef<MusicPositionModalType, MusicPositionModalProps>(({ onUpdatePosition }, ref) => {
  const alertRef = useRef<any>(null)
  const titleRef = useRef<TitleType>(null)
  const inputRef = useRef<PositionInputType>(null)
  const selectedInfo = useRef<SelectInfo>(initSelectInfo as SelectInfo)
  const [visible, setVisible] = useState(false)

  const handleShow = () => {
    alertRef.current?.setVisible(true)
    requestAnimationFrame(() => {
      titleRef.current?.updateTitle(selectedInfo.current.musicInfo, selectedInfo.current.selectedList)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    })
  }
  useImperativeHandle(ref, () => ({
    show(listInfo) {
      selectedInfo.current = listInfo

      if (visible) handleShow()
      else {
        setVisible(true)
        requestAnimationFrame(() => {
          handleShow()
        })
      }
    },
  }))


  const verify = () => {
    let result = /^[1-9]\d*/.exec(inputRef.current?.getText() ?? '')
    let num = result ? parseInt(result[0]) : ''
    inputRef.current?.setText(num.toString())
    return num
  }
  const handleSetMusicPosition = () => {
    let num = verify()
    if (num == '') return
    alertRef.current?.setVisible(false)
    onUpdatePosition(selectedInfo.current, num as number - 1)
  }

  return (
    visible
      ? <div
          ref={alertRef}
        >
        <div>
          <Title ref={titleRef} />
          <PositionInput ref={inputRef} />
          <button onClick={handleSetMusicPosition}>Set Music Position</button>
        </div>
      </div>
      : null
  )
})