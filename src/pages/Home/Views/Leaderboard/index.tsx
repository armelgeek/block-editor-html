import React, { useEffect, useRef, useState } from "react";
import { getLeaderboardSetting, saveLeaderboardSetting } from "../../../../utils/data";

import LeftBar, { LeftBarProps, LeftBarType } from "./LeftBar";
import MusicList, { MusicListType } from "./MusicList";
import SongList from "../SongList";
import SearchTypeSelector from "./SearchTypeSelector";

// import { BorderWidths } from '../../../../theme'
// import { useTheme } from '../../../../store/theme/hook'

export default () => {
  const leftBarRef = useRef<LeftBarType>(null);
  const musicListRef = useRef<MusicListType>(null);
  const [listType, setListType] = useState<any>("music");
  const isUnmountedRef = useRef(false);
  // const theme = useTheme()
  const [state, updateState] = useState(false);
  const toggleState = () => {
    updateState(!state);
  }
  const handleChangeBound: LeftBarProps["onChangeList"] = (source, id) => {
    musicListRef.current?.loadList(source, id);
    void saveLeaderboardSetting({
      source,
      boardId: id,
    });
  };
 
  useEffect(() => {
    isUnmountedRef.current = false;
    void getLeaderboardSetting().then(({ source, boardId }) => {
      leftBarRef.current?.setBound(source, boardId);
      musicListRef.current?.loadList(source, boardId);
    });

    return () => {
      isUnmountedRef.current = true;
    };
  }, []);
  useEffect(() => {
    global.app_event.on("searchTypeChanged", (type:any) =>{
      toggleState();
      setListType(type);
    });
    return () => {
      global.app_event.off("searchTypeChanged", (type:any) => setListType(type));
    };
  }, []);
  console.log('musicListRef',musicListRef.current);
  return (
    <div>
      <SearchTypeSelector/>
      <LeftBar ref={leftBarRef} onChangeList={handleChangeBound} />
      {listType == "songlist" ? <SongList/> : <MusicList ref={musicListRef} />}

    </div>
  );
};