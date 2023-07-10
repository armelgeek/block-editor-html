import React, { useRef, forwardRef, useImperativeHandle } from "react";
// import LoadingMask, { LoadingMaskType } from '../../../../components/common/LoadingMask'
import List, { type ListProps, type ListType, type Status } from "./List";
import ListMenu, {
  type ListMenuType,
  type Position,
  type SelectInfo,
} from "./ListMenu";
import ListMusicMultiAdd, {
  type MusicMultiAddModalType as ListAddMultiType,
} from "../../../../components/MusicMultiAddModal";
import ListMusicAdd, {
  type MusicAddModalType as ListMusicAddType,
} from "../../../../components/MusicAddModal";
import MultipleModeBar, {
  type MultipleModeBarType,
  type SelectMode,
} from "./MultipleModeBar";
import { handlePlay, handlePlayLater, handleShare } from "./listAction";

export interface OnlineListProps {
  onRefresh: ListProps["onRefresh"];
  onLoadMore: ListProps["onLoadMore"];
  onPlayList?: ListProps["onPlayList"];
  progressViewOffset?: ListProps["progressViewOffset"];
  ListHeaderComponent?: ListProps["ListHeaderComponent"];
  checkHomePagerIdle?: boolean;
  isOnEditMode?: boolean;
  onScroll?: any;
}
export interface OnlineListType {
  setList: (list: LX.Music.MusicInfoOnline[], showSource?: boolean) => void;
  setStatus: (val: Status) => void;
}

export default forwardRef<OnlineListType, OnlineListProps>(
  (
    {
      onRefresh,
      onLoadMore,
      onPlayList,
      progressViewOffset,
      ListHeaderComponent,
      checkHomePagerIdle = false,
      isOnEditMode = false,
      onScroll = () => {},
    },
    ref
  ) => {
    const listRef = useRef<ListType>(null);
    const multipleModeBarRef = useRef<MultipleModeBarType>(null);
    const listMusicAddRef = useRef<ListMusicAddType>(null);
    const listMusicMultiAddRef = useRef<ListAddMultiType>(null);
    const listMenuRef = useRef<ListMenuType>(null);
    // const loadingMaskRef = useRef<LoadingMaskType>(null)

    useImperativeHandle(ref, () => ({
      setList(list, showSource) {
        listRef.current?.setList(list, showSource,true);
      },
      setStatus(val) {
        listRef.current?.setStatus(val);
      },
    }));

    const hancelMultiSelect = () => {
      multipleModeBarRef.current?.show();
      listRef.current?.setIsMultiSelectMode(true);
    };
    const hancelSwitchSelectMode = (mode: SelectMode) => {
      multipleModeBarRef.current?.setSwitchMode(mode);
      listRef.current?.setSelectMode(mode);
    };
    const hancelExitSelect = () => {
      multipleModeBarRef.current?.exitSelectMode();
      listRef.current?.setIsMultiSelectMode(false);
    };

    const showMenu = (
      musicInfo: LX.Music.MusicInfoOnline,
      index: number,
      position: Position
    ) => {
      listMenuRef.current?.show(
        {
          musicInfo,
          index,
          single: false,
          selectedList: listRef.current!.getSelectedList(),
        },
        position
      );
    };
    const handleAddMusic = (info: SelectInfo) => {
      if (info.selectedList.length) {
        listMusicMultiAddRef.current?.show({
          selectedList: info.selectedList,
          listId: "",
          isMove: false,
        });
      } else {
        listMusicAddRef.current?.show({
          musicInfo: info.musicInfo,
          listId: "",
          isMove: false,
        });
      }
    };
    console.log('liso',listRef.current);
    return (
      <div>
          <div style={{ flex: 1 }}>
          <List
            ref={listRef}
            onShowMenu={showMenu}
           
            onMuiltSelectMode={hancelMultiSelect}
            onSelectAll={(isAll) =>
              multipleModeBarRef.current?.setIsSelectAll(isAll)
            }
            onScroll={onScroll}
            onRefresh={onRefresh}
            onLoadMore={onLoadMore}
            onPlayList={onPlayList}
            progressViewOffset={progressViewOffset}
            ListHeaderComponent={ListHeaderComponent}
            checkHomePagerIdle={checkHomePagerIdle}
          />
          <MultipleModeBar
            ref={multipleModeBarRef}
            onSwitchMode={hancelSwitchSelectMode}
            onSelectAll={(isAll) => listRef.current?.selectAll(isAll)}
            onExitSelectMode={hancelExitSelect}
          />
        </div>
        <ListMusicAdd ref={listMusicAddRef} />
        <ListMusicMultiAdd ref={listMusicMultiAddRef} />
        <ListMenu
          ref={listMenuRef}
          onPlay={(info) => {
            handlePlay(info.musicInfo);
          }}
          onPlayLater={(info) => {
            handlePlayLater(
              info.musicInfo,
              info.selectedList,
              hancelExitSelect
            );
          }}
          onCopyName={(info) => {
            handleShare(info.musicInfo);
          }}
          onAdd={handleAddMusic}
          isOnEditMode={isOnEditMode}
        />
        {/*  <LoadingMask ref={loadingMaskRef} /> */}
      </div>
    );
  }
);
