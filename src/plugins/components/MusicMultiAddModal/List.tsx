import React, { useMemo, useState } from 'react'
import { useMyList } from '../../../..//store/list/hook'
import ListItem, { styles as listStyles } from './ListItem'
import CreateUserList from '../MusicAddModal/CreateUserList'
import { useDimensions } from '../../../..//utils/hooks'
import { useTheme } from '../../../..//store/theme/hook'
//import { useI18n } from '../../../..//lang'
import { createStyle } from '../../../..//utils/tools'
import { scaleSizeW } from '../../../..//utils/pixelRatio'


const MIN_WIDTH = scaleSizeW(140)
const PADDING = 20

const EditListItem = ({ itemWidth }: {
  itemWidth: number
}) => {
  const [isEdit, setEdit] = useState(false)
  const theme = useTheme()
  //const t = useI18n()

  return (
    <div style={{ width: itemWidth }}>
      <button
        style={{ ...listStyles.button, borderColor: theme['c-primary-light-200-alpha-700'], borderStyle: 'dashed' }}
        onClick={() => { setEdit(true) }}
      >
        <p style={{ opacity: isEdit ? 0 : 1 , color:theme['c-button-font']}}>{'list_create'}</p>
      </button>
      {
        isEdit
          ? <CreateUserList isEdit={isEdit} onHide={() => { setEdit(false) }} />
          : null
      }
    </div>
  )
}

export default ({ listId, onPress }: {
  listId: string
  onPress: (listInfo: LX.List.MyListInfo) => void
}) => {
  const { window } = useDimensions()
  const allList = useMyList().filter(l => l.id != listId)
  const itemWidth = useMemo(() => {
    let w = Math.floor(window.width * 0.9 - PADDING)
    let n = Math.floor(w / MIN_WIDTH)
    if (n > 10) n = 10
    return Math.floor((w - 1) / n)
  }, [window])

  return (
    <div style={{ flexGrow: 0 }}>
      <div>
        { allList.map(info => <ListItem key={info.id} listInfo={info} onPress={onPress} width={itemWidth} />) }
        <EditListItem itemWidth={itemWidth} />
      </div>
    </div>
  )
}
