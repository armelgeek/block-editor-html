import React, { memo, useRef } from "react";
// import Button from '../../components/common/Button'
//import { useI18n } from "../../lang";
import { useTheme } from "../../store/theme/hook";
import { scaleSizeH } from "../../utils/pixelRatio";
import { LIST_ITEM_HEIGHT } from "../../config/constant";
import leftBar from "../../pages/Home/Views/Leaderboard/LeftBar";

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
        key={index}
        style={{
          display:"flex",
          flexDirection:'row',
          justifyContent:'space-between',
          border: '1px solid #000',
          paddingLeft: 5,
          paddingRight: 5,
          marginBottom:10,
          alignItems:'center',
          backgroundColor: isSelected
            ? theme["c-primary-background-hover"]
            : "rgba(0,0,0,0)",
        }}
      >
        <div
            style={{
              display:'flex',
              flexDirection:'row',
              width:"100%",
              alignItems:'center',
            }}
          onClick={() => {
            onPress(item, index);
          }}
        >
          {/**<Text style={styles.sn} size={13} color={theme["c-300"]}>
            {index + 1}
        </Text>**/}
            <div style={{
              marginRight:10
            }}>
              <p>{index + 1}</p>
            </div>
            <div style={{
              marginRight:10
            }}>
             {lx && (
                <img
                  src={`https://i.ytimg.com/vi/${lx}/default.jpg`}
                  style={{
                    width: 60,
                    height: 40,
                  }}
                />
                )}
            </div>
            <div style={{
              marginRight:10
            }}>
              <p>{item.name}</p>
            </div>
            <div style={{
              marginRight:10
            }}>
                <p>
                  {item.singer}
                </p>
            </div>
            <div style={{
              marginRight:10
            }}>
              <p>
                {item.popularite}
              </p>
            </div>
          <div style={{
            marginRight:10
          }}>
            <p>
              {item.interval}
            </p>
          </div>
          <div style={{
            marginRight:10
          }}>
            <p>
              {item.createdat}
            </p>
          </div>
          <div style={{
            marginRight:10
          }}>
            <p>
              Ajouté par <span>{item.username}</span>
            </p>
          </div>
        </div>
        <button onClick={handleShowMenu} ref={moreButtonRef}>
          ...
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
        prevProps.item === nextProps.item &&
        prevProps.index === nextProps.index &&
        nextProps.selectedList.includes(nextProps.item) ==
        prevProps.selectedList.includes(nextProps.item)
    );
  }
);
