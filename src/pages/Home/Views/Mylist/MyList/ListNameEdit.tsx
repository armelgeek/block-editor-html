import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react'
import { updateUserList } from '../../../../../core/list'
import { createStyle } from '../../../../../utils/tools'
import { useTheme } from '../../../../../store/theme/hook'

interface NameInputType {
  setName: (text: string) => void
  getText: () => string
  focus: () => void
}
const NameInput = forwardRef<NameInputType, {}>((props, ref) => {
  const theme = useTheme()
  const [text, setText] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const inputRef = useRef<any>(null)

  useImperativeHandle(ref, () => ({
    getText() {
      return text.trim()
    },
    setName(text) {
      setText(text)
      setPlaceholder(text)
    },
    focus() {
      inputRef.current?.focus()
    },
  }))

  return (
    <input
      ref={inputRef}
      placeholder={placeholder}
      value={text}
      onChange={(e)=> setText(e.target.value)}
      style={{ backgroundColor: theme['c-primary-input-background'] }}
    />
  )
})


export interface ListNameEditType {
  show: (listInfo: LX.List.UserListInfo) => void
}
const initSelectInfo = {}


export default forwardRef<ListNameEditType, {}>((props, ref) => {
  const alertRef = useRef<any>(null)
  const nameInputRef = useRef<NameInputType>(null)
  const selectedListInfo = useRef<LX.List.UserListInfo>(initSelectInfo as LX.List.UserListInfo)
  const [visible, setVisible] = useState(false)

  const handleShow = () => {
    alertRef.current?.setVisible(true)
    requestAnimationFrame(() => {
      nameInputRef.current?.setName(selectedListInfo.current.name ?? '')
      setTimeout(() => {
        nameInputRef.current?.focus()
      }, 300)
    })
  }
  useImperativeHandle(ref, () => ({
    show(listInfo) {
      selectedListInfo.current = listInfo
      if (visible) handleShow()
      else {
        setVisible(true)
        requestAnimationFrame(() => {
          handleShow()
        })
      }
    },
  }))

  const handleRename = () => {
    let name = nameInputRef.current?.getText() ?? ''
    if (!name.length) return
    if (name.length > 100) name = name.substring(0, 100)
    void updateUserList([{ ...selectedListInfo.current, name }])
    alertRef.current?.setVisible(false)
  }

  return (
    visible
      ? <div
        >
          <div>
            <div style={{ marginBottom: 5 }}>{'list_rename_title'}</div>
            <NameInput ref={nameInputRef} />
            <button onClick={handleRename}>Rename</button>
          </div>
        </div>
      : null
  )
})

