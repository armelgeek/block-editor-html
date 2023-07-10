import React, { forwardRef, useImperativeHandle, useRef } from 'react'

// import { useGetter, useDispatch } from '../../../../store'
import SortTab, { type SortTabProps, type SortTabType } from './SortTab'
// import Tag from './Tag'
// import OpenList from './OpenList'
import { createStyle } from '../../../../../utils/tools'
// import { BorderWidths } from '../../../../theme'
import { type Source } from '../../../../../store/songlist/state'
// import { useTheme } from '../../../../store/theme/hook'
import Tag, { type TagType, type TagProps } from './Tag'
import OpenList, { type OpenListType } from './OpenList'
// import { BorderWidths } from '../../../../theme'

export interface HeaderBarProps {
  onSortChange: SortTabProps['onSortChange']
  onTagChange: TagProps['onTagChange']
}

export interface HeaderBarType {
  setSource: (source: Source, sortId: string, tagName: string, tagId: string) => void
}


export default forwardRef<HeaderBarType, HeaderBarProps>(({ onSortChange, onTagChange }, ref) => {
  const sortTabRef = useRef<SortTabType>(null)
  const tagRef = useRef<TagType>(null)
  const openListRef = useRef<OpenListType>(null)
  // const theme = useTheme()

  useImperativeHandle(ref, () => ({
    setSource(source, sortId, tagName, tagId) {
      sortTabRef.current?.setSource(source, sortId)
      tagRef.current?.setSelectedTagInfo(source, tagName, tagId)
      openListRef.current?.setInfo(source)
    },
  }), [])


  return (
    <div>
      <SortTab ref={sortTabRef} onSortChange={onSortChange} />
      <Tag ref={tagRef} onTagChange={onTagChange} />
      <OpenList ref={openListRef} />
    </div>
  )
})

const styles = createStyle({
  searchBar: {
    flexDirection: 'row',
    height: 38,
    zIndex: 2,
    // paddingRight: 10,
    // borderBottomWidth: BorderWidths.normal,
  },
  selector: {
    width: 86,
  },
})
