import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { toast } from '../../utils/tools'
import Title from './Title'
import List from './List'
//import { useI18n } from '../../lang'
import { addListMusics, moveListMusics } from '../../core/list'
import settingState from '../../store/setting/state'

export interface SelectInfo {
  musicInfo: LX.Music.MusicInfo | null
  listId: string
  isMove: boolean
  // single: boolean
}
const initSelectInfo = {}

// export interface MusicAddModalProps {
//   onRename: (listInfo: LX.List.UserListInfo) => void
//   onImport: (listInfo: LX.List.MyListInfo, index: number) => void
//   onExport: (listInfo: LX.List.MyListInfo, index: number) => void
//   onSync: (listInfo: LX.List.UserListInfo) => void
//   onRemove: (listInfo: LX.List.UserListInfo) => void
// }
export interface MusicAddModalType {
  show: (info: SelectInfo) => void
}

export default forwardRef<MusicAddModalType, {}>((props, ref) => {
  //const t = useI18n()
  const [selectInfo, setSelectInfo] = useState<SelectInfo>(initSelectInfo as SelectInfo)

  useImperativeHandle(ref, () => ({
    show(selectInfo) {
      setSelectInfo(selectInfo)
    },
  }))

  const handleHide = () => {
    requestAnimationFrame(() => {
      setSelectInfo({ ...selectInfo, musicInfo: null })
    })
  }

  const handleSelect = (listInfo: LX.List.MyListInfo) => {
    if (selectInfo.isMove) {
      void moveListMusics(selectInfo.listId, listInfo.id,
        [selectInfo.musicInfo as LX.Music.MusicInfo],
        settingState.setting['list.addMusicLocationType'],
      ).then(() => {
        toast('list_edit_action_tip_move_success')
      }).catch(() => {
        toast('list_edit_action_tip_move_failed')
      })
    } else {
      void addListMusics(listInfo.id,
        [selectInfo.musicInfo as LX.Music.MusicInfo],
        settingState.setting['list.addMusicLocationType'],
      ).then(() => {
        toast('list_edit_action_tip_add_success')
      }).catch(() => {
        toast('list_edit_action_tip_add_failed')
      })
    }
  }

  return (
    <div>
      {
        selectInfo.musicInfo
          ? (<>
              <Title musicInfo={selectInfo.musicInfo} isMove={selectInfo.isMove} />
              <List musicInfo={selectInfo.musicInfo} onPress={handleSelect} />
            </>)
          : null
      }
    </div>
  )
})

