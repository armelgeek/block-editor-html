import React, { useEffect, useRef } from 'react'

import MusicList, { type MusicListType } from './MusicList'
import songlistState from '../../../../store/songlist/state'
import Header from './Header'


export default ({ componentId }: { componentId: string }) => {
  const musicListRef = useRef<MusicListType>(null)
  const isUnmountedRef = useRef(false)

  useEffect(() => {
    isUnmountedRef.current = false

    musicListRef.current?.loadList(songlistState.selectListInfo.source, songlistState.selectListInfo.id)


    return () => {
      isUnmountedRef.current = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <MusicList ref={musicListRef} componentId={componentId} />
     {/**<PlayerBar />**/}
     </>
  )
}
