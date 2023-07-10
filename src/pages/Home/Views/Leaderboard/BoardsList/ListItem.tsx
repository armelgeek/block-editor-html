import React, { useCallback, useRef } from "react";
import { useTheme } from "../../../../../store/theme/hook";
import { createStyle } from "../../../../../utils/tools";
import { type BoardItem } from "../../../../../store/leaderboard/state";

// index={index}
// longPressIndex={longPressIndex}
// activeId={activeId}
// showMenu={showMenu}
// onBoundChange={handleBoundChange}
export interface ListItemProps {
  item: BoardItem;
  index: number;
  longPressIndex: number;
  activeId: string;
  onShowMenu: (
    id: string,
    name: string,
    index: number,
    position: { x: number; y: number; w: number; h: number }
  ) => void;
  onBoundChange: (item: BoardItem) => void;
}

export default ({
  item,
  activeId,
  index,
  longPressIndex,
  onBoundChange,
  onShowMenu,
}: ListItemProps) => {
  const theme = useTheme();
  const buttonRef = useRef<any>(null);

  const setPosition = useCallback(() => {
    if (buttonRef.current?.measure) {
      buttonRef.current.measure((fx, fy, width, height, px, py) => {
        // console.log(fx, fy, width, height, px, py)
        onShowMenu(item.id, item.name, index, {
          x: Math.ceil(px),
          y: Math.ceil(py),
          w: Math.ceil(width),
          h: Math.ceil(height),
        });
      });
    }
  }, [index, item, onShowMenu]);

  const active = activeId == item.id;

  return (
    <div
      ref={buttonRef}
      style={{
        marginLeft: 5,
        marginRight: 5,
        padding:8,
        backgroundColor: active ? theme["c-button-font"] : "transparent",
        borderWidth: 1,
        borderColor: theme["c-050"],
      }}
      key={item.id}
      // onLongPress={setPosition}
      onClick={() => {
        onBoundChange(item);
      }}
    >
      <div style={{ color: active ? "white" : theme["c-font"] }}>
        {item.name}
      </div>
    </div>
  );
};
