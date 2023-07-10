import React, { useState, useRef, useCallback, useMemo, forwardRef, useImperativeHandle } from 'react'


import { useTheme } from '../../../../../store/theme/hook'
//import { useI18n } from '../../../../../lang'
import { createStyle } from '../../../../../utils/tools'
import { BorderWidths } from '../../../../../theme'

interface SearchInputProps {
  onSearch: (keywork: string) => void
}

const SearchInput = forwardRef(({ onSearch }:any, ref) => {
  const [text, setText] = useState('')

  const handleChangeText = (text: string) => {
    setText(text)
    onSearch(text.trim())
  }

  return (
    <input
      onChange={(e) =>handleChangeText(e.target.value)}
      placeholder="Find for something..."
      value={text}
    />
  )
})


export interface ListSearchBarProps {
  onSearch: (keywork: string) => void
  onExitSearch: () => void
}
export interface ListSearchBarType {
  show: () => void
  hide: () => void
}

export default forwardRef(({ onSearch, onExitSearch }:any, ref) => {
  //const t = useI18n()
  // const isGetDetailFailedRef = useRef(false)
  const [visible, setVisible] = useState(false)
  const [animatePlayed, setAnimatPlayed] = useState(true)
  const searchInputRef = useRef(null)

  const theme = useTheme()

  useImperativeHandle(ref, () => ({
    show() {
      handleShow()
    },
    hide() {
      handleHide()
    },
  }))


  const handleShow = useCallback(() => {
    // console.log('show List')
    setVisible(true)
    setAnimatPlayed(false)
    setAnimatPlayed(true)
  }, [])

  const handleHide = useCallback(() => {
    setAnimatPlayed(false)
      setVisible(false)
      setAnimatPlayed(true)
  }, [])


  const component = useMemo(() => {
    return (
      <div>
        <div>
          <SearchInput ref={searchInputRef} onSearch={onSearch} />
        </div>
        <button onClick={onExitSearch}>
          <p >{'list_select_cancel'}</p>
        </button>
      </div>
    )
  }, [onSearch, onExitSearch, theme])

  return !visible && animatePlayed ? null : component
})
