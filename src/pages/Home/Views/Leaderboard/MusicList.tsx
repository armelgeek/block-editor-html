import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import OnlineList, {
  type OnlineListType,
  type OnlineListProps,
} from "../../../../components/OnlineList";
import {
  clearListDetail,
  getListDetail,
  setListDetail,
  setListDetailInfo,
} from "../../../../core/leaderboard";
import boardState from "../../../../store/leaderboard/state";
import { handlePlay } from "./listAction";
import songlistState from "../../../..//store/songlist/state";
import _ from "lodash";
// export type MusicListProps = Pick<OnlineListProps,
// 'onLoadMore'
// | 'onPlayList'
// | 'onRefresh'
// >
function transformString(input: string) {
  return input.replace(/[' ]+/g, "_").toLowerCase();
}
function removePrefix(text: string) {
  return text.replace("kw__", "");
}
function filterString(str: string) {
  if (str.includes("kw__")) {
    return removePrefix(str);
  } else {
    return str;
  }
}
export interface MusicListType {
  loadList: (source: LX.OnlineSource, listId: string) => void;
}

export default forwardRef<any, {}>((props:any, ref) => {
  const listRef = useRef<OnlineListType>(null);
  const isUnmountedRef = useRef(false);
  const [state, updateState] = useState(false);
  const toggleState = () => {
    updateState(!state);
    if (
      (boardState.filters.date && !_.isUndefined(boardState.filters.date.id)) ||
      (boardState.filters.sort &&
        !_.isUndefined(boardState.filters.sort.direction) &&
        !_.isUndefined(boardState.filters.sort.selectedItemId))
    ) {
      handleRefresh();
    } else {
      const listDetailInfo = boardState.listDetailInfo;
      if (!listDetailInfo.id.startsWith("kw__")) {
        listDetailInfo.id = transformString("kw__" + listDetailInfo.id);
      } else {
        listDetailInfo.id = transformString(listDetailInfo.id);
      }
      requestAnimationFrame(() => {
        //listRef.current?.setList([]);
        if (
          listDetailInfo.source == "kw" &&
          Array.isArray(listDetailInfo.list) &&
          listDetailInfo.list.length
        ) {
          requestAnimationFrame(() => {
            listRef.current?.setList(listDetailInfo.list);
          });
        } else {
          handleRefresh();
        }
      });
    }
  };
  useImperativeHandle(
    ref,
    () => ({
      async loadList(source = "kw", id) {
        const listDetailInfo = boardState.listDetailInfo;
        if (!listDetailInfo.id.startsWith("kw__")) {
          listDetailInfo.id = "kw__" + listDetailInfo.id;
          listDetailInfo.id = transformString("kw__" + listDetailInfo.id);
        } else {
          listDetailInfo.id = transformString(listDetailInfo.id);
        }
        console.log(
          "listDetailInfo",
          transformString(id),
          listDetailInfo.id,
          listDetailInfo.id == transformString(id)
        );
        listRef.current?.setList([]);
        if (
          listDetailInfo.id == transformString(id) &&
          listDetailInfo.source == source &&
          listDetailInfo.list.length
        ) {
          requestAnimationFrame(() => {
            listRef.current?.setList(listDetailInfo.list);
          });
        } else {
          listRef.current?.setStatus("loading");
          const page = 1;
          setListDetailInfo(transformString(id));

          return getListDetail(id, page)
            .then((listDetail) => {
              if (!_.isUndefined(listDetail)) {
                const result = setListDetail(listDetail, id, page);
                if (isUnmountedRef.current) return;
                requestAnimationFrame(() => {
                  listRef.current?.setList(result.list);
                  listRef.current?.setStatus(
                    boardState.listDetailInfo.maxPage <= page ? "end" : "idle"
                  );
                });
              }
            })
            .catch((err) => {
              if (boardState.listDetailInfo.list.length && page == 1)
                clearListDetail();
              listRef.current?.setStatus("error");
            });
        }
      },
    }),
    [state, boardState]
  );
 
  useEffect(() => {
    isUnmountedRef.current = false;
    return () => {
      isUnmountedRef.current = true;
    };
  }, []);

  const handlePlayList: OnlineListProps["onPlayList"] = (index) => {
    const listDetailInfo = boardState.listDetailInfo;
    // console.log(boardState.listDetailInfo)
    void handlePlay(listDetailInfo.id, listDetailInfo.list, index);
  };
  const handleRefresh: OnlineListProps["onRefresh"] = useCallback(() => {
    const page = 1;
    listRef.current?.setStatus("refreshing");
    if (
      filterString(boardState.listDetailInfo.id) != songlistState.listInfo.tagId
    ) {
      boardState.listDetailInfo.id = songlistState.listInfo.tagId;
    }
    if (!boardState.listDetailInfo.id.startsWith("kw__")) {
      boardState.listDetailInfo.id = "kw__" + boardState.listDetailInfo.id;
    }

    //console.log('lika',boardState.listDetailInfo.id);
    if (boardState.listDetailInfo.id) {
      getListDetail(boardState.listDetailInfo.id, page, true)
        .then((listDetail) => {
          if (!_.isUndefined(listDetail)) {
            //console.log('listDetail',listDetail);
            const result = setListDetail(
              listDetail,
              boardState.listDetailInfo.id,
              page
            );
            if (isUnmountedRef.current) return;
            // console.log('result',result);
            if (result.list != null) {
              listRef.current?.setList(result?.list);
            }
            listRef.current?.setStatus(
              boardState.listDetailInfo.maxPage <= page ? "end" : "idle"
            );
          }
        })
        .catch((error) => {
          console.log("error leka", error);

          if (boardState.listDetailInfo.list.length && page == 1)
            clearListDetail();
          listRef.current?.setStatus("error");
        });
    }
  }, []);
  useEffect(() => {
    global.app_event.on("songFilterChanged", toggleState);
    return () => {
      global.app_event.off("songFilterChanged", toggleState);
    };
  }, []);
  useEffect(() => {
    global.app_event.on("searchTypeChanged", toggleState);
    return () => {
      global.app_event.off("searchTypeChanged", toggleState);
    };
  }, [state]);
  const handleLoadMore: OnlineListProps["onLoadMore"] = useCallback(() => {
    listRef.current?.setStatus("loading");
    const page = boardState.listDetailInfo.list.length
      ? boardState.listDetailInfo.page + 1
      : 1;
    getListDetail(boardState.listDetailInfo.id, page)
      .then((listDetail) => {
        if (!_.isUndefined(listDetail)) {
          const result = setListDetail(
            listDetail,
            boardState.listDetailInfo.id,
            page
          );
          if (isUnmountedRef.current) return;
          //console.log('result',result.list);
          listRef.current?.setList(result?.list);
          listRef.current?.setStatus(
            boardState.listDetailInfo.maxPage <= page ? "end" : "idle"
          );
        }
      })
      .catch(() => {
        if (boardState.listDetailInfo.list.length && page == 1)
          clearListDetail();
        listRef.current?.setStatus("error");
      });
  }, []);

  return (
    <OnlineList
      ref={listRef}
      onPlayList={handlePlayList}
      onRefresh={handleRefresh}
      onLoadMore={handleLoadMore}
      checkHomePagerIdle
    />
  );
});
