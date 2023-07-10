import React from 'react'
import { useTheme } from '../../store/theme/hook'
//import { useI18n } from '../../lang'

export default ({ musicInfo, isMove }: {
  musicInfo: LX.Music.MusicInfo
  isMove: boolean
}) => {
  const theme = useTheme()
  //const t = useI18n()
  return (
    <p >
      {isMove ? 'list_add_title_first_move' : 'list_add_title_first_add'} <p color={theme['c-primary-font']}>{musicInfo.name}</p> {'list_add_title_last'}
    </p>
  )
}
