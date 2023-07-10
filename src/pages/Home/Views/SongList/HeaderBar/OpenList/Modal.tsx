import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react'
import { createStyle } from '../../../../utils/tools'
import { useTheme } from '../../../../store/theme/hook'
//import { useI18n } from '../../../../lang'
// import SourceSelector, { type SourceSelectorProps, type SourceSelectorType } from '../SourceSelector'
import { type Source } from '../../../../store/songlist/state'

interface IdInputType {
  setText: (text: string) => void
  getText: () => string
  focus: () => void
}
const IdInput = forwardRef<IdInputType, {}>((props, ref) => {
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
      ref={inputRef}
      placeholder={'songlist_open_input_placeholder'}
      value={text}
      onChange={(e)=> setText(e.target.value)}
      style={{ backgroundColor: theme['c-primary-input-background'] }}
    />
  )
})


export interface ModalProps {
  onOpenId: (id: string) => void
  // onSourceChange: SourceSelectorProps['onSourceChange']
}
export interface ModalType {
  show: (source: Source) => void
}

export default forwardRef<ModalType, ModalProps>(({ onOpenId }, ref) => {
  const alertRef = useRef<any>(null)
  // const sourceSelectorRef = useRef<SourceSelectorType>(null)
  const inputRef = useRef<IdInputType>(null)
  const [visible, setVisible] = useState(false)
  const theme = useTheme()
  //const t = useI18n()

  const handleShow = (source: Source) => {
    alertRef.current?.setVisible(true)
    requestAnimationFrame(() => {
      inputRef.current?.setText('')
      // sourceSelectorRef.current?.setSource(source)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    })
  }
  useImperativeHandle(ref, () => ({
    show(source) {
      if (visible) handleShow(source)
      else {
        setVisible(true)
        requestAnimationFrame(() => {
          handleShow(source)
        })
      }
    },
  }))

  const handleConfirm = () => {
    let id = inputRef.current?.getText() ?? ''
    if (!id.length) return
    if (id.length > 500) id = id.substring(0, 500)
    alertRef.current?.setVisible(false)
    onOpenId(id)
  }

  return (
    visible
      ? <div
          ref={alertRef}
          onClick={handleConfirm}
        >
          <div >
            <div>
              {/* <SourceSelector style={{ ...styles.selector, backgroundColor: theme['c-primary-input-background'] }} ref={sourceSelectorRef} onSourceChange={onSourceChange} /> */}
              <IdInput ref={inputRef} />
            </div>
            <p>{'songlist_open_input_tip'}</p>
          </div>
        </div>
      : null
  )
})
