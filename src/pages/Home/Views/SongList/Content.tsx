import { getSongListSetting, saveSongListSetting } from "../../../../utils/data";
import React, { useEffect, useRef } from "react";
// import List from './List/List'
import HeaderBar, {
  type HeaderBarProps,
  type HeaderBarType,
} from "./HeaderBar";
import songlistState, {
  type InitState,
  type SortInfo,
} from "../../../../store/songlist/state";
import List, { type ListType } from "./List";

interface SonglistInfo {
  source: InitState["sources"][number];
  sortId: SortInfo["id"];
  tagId: string;
}

export default () => {
  const headerBarRef = useRef<HeaderBarType>(null);
  const listRef = useRef<ListType>(null);
  const songlistInfo = useRef<SonglistInfo>({
    source: "kw",
    sortId: "5",
    tagId: "tous",
  });

  useEffect(() => {
    void getSongListSetting().then((info) => {
      songlistInfo.current.source = info.source;
      songlistInfo.current.sortId = info.sortId;
      songlistInfo.current.tagId = info.tagId;
      /**headerBarRef.current?.setSource(
        info.source,
        info.sortId,
        info.tagName,
        info.tagId
      );**/
      listRef.current?.loadList(info.source, info.sortId, info.tagId);
    });
  }, []);

  const handleSortChange: HeaderBarProps["onSortChange"] = (id) => {
    songlistInfo.current.sortId = id;
    void saveSongListSetting({ sortId: id });
    listRef.current?.loadList(
      songlistInfo.current.source,
      id,
      songlistInfo.current.tagId
    );
  };
  return (
    <div >
     {/** <HeaderBar
        ref={headerBarRef}
        onSortChange={handleSortChange}
        onTagChange={handleTagChange}
        onSourceChange={handleSourceChange}
      /> */}
      <List ref={listRef} />
    </div>
  );
};
