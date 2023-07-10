import React, { useMemo, useState } from 'react'

import { useMyList } from '../../store/list/hook'
import ListItem from './ListItem'
import CreateUserList from './CreateUserList'
import { useDimensions } from '../../utils/hooks'
import { useTheme } from '../../store/theme/hook'
//import { useI18n } from '../../lang'

const EditListItem = ({ itemWidth }: {
  itemWidth: number
}) => {
  const [isEdit, setEdit] = useState(false)
  const theme = useTheme()
  //const t = useI18n()

  return (
    <div style={{width: itemWidth }}>
      <button
        style={{ borderColor: theme['c-primary-light-200-alpha-700'], borderStyle: 'dashed' }}
        onClick={() => { setEdit(true) }}
      >
        <p style={{ opacity: isEdit ? 0 : 1 }}  color={theme['c-button-font']}>{'list_create'}</p>
      </button>
      {
        isEdit
          ? <CreateUserList isEdit={isEdit} onHide={() => { setEdit(false) }} />
          : null
      }
    </div>
  )
}

export default ({ musicInfo, onPress }: {
  musicInfo: LX.Music.MusicInfo
  onPress: (listInfo: LX.List.MyListInfo) => void
}) => {
  const { window } = useDimensions()
  const allList = useMyList()
  const itemWidth = useMemo(() => {
    let w = Math.floor(window.width * 0.9)
    let n = Math.floor(w/10)
    if (n > 10) n = 10
    return Math.floor((w - 1) / n)
  }, [window])

  return (
    <div style={{ flexGrow: 0 }}>
      <div>
        { allList.map(info => <ListItem key={info.id} listInfo={info} musicInfo={musicInfo} onPress={onPress} width={itemWidth} />) }
        <EditListItem itemWidth={itemWidth} />
      </div>
    </div>
  )
}
