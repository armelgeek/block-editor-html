import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Songlist, {
  type SonglistProps,
  type SonglistType,
} from "./components/Songlist";
import { clearList, getList, setList, setListInfo } from "../../../../core/songlist";
import songlistState, { type Source } from "../../../../store/songlist/state";
import _ from "lodash";
import boardState from "../../../../store/leaderboard/state";
export interface ListType {
  loadList: (source: Source, sortId: string, tagId: string) => void;
}

export default forwardRef<ListType, {}>((props, ref) => {
  const listRef = useRef<SonglistType>(null);
  const isUnmountedRef = useRef(false);
  const [state, forceUpdate] = useState(false); // Ajout d'un état pour forcer la mise à jour du composant
  const toggleState = () => {
    //updateState(!state);
    forceUpdate(!state); // Inverse la valeur de l'état pour forcer la mise à jour du composant
    if (
      (boardState.filters.date && !_.isUndefined(boardState.filters.date.id)) ||
      (boardState.filters.sort &&
        !_.isUndefined(boardState.filters.sort.direction) &&
        !_.isUndefined(boardState.filters.sort.selectedItemId))
    ) {
      handleRefresh();
    } else {
      listRef.current?.setStatus("refreshing");
      getList(
        songlistState.listInfo.source,
        songlistState.listInfo.tagId,
        songlistState.listInfo.sortId,
        songlistState.listInfo.page,
        false
      )
        .then((info) => {
          if (!_.isUndefined(info)) {
            const result = setList(
              info,
              songlistState.listInfo.tagId,
              "hot",
              songlistState.listInfo.page
            );
            requestAnimationFrame(() => {
              listRef.current?.setList(result?.list);
              listRef.current?.setStatus(
                songlistState.listInfo.maxPage <= songlistState.listInfo.page
                  ? "end"
                  : "idle"
              );
            });
          }
        })
        .catch(() => {
          if (
            songlistState.listInfo.list.length &&
            songlistState.listInfo.page == 1
          )
            clearList();
          //listRef.current?.setStatus("error");
        });
    }
  };
  useImperativeHandle(
    ref,
    () => ({
      async loadList(source, sortId, tagId) {
        const listInfo = songlistState.listInfo;
        listRef.current?.setList([]);
        if (
          listInfo.tagId == tagId &&
          listInfo.sortId == sortId &&
          listInfo.source == source &&
          listInfo.list.length
        ) {
          requestAnimationFrame(() => {
            listRef.current?.setList(listInfo.list);
          });
        } else {
          listRef.current?.setStatus("loading");
          setListInfo(source, tagId, "hot");
          const page = 1;
          return getList(source, tagId, sortId, page)
            .then((info) => {
              if (!_.isUndefined(info)) {
                const result = setList(info, tagId, "hot", page);
                if (isUnmountedRef.current) return;
                requestAnimationFrame(() => {
                  listRef.current?.setList(result.list);
                  listRef.current?.setStatus(
                    songlistState.listInfo.maxPage <= page ? "end" : "idle"
                  );
                });
              }
            })
            .catch(() => {
              if (songlistState.listInfo.list.length && page == 1) clearList();
              listRef.current?.setStatus("error");
            });
        }
      },
    }),
    [state]
  );

  useEffect(() => {
    isUnmountedRef.current = false;
    return () => {
      isUnmountedRef.current = true;
    };
  }, []);
  useEffect(() => {
    global.app_event.on("songFilterChanged", toggleState);
    return () => {
      global.app_event.off("songFilterChanged", toggleState);
    };
  }, []);

  const handleRefresh: SonglistProps["onRefresh"] = () => {
    const page = 1;
    listRef.current?.setStatus("refreshing");
    getList(
      songlistState.listInfo.source,
      songlistState.listInfo.tagId,
      songlistState.listInfo.sortId,
      page,
      true
    )
      .then((info) => {
        //console.log('inf',info)
        if (!_.isUndefined(info)) {
          const result = setList(
            info,
            songlistState.listInfo.tagId,
            songlistState.listInfo.sortId,
            page
          );
          if (isUnmountedRef.current) return;
          listRef.current?.setList(result.list);
          listRef.current?.setStatus(
            songlistState.listInfo.maxPage <= page ? "end" : "idle"
          );
        }
      })
      .catch((error) => {
        console.log(error);
        if (songlistState.listInfo.list.length && page == 1) clearList();
        listRef.current?.setStatus("error");
      });
  };
  const handleLoadMore: SonglistProps["onLoadMore"] = () => {
    listRef.current?.setStatus("loading");
    const page = songlistState.listInfo.list.length
      ? songlistState.listInfo.page + 1
      : 1;
    getList(
      songlistState.listInfo.source,
      songlistState.listInfo.tagId,
      songlistState.listInfo.sortId,
      page
    )
      .then((info) => {
        if (!_.isUndefined(info)) {
          const result = setList(
            info,
            songlistState.listInfo.tagId,
            songlistState.listInfo.sortId,
            page
          );
          if (isUnmountedRef.current) return;
          listRef.current?.setList(result.list);
          listRef.current?.setStatus(
            songlistState.listInfo.maxPage <= page ? "end" : "idle"
          );
        }
      })
      .catch(() => {
        if (songlistState.listInfo.list.length && page == 1) clearList();
        listRef.current?.setStatus("error");
      });
  };

  return (
    <Songlist
      ref={listRef}
      onRefresh={handleRefresh}
      onLoadMore={handleLoadMore}
    />
  );
});
