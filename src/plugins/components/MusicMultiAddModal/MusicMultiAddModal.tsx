import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { toast } from '../../../../utils/tools'
import Title from './Title'
import List from './List'
//import { useI18n } from '../../../../lang'
import { addListMusics, moveListMusics } from '../../../../core/list'
import settingState from '../../../../store/setting/state'

export interface SelectInfo {
  selectedList: LX.Music.MusicInfo[]
  listId: string
  isMove: boolean
  // single: boolean
}
const initSelectInfo = { selectedList: [], listId: '', isMove: false }

// export interface MusicMultiAddModalProps {
//   onRename: (listInfo: LX.List.UserListInfo) => void
//   onImport: (listInfo: LX.List.MyListInfo, index: number) => void
//   onExport: (listInfo: LX.List.MyListInfo, index: number) => void
//   onSync: (listInfo: LX.List.UserListInfo) => void
//   onRemove: (listInfo: LX.List.UserListInfo) => void
// }
export interface MusicMultiAddModalType {
  show: (info: SelectInfo) => void
}

export default forwardRef<MusicMultiAddModalType, {}>((props, ref) => {
  //const t = useI18n()
  const dialogRef = useRef<any>(null)
  const [selectInfo, setSelectInfo] = useState<SelectInfo>(initSelectInfo)

  useImperativeHandle(ref, () => ({
    show(selectInfo) {
      setSelectInfo(selectInfo)

      requestAnimationFrame(() => {
        dialogRef.current?.setVisible(true)
      })
    },
  }))

  const handleHide = () => {
    requestAnimationFrame(() => {
      setSelectInfo({ ...selectInfo, selectedList: [] })
    })
  }

  const handleSelect = (listInfo: LX.List.MyListInfo) => {
    dialogRef.current?.setVisible(false)
    if (selectInfo.isMove) {
      void moveListMusics(selectInfo.listId, listInfo.id,
        [...selectInfo.selectedList],
        settingState.setting['list.addMusicLocationType'],
      ).then(() => {
        toast('list_edit_action_tip_move_success')
      }).catch(() => {
        toast('list_edit_action_tip_move_failed')
      })
    } else {
      void addListMusics(listInfo.id,
        [...selectInfo.selectedList],
        settingState.setting['list.addMusicLocationType'],
      ).then(() => {
        toast('list_edit_action_tip_add_success')
      }).catch(() => {
        toast('list_edit_action_tip_add_failed')
      })
    }
  }

  return (
    <div ref={dialogRef}>
      {
        selectInfo.selectedList.length
          ? (<>
              <Title selectedList={selectInfo.selectedList} isMove={selectInfo.isMove} />
              <List listId={selectInfo.listId} onPress={handleSelect} />
            </>)
          : null
      }
    </div>
  )
})

