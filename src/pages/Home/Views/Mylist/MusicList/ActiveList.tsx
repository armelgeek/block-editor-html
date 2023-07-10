import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import { useTheme } from '../../../../../store/theme/hook'
import { useActiveListId } from '../../../../../store/list/hook'
import listState from '../../../../../store/list/state'
import { createStyle } from '../../../../../utils/tools'
import { getListPrevSelectId } from '../../../../../utils/data'
import { setActiveList } from '../../../../../core/list'
import { LIST_IDS } from '../../../../../config/constant'

export interface ActiveListProps {
  onShowSearchBar: () => void
}
export interface ActiveListType {
  setVisibleBar: (visible: boolean) => void
}

export default forwardRef<ActiveListType, ActiveListProps>(({ onShowSearchBar }, ref) => {
  const theme = useTheme()
  const currentListId = useActiveListId()
  let currentListName = currentListId == LIST_IDS.TEMP ? global.i18n.t(`list_${LIST_IDS.TEMP}`) : listState.allList.find(l => l.id === currentListId)?.name ?? ''
  const [visibleBar, setVisibleBar] = useState(true)

  useImperativeHandle(ref, () => ({
    setVisibleBar(visible) {
      setVisibleBar(visible)
    },
  }))

  const showList = () => {
    global.app_event.changeLoveListVisible(true)
  }

  useEffect(() => {
    void getListPrevSelectId().then((id) => {
      setActiveList(id)
    })
  }, [])

  return (
    <div onClick={showList} style={{ opacity: visibleBar ? 1 : 0, borderBottomColor: theme['c-border-background'] }}>
      <div>{">>"}</div>
      <p color={theme['c-button-font']}>{currentListName}</p>
      <button  onClick={onShowSearchBar}>
        Search
      </button>
    </div>
  )
})

