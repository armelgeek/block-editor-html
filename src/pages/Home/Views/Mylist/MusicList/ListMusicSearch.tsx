import React, { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react'
//import SearchTipList, { type SearchTipListProps as _SearchTipListProps, type SearchTipListType } from '../../../../../components/SearchTipList'
import { debounce } from '../../../../../utils'
import { searchListMusic } from './listAction'
import { createStyle } from '../../../../../utils/tools'
import { useTheme } from '../../../../../store/theme/hook'
import { getListMusics } from '../../../../../core/list'
import listState from '../../../../../store/list/state'
interface ListMusicSearchProps {
  onScrollToInfo: (info: LX.Music.MusicInfo) => void
}

export interface ListMusicSearchType {
  search: (keyword: string, height: number) => void
  hide: () => void
}

export const debounceSearchList = debounce((text: string, list: LX.List.ListMusics, callback: (list: LX.List.ListMusics) => void) => {
  // console.log(reslutList)
  callback(searchListMusic(list, text))
}, 200)


export default forwardRef<ListMusicSearchType, ListMusicSearchProps>(({ onScrollToInfo }, ref) => {
  const searchTipListRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const currentListIdRef = useRef('')
  const currentKeywordRef = useRef('')
  const theme = useTheme()

  const handleShowList = (keyword: string, height: number) => {
    //searchTipListRef.current?.setHeight(height)
    currentKeywordRef.current = keyword
    const id = currentListIdRef.current = listState.activeListId
    if (keyword) {
      void getListMusics(id).then(list => {
        debounceSearchList(keyword, list, (list) => {
          if (currentListIdRef.current != id) return
        //  searchTipListRef.current?.setList(list)
        })
      })
    } else {
      //searchTipListRef.current?.setList([])
    }
  }

  useImperativeHandle(ref, () => ({
    search(keyword, height) {
      if (visible) handleShowList(keyword, height)
      else {
        setVisible(true)
        requestAnimationFrame(() => {
          handleShowList(keyword, height)
        })
      }
    },
    hide() {
      currentKeywordRef.current = ''
      currentListIdRef.current = ''
     // searchTipListRef.current?.setList([])
    },
  }))

  useEffect(() => {
    const updateList = (id: string) => {
      currentListIdRef.current = id
      if (!currentKeywordRef.current) return
      void getListMusics(listState.activeListId).then(list => {
        debounceSearchList(currentKeywordRef.current, list, (list) => {
          if (currentListIdRef.current != id) return
         // searchTipListRef.current?.setList(list)
        })
      })
    }
    const handleChange = (ids: string[]) => {
      if (!ids.includes(listState.activeListId)) return
      updateList(listState.activeListId)
    }

    global.state_event.on('mylistToggled', updateList)
    global.app_event.on('myListMusicUpdate', handleChange)

    return () => {
      global.state_event.off('mylistToggled', updateList)
      global.app_event.off('myListMusicUpdate', handleChange)
    }
  }, [])

  const renderItem = ({ item, index }: { item: LX.Music.MusicInfo, index: number }) => {
    return (
      <button  onClick={() => { onScrollToInfo(item) }} key={index}>
        <div>
          <p >{item.name}</p>
          <p>{item.singer} ({item.meta.albumName})</p>
        </div>
        <p>{item.source}</p>
      </button>
    )
  }
  {/**
   <SearchTipList
   ref={searchTipListRef}
   renderItem={renderItem}
   onPressBg={() => searchTipListRef.current?.setList([])}
   keyExtractor={getkey}
   getItemLayout={getItemLayout}
   />

   */}
  return (
    visible
      ? (<>search tips</>)
      : null
  )
})
