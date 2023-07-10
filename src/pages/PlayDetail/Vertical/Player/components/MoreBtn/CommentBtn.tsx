import React from 'react'
import Btn from './Btn'


export default () => {
  const handleShowCommentScreen = () => {
   // navigations.pushCommentScreen(commonState.componentIds.playDetail as string)
  }

  return <Btn icon="comment" onPress={handleShowCommentScreen} />
}
