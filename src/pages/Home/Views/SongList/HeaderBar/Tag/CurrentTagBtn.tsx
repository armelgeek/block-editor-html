//import { useI18n } from '../../../../lang'
import { createStyle } from '../../../../utils/tools'
import React, { forwardRef, useImperativeHandle, useState } from 'react'


export interface CurrentTagBtnProps {
  onShowList: () => void
}

export interface CurrentTagBtnType {
  setCurrentTagInfo: (name: string) => void
}

export default forwardRef<CurrentTagBtnType, CurrentTagBtnProps>(({ onShowList }, ref) => {
  //const t = useI18n()
  const [name, setName] = useState('')

  useImperativeHandle(ref, () => ({
    setCurrentTagInfo(name) {
      if (!name) name = 'songlist_tag_default'
      setName(name)
    },
  }))

  return (
    <button style={styles.btn} onClick={onShowList}>
      <p>{name}</p>
    </button>
  )
})


const styles = createStyle({
  btn: {
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
  },
  sourceMenu: {
    // height: 38,
    // lineHeight: 38,
    textAlign: 'center',
    // minWidth: 70,
    // paddingTop: 10,
    // paddingBottom: 10,
  },
})
