import React, { memo, useRef } from "react";
import { useTheme } from "../../../../../store/theme/hook";
import { useAssertApiSupport } from "../../../../../store/common/hook";

export default memo(
  ({
    item,
    index,
    activeIndex,
    onPress,
    onShowMenu,
    onLongPress,
    selectedList,
  }: {
    item: LX.Music.MusicInfo;
    index: number;
    activeIndex: number;
    onPress: (item: LX.Music.MusicInfo, index: number) => void;
    onLongPress: (item: LX.Music.MusicInfo, index: number) => void;
    onShowMenu: (
      item: LX.Music.MusicInfo,
      index: number,
      position: { x: number; y: number; w: number; h: number }
    ) => void;
    selectedList: LX.Music.MusicInfo[];
  }) => {
    const theme = useTheme();

    const isSelected = selectedList.includes(item);
    // console.log(item.name, selectedList, selectedList.includes(item))
    const isSupported = useAssertApiSupport(item.source);
    const moreButtonRef = useRef<any>(null);
    const handleShowMenu = () => {};
    const active = activeIndex == index;
    const lx = item.meta.songId;
    return (
      <div
        style={{
          backgroundColor: isSelected
            ? theme["c-primary-background-hover"]
            : "rgba(0,0,0,0)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems:'center',
            border:'1px solid #000'
          }}
          onClick={() => {
            onPress(item, index);
          }}
        >
          <div style={{
              marginRight:15
          }}>{active ? "play-outline" : <p>{index + 1}</p>}</div>

            <div
              style={{
                color: active ? theme["c-primary-font"] : theme["c-font"], marginRight:5
              }}
            >
              {item.name}
            </div>
            {/* </View> */}
            <div style={{
                marginRight:15
            }}>
              <p
                style={{
                  color: active ? theme["c-primary-alpha-200"] : theme["c-500"],
                }}
              >
                {item.singer}
              </p>
              {/** <Badge>{item.source}</Badge> */}
            </div>
            <div style={{
                marginRight:15
            }}>
              <p
                style={{
                  color: active ? theme["c-primary-alpha-200"] : theme["c-500"],
                }}
              >
                {""} {item.interval}
                {"  "}
              </p>
            </div>
            <div style={{
                marginRight:15
            }}>
              <p
                style={{
                  color: active ? theme["c-primary-alpha-200"] : theme["c-500"],
                }}
              >
                Ajouté par <span>{item.username}</span>
              </p>
            </div>
            <div onClick={handleShowMenu} ref={moreButtonRef}>
                ...
            </div>
          </div>

      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.item === nextProps.item &&
      prevProps.index === nextProps.index &&
      prevProps.activeIndex != nextProps.index &&
      nextProps.activeIndex != nextProps.index &&
      nextProps.selectedList.includes(nextProps.item) ==
        prevProps.selectedList.includes(nextProps.item)
    );
  }
);
