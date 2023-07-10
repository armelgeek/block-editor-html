import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import BoardsList, {
  type BoardsListType,
  type BoardsListProps,
} from "./BoardsList";
import { handleCollect, handlePlay } from "./listAction";
import boardState, { type InitState } from "../../../../store/leaderboard/state";
import { useTheme } from "../../../../store/theme/hook";
import { getBoardsList } from "../../../../core/leaderboard";
import SortTab, { type SortTabProps, type SortTabType } from "./SortTab";
import FilterPopup from "./FilterPopup";
import {
  clearListDetail,
  getListDetail,
  setListDetail,
  setListDetailInfo,
} from "../../../../core/leaderboard";
import DateFilter from "./components/Date/DateFilter";
import Sort from "./components/Sort";
import _ from "lodash";
import leaderboardActions from "../../../../store/leaderboard/action";

export interface LeftBarProps {
  onChangeList: (source: LX.OnlineSource, id: string) => void;
}

export interface LeftBarType {
  setBound: (source: LX.OnlineSource, id: string) => void;
}
const ListItem = ({
  keyword,
  onFilterChange,
}: {
  keyword: string;
  onFilterChange: any;
}) => {
  const theme = useTheme();
  return (
    <div
      style={{
        borderWidth: 1,
        borderColor: theme["c-button-background"],
      }}
      onClick={() => {
        onFilterChange(keyword);
      }}
      //   onLongPress={() => { onRemove(keyword) }}
    >
      <p
        style={{
          textTransform: "uppercase",
          color:theme["c-button-font"]
        }}
        
      >
        {keyword}
      </p>
    </div>
  );
};

export default forwardRef<LeftBarType, LeftBarProps>(
  ({ onChangeList }, ref) => {
    const theme = useTheme();
    const [total, setTotal] = useState(0);
    const [direction, setDirection] = useState("sort-alphabetical-ascending");
    const [current, setCurrent] = useState("Tous");
    const [activeFilter, setActiveFilter] = useState(false);
    const datePopupRef = useRef<any>(null);
    const byPopupRef = useRef<any>(null);
    const sortPopupRef = useRef<any>(null);
    const sourceSelectorRef = useRef<any>(null);
    const sortTabRef = useRef<SortTabType>(null);
    const boardsListRef = useRef<BoardsListType>(null);
    const [dateInputText, setDateInputText] = useState(null);
    const [tri, setTri] = useState(null);
    const boundInfo = useRef<{ source: LX.OnlineSource; id: string | null }>({
      source: "kw",
      id: null,
    });
    useEffect(() => {
      // setTotal(boardState.listDetailInfo.total);
      global.app_event.on("songFilterChanged", (v) => {
        setDateInputText(v.date);
        setTri(v.sort);
      //  console.log(boardState.listDetailInfo.total);
        //   setTotal(boardState.listDetailInfo.total);
      });

      return () => {
        global.app_event.off("songFilterChanged", (v) => {
          setDateInputText(v.date);
          setTri(v.sort);
          //    setTotal(boardState.listDetailInfo.total);
        });
      };
     
    }, []);
    useImperativeHandle(
      ref,
      () => ({
        setBound(source, listId) {
          boundInfo.current = { source, id: listId };
          let formatted = listId.substring(4).toUpperCase();
          setCurrent(formatted);
          sortTabRef.current?.setSource("kw", "new");
          // tagRef.current?.setSelectedTagInfo(source, "tagName", "tagId");
          sourceSelectorRef.current?.setSourceList(boardState.sources, source);
          void getBoardsList(source).then((list) => {
            boardsListRef.current?.setList(list, listId);
          });
        },
      }),
      []
    );

    const showDateFilter = () => {
      datePopupRef.current?.show();
    };
    const showByFilter = () => {
      byPopupRef.current?.show();
    };
    const showSortFilter = () => {
      sortPopupRef.current?.show();
    };
    const alphabeticFilter = () => {
      if (direction == "sort-alphabetical-descending") {
        setDirection("sort-alphabetical-ascending");
      } else {
        setDirection("sort-alphabetical-descending");
      }
      handleBoardFilter(direction);
    };
    const handleBoardFilter = (dir: any) => {
      leaderboardActions.setFilterBoard({
        name: "sort",
        value: {
          direction: dir == "sort-alphabetical-ascending" ? "asc" : "desc",
          selectedItemId: 2,
        },
      });
      global.app_event.songFilterChanged();
    };
    const clearFilter = () => {
      leaderboardActions.clearFilterBoard();
      global.app_event.songFilterChanged();
    };
    
    const onBoundChange: BoardsListProps["onBoundChange"] = (id) => {
      boundInfo.current.id = id;
      let formatted = id.substring(4).toUpperCase();
      setCurrent(formatted);
      onChangeList(boundInfo.current.source, id);
      global.app_event.songFilterChanged();
    };
    const onPlay: BoardsListProps["onPlay"] = (id: any) => {
      boundInfo.current.id = id;
      void handlePlay(id, boardState.listDetailInfo.list);
    };
    const onCollect: BoardsListProps["onCollect"] = (id, name: string) => {
      boundInfo.current.id = id;
      void handleCollect(id, name, boundInfo.current.source);
    };
    const toggleFilter = () => {
      setActiveFilter(!activeFilter);
      if (activeFilter == true) {
        setDateInputText(null);
        clearFilter();
      }
    };
    console.log('cur',current);
    return (
      <div
        style={{
          borderBottomWidth:1,
          borderBottomColor: theme["c-list-header-border-bottom"],
        }}
      >
        <BoardsList
          ref={boardsListRef}
          onBoundChange={onBoundChange}
          onPlay={onPlay}
          onCollect={onCollect}
        />

        <div>
          <div
            style={{
              fontSize: 13,
              marginTop:10,
              fontWeight: "bold",
              color: theme["c-button-font"],
            }}
          >
            {current}
          </div>
          {/**<SortTab
            ref={sortTabRef}
            onSortChange={() => console.log("on sort")}
      />**/}
          <div
            style={{
             borderWidth: 1,
              padding: 10,
              borderRadius: 15,
              borderColor: activeFilter
                ? theme["c-button-background"]
                : theme["c-050"],
            }}
          >
            <div
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={toggleFilter}
            >
              
              {activeFilter ? (
                <div
                  style={{
                    marginLeft: 5,
                    fontSize: 13,
                    color: theme["c-button-font"],
                  }}
                >
                  Clear filter
                </div>
              ) : (
                <div
                  style={{
                    marginLeft: 5,
                    fontSize: 13,
                  }}
                >
                  Filtrer la liste
                </div>
              )}
            </div>
          </div>
        </div>
        {activeFilter && (
          <div>
            <ListItem
              keyword={
                !_.isEmpty(dateInputText) ? dateInputText.name : "Date d'ajout"
              }
              onFilterChange={showDateFilter}
            />
            {/**<ListItem keyword="Par" onFilterChange={showByFilter} />**/}
            <ListItem
              keyword={
                !_.isEmpty(tri)
                  ? boardState.sortData[tri.selectedItemId - 1 || 0]?.title +
                    " - " +
                    (tri.direction=="desc" ? "Décroissant": "Croissant")
                  : "Trier par"
              }
              onFilterChange={showSortFilter}
            />
          </div>
        )}

        <FilterPopup
          title="Date d'ajout"
          ref={datePopupRef}
          direction="vertical"
        >
          <DateFilter />
        </FilterPopup>
        {/**x <FilterPopup
          title="Par"
          ref={byPopupRef}
          position="bottom-top"
          direction="vertical"
        >
          <UserList />
            </FilterPopup>*/}
        <FilterPopup
          title="Trier par"
          ref={sortPopupRef}
          position="bottom"
          direction="vertical"
        >
          <Sort />
        </FilterPopup>
        {/** <View style={styles.selectorContainer}>
      <View style={styles.selector}>
        <SourceSelector ref={sourceSelectorRef} onSourceChange={onSourceChange} />
      </View></View> */}
      </div>
    );
  }
);
