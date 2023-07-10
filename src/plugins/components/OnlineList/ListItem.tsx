import React, { memo, useRef } from "react";
// import Button from '../../../../components/common/Button'
//import { useI18n } from "../../../../lang";
import { useTheme } from "../../../../store/theme/hook";
import { scaleSizeH } from "../../../../utils/pixelRatio";
import { LIST_ITEM_HEIGHT } from "../../../../config/constant";

export const ITEM_HEIGHT = scaleSizeH(LIST_ITEM_HEIGHT);

const useQualityTag = (musicInfo: LX.Music.MusicInfoOnline) => {
  //const t = useI18n();
  let info: { type: any | null; text: string } = { type: null, text: "" };
  if (musicInfo.meta._qualitys.flac24bit) {
    info.type = "secondary";
    info.text = "quality_lossless_24bit";
  } else if (musicInfo.meta._qualitys.flac ?? musicInfo.meta._qualitys.ape) {
    info.type = "secondary";
    info.text = "quality_lossless";
  } else if (musicInfo.meta._qualitys["320k"]) {
    info.type = "tertiary";
    info.text = "quality_high_quality";
  }

  return info;
};

export default memo(
  ({
    item,
    index,
    showSource,
    onPress,
    onLongPress,
    onShowMenu,
    selectedList,
  }: {
    item: LX.Music.MusicInfoOnline;
    index: number;
    showSource?: boolean;
    onPress: (item: LX.Music.MusicInfoOnline, index: number) => void;
    onLongPress: (item: LX.Music.MusicInfoOnline, index: number) => void;
    onShowMenu: (
      item: LX.Music.MusicInfoOnline,
      index: number,
      position: { x: number; y: number; w: number; h: number }
    ) => void;
    selectedList: LX.Music.MusicInfoOnline[];
  }) => {
    const theme = useTheme();

    const isSelected = selectedList.includes(item);

    const moreButtonRef = useRef<any>(null);
    const handleShowMenu = () => {
      if (moreButtonRef.current?.measure) {
        moreButtonRef.current.measure((fx, fy, width, height, px, py) => {
          // console.log(fx, fy, width, height, px, py)
          onShowMenu(item, index, {
            x: Math.ceil(px),
            y: Math.ceil(py),
            w: Math.ceil(width),
            h: Math.ceil(height),
          });
        });
      }
    };
    const tagInfo = useQualityTag(item);
    //console.log(item);
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
          onClick={() => {
            onPress(item, index);
          }}
          /**onLongPress={() => {
            onLongPress(item, index);
          }}**/
        >
          {/**<Text style={styles.sn} size={13} color={theme["c-300"]}>
            {index + 1}
        </Text>**/}
          <div>
            <div
              style={{
              
              }}
            >
              <p>{index + 1}</p>
            </div>
            <div>
              {/**{lx && (
                <img
                  src={
                    lx
                      ? `https://i.ytimg.com/vi/${lx}/default.jpg`
                      : require("../../../../resources/images/pic.jpg")
                  }
                  style={{
                    width: 120,
                    height: 90,
                  }}
                />
                )}**/}
            </div>
            <div>
              <p>{item.name}</p>
              <div>
                <p style={{ marginTop: 2, color: theme["c-500"] }}>
                  {item.singer}
                </p>
              </div>

              <div>
                <p
                  style={{
                    color: theme["c-500"],
                  }}
                >
                  {item.popularite}
                  {item.interval}
                  {item.createdat}
                </p>
              </div>
              <div>
                <p>
                  Ajouté par <span>{item.username}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleShowMenu} ref={moreButtonRef}>
          ...
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return !!(
      prevProps.item === nextProps.item &&
      prevProps.index === nextProps.index &&
      nextProps.selectedList.includes(nextProps.item) ==
        prevProps.selectedList.includes(nextProps.item)
    );
  }
);
