import React, { useState, useRef, useEffect } from 'react'
//import { useI18n } from '../../../../lang'
import { createUserList } from '../../../../core/list'
import listState from '../../../../store/list/state'

export default ({ isEdit, onHide }: {
  isEdit: boolean
  onHide: () => void
}) => {
  const [text, setText] = useState('')
  const inputRef = useRef<any>(null)
  //const t = useI18n()

  useEffect(() => {
    if (isEdit) {
      setText('')
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    }
  }, [isEdit])

  const handleSubmitEditing = () => {
    onHide()
    const name = text.trim()
    if (!name.length) return
    void createUserList(listState.userList.length, [{ id: `userlist_${Date.now()}`, name, locationUpdateTime: null }])
  }

  return isEdit
    ? (
      <div>
        <input
          placeholder={'list_create_input_placeholder'}
          value={text}
         // onChange={setText}
          ref={inputRef}
          onBlur={handleSubmitEditing}
        />
      </div>
      )
    : null
}