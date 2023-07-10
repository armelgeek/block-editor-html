import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  useRef,
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
} from "../../../../core/songlist";
import songlistState from "../../../../store/songlist/state";
import { handlePlay } from "./listAction";
import Header, { type HeaderType } from "./Header";
import { useTheme } from "../../../../store/theme/hook";
import ButtonBar from "./ActionBar";
export interface MusicListProps {
  componentId: string;
}

export interface MusicListType {
  loadList: (source: LX.OnlineSource, listId: string) => void;
}

export default forwardRef<MusicListType, MusicListProps>(
  ({ componentId }, ref) => {
    const listRef = useRef<OnlineListType>(null);
    const headerRef = useRef<HeaderType>(null);
    const isUnmountedRef = useRef(false);
    const [isFirstItemVisible, setIsFirstItemVisible] = useState(false);
    const theme = useTheme();

    const [headerHeight, setHeaderHeight] = useState(0);

    useImperativeHandle(
      ref,
      () => ({
        async loadList(source = "kw", id) {
          const listDetailInfo = songlistState.listDetailInfo;
          listRef.current?.setList([]);
          if (
            listDetailInfo.id == id &&
            listDetailInfo.source == source &&
            listDetailInfo.list.length
          ) {
            requestAnimationFrame(() => {
              listRef.current?.setList(listDetailInfo.list);
              headerRef.current?.setInfo({
                name:
                  (songlistState.selectListInfo.name ||
                    listDetailInfo.info.name) ??
                  "",
                desc: "",
                playCount:
                  songlistState.selectListInfo.play_count ??
                  listDetailInfo.info.play_count ??
                  "",
                imgUrl:
                  songlistState.selectListInfo.img ?? listDetailInfo.info.img,
              });
            });
          } else {
            listRef.current?.setStatus("loading");
            const page = 1;
            setListDetailInfo(
              songlistState.selectListInfo.source,
              songlistState.selectListInfo.id
            );
            headerRef.current?.setInfo({
              name:
                (songlistState.selectListInfo.name ||
                  listDetailInfo.info.name) ??
                "",
              desc: "",
              playCount:
                songlistState.selectListInfo.play_count ??
                listDetailInfo.info.play_count ??
                "",
              imgUrl:
                songlistState.selectListInfo.img ?? listDetailInfo.info.img,
              time:
                songlistState.selectListInfo.time ?? listDetailInfo.info.time,
              total:
                songlistState.selectListInfo.total ?? listDetailInfo.info.total,
            });
            return getListDetail(id, source, page)
              .then((listDetail) => {
                const result = setListDetail(listDetail, id, page);

                if (isUnmountedRef.current) return;
                requestAnimationFrame(() => {
                  headerRef.current?.setInfo({
                    name:
                      (songlistState.selectListInfo.name ||
                        listDetailInfo.info.name) ??
                      "",
                    desc: "",
                    playCount:
                      songlistState.selectListInfo.play_count ??
                      listDetailInfo.info.play_count ??
                      "",
                    imgUrl:
                      songlistState.selectListInfo.img ??
                      listDetailInfo.info.img,
                    time:
                      songlistState.selectListInfo.time ??
                      listDetailInfo.info.time,
                    total:
                      songlistState.selectListInfo.total ??
                      listDetailInfo.info.total,
                  });
                  listRef.current?.setList(result.list);
                  listRef.current?.setStatus(
                    songlistState.listDetailInfo.maxPage <= page
                      ? "end"
                      : "idle"
                  );
                });
              })
              .catch((error) => {
                console.log("error one", error);
                if (songlistState.listDetailInfo.list.length && page == 1)
                  clearListDetail();
                listRef.current?.setStatus("error");
              });
          }
        },
      }),
      []
    );

    useEffect(() => {
      isUnmountedRef.current = false;
      return () => {
        isUnmountedRef.current = true;
      };
    }, []);

    const onHeaderLayout = (event: any) => {
      const { height } = event.nativeEvent.layout;
      setHeaderHeight(height);
    };

    const handlePlayList: OnlineListProps["onPlayList"] = (index) => {
      const listDetailInfo = songlistState.listDetailInfo;
      // console.log(songlistState.listDetailInfo)
      void handlePlay(
        listDetailInfo.id,
        listDetailInfo.source,
        listDetailInfo.list,
        index
      );
    };
    const handleRefresh: OnlineListProps["onRefresh"] = () => {
      const page = 1;
      listRef.current?.setStatus("refreshing");
      getListDetail(
        songlistState.listDetailInfo.id,
        songlistState.listDetailInfo.source,
        page,
        true
      )
        .then((listDetail) => {
          const result = setListDetail(
            listDetail,
            songlistState.listDetailInfo.id,
            page
          );
          if (isUnmountedRef.current) return;
          listRef.current?.setList(result.list);
          listRef.current?.setStatus(
            songlistState.listDetailInfo.maxPage <= page ? "end" : "idle"
          );
        })
        .catch((error) => {
          console.log("error", error);
          if (songlistState.listDetailInfo.list.length && page == 1)
            clearListDetail();
          listRef.current?.setStatus("error");
        });
    };
    const handleLoadMore: OnlineListProps["onLoadMore"] = () => {
      listRef.current?.setStatus("loading");
      const page = songlistState.listDetailInfo.list.length
        ? songlistState.listDetailInfo.page + 1
        : 1;
      getListDetail(
        songlistState.listDetailInfo.id,
        songlistState.listDetailInfo.source,
        page
      )
        .then((listDetail) => {
          const result = setListDetail(
            listDetail,
            songlistState.listDetailInfo.id,
            page
          );
          if (isUnmountedRef.current) return;
          listRef.current?.setList(result.list);
          listRef.current?.setStatus(
            songlistState.listDetailInfo.maxPage <= page ? "end" : "idle"
          );
        })
        .catch((error) => {
          console.log("error", error);
          if (songlistState.listDetailInfo.list.length && page == 1)
            clearListDetail();
          listRef.current?.setStatus("error");
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const header = useMemo(
      () => (
        <div
          style={{
            flex: 1,
          }}
        >
          <Header ref={headerRef} componentId={componentId} />
        </div>
      ),
      []
    );

    return (
      <div
        style={{
          flex: 1,
        }}
      >
        <div style={{ zIndex: 100000 }}>
          {isFirstItemVisible && (
            <div
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                left: 0,
                right: 0,
                paddingTop: 7,
                backgroundColor: theme["c-content-background"],
                borderBottomWidth: 1,
                borderBottomColor: theme["c-button-background-active"],
              }}
            >
              <ButtonBar />
            </div>
          )}
        </div>
        <OnlineList
          ref={listRef}
          onScroll={() => {}}
          onPlayList={handlePlayList}
          onRefresh={handleRefresh}
          onLoadMore={handleLoadMore}
          ListHeaderComponent={header}
          // progressViewOffset={}
        />
      </div>
    );
  }
);
