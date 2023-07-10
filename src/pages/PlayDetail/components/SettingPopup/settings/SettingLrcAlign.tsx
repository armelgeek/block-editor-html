import React, { useMemo } from 'react'

import { useSettingValue } from '../../../../../store/setting/hook'
import { updateSetting } from '../../../../../core/common'
//import { useI18n } from '../../../../../lang'
type Align_Type = LX.AppSetting['playDetail.style.align']

const ALIGN_LIST = [
  'left',
  'center',
  'right',
] as const

const useActive = (id: Align_Type) => {
  const x = useSettingValue('playDetail.style.align')
  const isActive = useMemo(() => x == id, [x, id])
  return isActive
}

const Item = ({ id, name, change }: {
  id: Align_Type
  name: string
  change: (id: Align_Type) => void
}) => {
  const isActive = useActive(id)
  // const [toggleCheckBox, setToggleCheckBox] = useState(false)
  return <button onClick={() => { change(id) }}>{isActive ? 'check': 'not-check'}</button>
}

export default () => {
  //const t = useI18n()
  const list = useMemo(() => {
    return ALIGN_LIST.map(id => ({ id, name: `play_detail_setting_lrc_align_${id}` }))
  }, [])

  const setPosition = (id: Align_Type) => {
    updateSetting({ 'playDetail.style.align': id })
  }

  return (
    <div>
      <p>{'play_detail_setting_lrc_align'}</p>
      <div>
        <div>
          {
            list.map(({ id, name }) => <Item name={name} id={id} key={id} change={setPosition} />)
          }
        </div>
      </div>
    </div>
  )
}
