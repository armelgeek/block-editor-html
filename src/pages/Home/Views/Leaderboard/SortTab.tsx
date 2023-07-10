import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import songlistState, { type SortInfo, type Source } from '../../../../store/songlist/state'
//import { useI18n } from '../../../../lang'
import { useTheme } from '../../../../store/theme/hook'
import { createStyle } from '../../../../utils/tools'
import { BorderWidths } from '../../../../theme'

export interface SortTabProps {
  onSortChange: (id: string) => void
}

export interface SortTabType {
  setSource: (source: Source, activeTab: SortInfo['id']) => void
}


export default forwardRef<SortTabType, SortTabProps>(({ onSortChange }, ref) => {
  const [sortList, setSortList] = useState<SortInfo[]>([])
  const [activeId, setActiveId] = useState<SortInfo['id']>('')
  //const t = useI18n()
  const theme = useTheme()
  
  useImperativeHandle(ref, () => ({
    setSource(source, activeTab) {
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
          <button style={styles.button} onClick={() => { handleSortChange(s.id) }} key={s.id}>
            <p style={{ borderBottomColor: activeId == s.id ? theme['c-primary-background-active'] : 'transparent' }} color={activeId == s.id ? theme['c-primary-font-active'] : theme['c-font']}>{s.label}</p>
          </button>
        ))
      }
    </div>
  )
})


const styles = createStyle({
  container: {
    flexGrow: 1,
    flexShrink: 1
    // paddingLeft: 5,
    // paddingRight: 5,
  },
  button: {
    // height: 38,
    // lineHeight: 38,
    justifyContent: 'center',
    paddingLeft: 14,
    paddingRight: 14,
    // width: 80,
    // backgroundColor: 'rgba(0,0,0,0.1)',
  },
  buttonText: {
    // height: 38,
    // lineHeight: 38,
    textAlign: 'center',
    paddingHorizontal: 2,
    paddingVertical: 3,
    borderBottomWidth: BorderWidths.normal3,
  },
})
