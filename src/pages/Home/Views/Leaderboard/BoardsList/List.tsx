import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createStyle } from "../../../../../utils/tools";
import { type Position } from "./ListMenu";
import ListItem, { type ListItemProps } from "./ListItem";
import boardState, { type BoardItem } from "../../../../../store/leaderboard/state";
import { setListInfo } from "../../../../../core/songlist";
import songlistAction from "../../../../../store/songlist/action";

export interface ListProps {
  onBoundChange: (listId: string) => void;
  onShowMenu: (
    info: { listId: string; name: string; index: number },
    position: Position
  ) => void;
}
export interface ListType {
  setList: (list: BoardItem[], activeId: string) => void;
  hideMenu: () => void;
}
const removePrefix = (text: string) => {
  return text.replace("kw__", "");
};
const filterString = (str: string) => {
  if (str.includes("kw__")) {
    return removePrefix(str);
  } else {
    return str;
  }
};
const findIndexById = (data: any, id: string) => {
  return data.findIndex((item: any) => item.id == id);
};

export default forwardRef<ListType, ListProps>(
  ({ onBoundChange, onShowMenu }, ref) => {
    const [activeId, setActiveId] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [longPressIndex, setLongPressIndex] = useState(-1);
    const [list, setList] = useState<BoardItem[]>([]);
    const flatListRef = useRef();
    const scrollTimoutRef = useRef(null);
    const isPauseScrollRef = useRef(true);
    const isFirstSetList = useRef(true);
  
    useImperativeHandle(
      ref,
      () => ({
        setList(list, activeId) {
          setList(list);
          setActiveId(activeId);
        },
        hideMenu() {
          setLongPressIndex(-1);
        },
      }),
      []
    );

    const handleBoundChange = (item: BoardItem) => {
      setActiveId(item.id);
      onBoundChange(item.id);
    };

    const handleShowMenu: ListItemProps["onShowMenu"] = (
      listId,
      name,
      index,
      position: Position
    ) => {
      setLongPressIndex(index);
      onShowMenu({ listId, name, index }, position);
    };
    const renderItem = useCallback(
      ({ item, index }: any) => (
        <ListItem
          key={item.id}
          item={item}
          index={index}
          longPressIndex={longPressIndex}
          activeId={activeId}
          onShowMenu={handleShowMenu}
          onBoundChange={() => {
            setActiveIndex(index);
            handleBoundChange(item);
            global.app_event.selectTagChange(item.name);
            setListInfo("kw", filterString(item.name), "");
            songlistAction.setListDetailInfo('kw',item.name);
            global.app_event.songFilterChanged();
          }}
        />
      ),
      [activeId]
    );
    return (
      <div className="board-list-container">
      {list.map((item,index) => renderItem({
        item,
        index
      }))}
      </div>
    );
  }
);

