import React, { memo, useEffect, useRef } from 'react'

import { useTheme } from '../../../../../store/theme/hook'
import { useActiveListId, useListFetching, useMyList } from '../../../../../store/list/hook'
import { createStyle } from '../../../../../utils/tools'
import { LIST_SCROLL_POSITION_KEY } from '../../../../../config/constant'
import { getListPosition, saveListPosition } from '../../../../../utils/data'
import { setActiveList } from '../../../../../core/list'
import { type Position } from './ListMenu'

const ListItem = memo(({ item, index, activeId, onPress, onShowMenu }: {
  onPress: (item: LX.List.MyListInfo) => void
  index: number
  activeId: string
  item: LX.List.MyListInfo
  onShowMenu: (item: LX.List.MyListInfo, index: number, position: { x: number, y: number, w: number, h: number }) => void
}) => {
  const theme = useTheme()
  const moreButtonRef = useRef(null)
  const fetching = useListFetching(item.id)

  const active = activeId == item.id

  const handleShowMenu = () => {
    /**if (moreButtonRef.current?.measure) {
      moreButtonRef.current.measure((fx, fy, width, height, px, py) => {
        // console.log(fx, fy, width, height, px, py)
        onShowMenu(item, index, { x: Math.ceil(px), y: Math.ceil(py), w: Math.ceil(width), h: Math.ceil(height) })
      })
    }**/
  }

  const handlePress = () => {
    onPress(item)
  }

  return (
    <div style={{ opacity: fetching ? 0.5 : 1 }}>
      {
        active
            ? <div>chevron-right</div>
          : null
      }
      <button  onClick={handlePress}>
        <span style={{
          color:active ? theme['c-primary-font'] : theme['c-font']
        }}>{item.name}</span>
      </button>
      <button onClick={handleShowMenu} ref={moreButtonRef}>
        <button name="dots-vertical" color={theme['c-350']}>...</button>
      </button>
    </div>
  )
}, (prevProps, nextProps) => {
  return (prevProps.item === nextProps.item &&
      prevProps.index === nextProps.index &&
      prevProps.item.name == nextProps.item.name &&
      prevProps.activeId != nextProps.item.id &&
      nextProps.activeId != nextProps.item.id
  )
})


export default ({ onShowMenu }: {
  onShowMenu: (info: { listInfo: LX.List.MyListInfo, index: number }, position: Position) => void
}) => {
  const flatListRef = useRef(null)
  const allList = useMyList()
  const activeListId = useActiveListId()

  const handleToggleList = (item: LX.List.MyListInfo) => {
    // setVisiblePanel(false)
    global.app_event.changeLoveListVisible(false)
      setActiveList(item.id)
  }



  const showMenu = (listInfo: LX.List.MyListInfo, index: number, position: Position) => {
    onShowMenu({ listInfo, index }, position)
  }

  const renderItem: any = ({ item, index }:any) => (
    <ListItem
      key={item.id}
      item={item}
      index={index}
      activeId={activeListId}
      onPress={handleToggleList}
      onShowMenu={showMenu}
    />
  )
  // @ts-ignore

  return (
      <>
        {allList.map((item, index) => renderItem({
          item,
          index
        }))}
      </>
  )
}