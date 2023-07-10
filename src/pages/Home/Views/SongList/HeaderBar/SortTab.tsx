import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import songlistState, { type SortInfo, type Source } from '../../../../../store/songlist/state'
//import { useI18n } from '../../../../../lang'
import { useTheme } from '../../../../../store/theme/hook'
import { createStyle } from '../../../../../utils/tools'
import { BorderWidths } from '../../../../../theme'

export interface SortTabProps {
  onSortChange: (id: string) => void
}

export interface SortTabType {
  setSource: (source: Source, activeTab: SortInfo['id']) => void
}


export default forwardRef<SortTabType, SortTabProps>(({ onSortChange }, ref) => {
  const [sortList, setSortList] = useState<SortInfo[]>([])
  const [activeId, setActiveId] = useState<SortInfo['id']>('')
 // const t = useI18n()
  const theme = useTheme()
  const scrollViewRef = useRef<any>(null)

  useImperativeHandle(ref, () => ({
    setSource(source, activeTab) {
      scrollViewRef.current?.scrollTo({ x: 0 })
      setSortList(songlistState.sortList['kw'] as SortInfo[])
      setActiveId(activeTab)
    },
  }))

  const sorts = useMemo(() => {
    return sortList?.map(s => ({ label: `songlist_${s.tid}`, id: s.id }))
  }, [sortList])
  console.log('sorts',sorts);
  const handleSortChange = (id: string) => {
    onSortChange(id)
    setActiveId(id)
  }

  return (
    <div>
      {
        sorts?.map(s => (
          <button onClick={() => { handleSortChange(s.id) }} key={s.id}>
            <p style={{ borderBottomColor: activeId == s.id ? theme['c-primary-background-active'] : 'transparent' }} color={activeId == s.id ? theme['c-primary-font-active'] : theme['c-font']}>{s.label}</p>
          </button>
        ))
      }
    </div>
  )
})

