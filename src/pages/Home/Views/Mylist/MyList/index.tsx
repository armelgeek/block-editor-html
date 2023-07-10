import React, { useEffect, useRef, useState } from 'react'

import ListMenu, { type ListMenuType } from './ListMenu'
import ListNameEdit, { type ListNameEditType } from './ListNameEdit'
import List from './List'
import { handleRemove, handleSync } from './listAction'


export default () => {
  const [visible, setVisible] = useState(false)
  const listMenuRef = useRef<ListMenuType>(null)
  const listNameEditRef = useRef<ListNameEditType>(null)

  useEffect(() => {
    let isInited = false
    const changeVisible = (visibleList: boolean) => {
      if (visibleList && !isInited) {
        requestAnimationFrame(() => {
            setVisible(true)
        })
        isInited = true
      }
    }
    global.app_event.on('changeLoveListVisible', changeVisible)

    return () => {
      global.app_event.off('changeLoveListVisible', changeVisible)
    }
  }, [])

  return (
    visible
      ? <>
          <List onShowMenu={(info, position) => listMenuRef.current?.show(info, position)} />
          <ListNameEdit ref={listNameEditRef} />

          <ListMenu
            ref={listMenuRef}
            onRename={info => listNameEditRef.current?.show(info)}
            onImport={(info, position) => {}}
            onExport={(info, position) => {}}
            onRemove={info => { handleRemove(info) }}
            onSync={info => { handleSync(info) }}
          />
          {/* <ImportExport actionType={actionType} visible={isShowChoosePath} hide={() => setShowChoosePath(false)} selectedListRef={selectedListRef} /> */}
        </>
      : null
  )
}
