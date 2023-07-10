import React, { forwardRef, useImperativeHandle, useState } from "react";
import { BorderWidths } from "../../../../theme";
import ButtonBar from "./ActionBar";
import { NAV_SHEAR_NATIVE_IDS } from "../../../../config/constant";
import { scaleSizeW } from "../../../../utils/pixelRatio";
import { useTheme } from "../../../../store/theme/hook";
import { createStyle } from "../../../../utils/tools";
import songlistState from "../../../../store/songlist/state";
const IMAGE_WIDTH = scaleSizeW(120);

const Pic = ({
  playCount,
  imgUrl,
}: {
  playCount: string;
  imgUrl?: string;
}) => {
  

  return (
    <div
      style={{  width: IMAGE_WIDTH, height: IMAGE_WIDTH }}
    >
      {imgUrl && (
        <img
          src={imgUrl}
          style={{ flex: 1,justifyContent: "flex-end" }}
        />
      )}
    </div>
  );
};

export interface HeaderProps {
  componentId: string;
}

export interface HeaderType {
  setInfo: (info: DetailInfo) => void;
}
export interface DetailInfo {
  name: string;
  desc: string;
  playCount: string;
  time?: string | undefined;
  imgUrl?: string;
  total?: string | number | undefined;
}

export default forwardRef<HeaderType, HeaderProps>(
  (props, ref) => {
    const theme = useTheme();
    const [detailInfo, setDetailInfo] = useState<DetailInfo>({
      name: "",
      desc: "",
      playCount: "",
      time: "",
      total: "",
    });

    useImperativeHandle(
      ref,
      () => ({
        setInfo(info) {
          setDetailInfo(info);
        },
      }),
      []
    );
    //console.log("detailInfo", detailInfo);
    return (
      <div
        style={{
          backgroundColor: theme["c-primary-light-100-alpha-900"],
          borderBottomColor: theme["c-border-background"],
        }}
      >
        <div
          style={{
            flexDirection: "row",
            flexGrow: 0,
            flexShrink: 0,
            padding: 10,
            paddingBottom: 5,
          }}
        >
          <Pic
            playCount={detailInfo.playCount}
            imgUrl={detailInfo.imgUrl}
          />
          <div
            style={{
              flexDirection: "column",
              flexGrow: 1,
              flexShrink: 1,
              paddingLeft: 10,
            }}
          >
            <p>
              {detailInfo.name}
            </p>
            <div
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
              }}
            >
             

              <p
                color={theme["c-font-label"]}
                style={{
                  marginLeft: 10,
                }}
              >
                Ajouté {detailInfo.time}
              </p>
            </div>

            <div
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 3,
              }}
            >
            
              <p
                style={{
                  marginLeft: 10,
                }}
               
                color={theme["c-font-label"]}
              >
                {detailInfo.total} chansons
              </p>
            </div>
            <div
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 3,
              }}
            >
             
              <p
                style={{
                  marginLeft: 10,
                }}
                color={theme["c-font-label"]}
              >
                {detailInfo.playCount} fois joué sur le platforme
              </p>
            </div>
            <div
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 3,
              }}
            >
              <p>
                Par
              </p>
              <span>{"Armel Wanes"}</span>
            </div>
          </div>
        </div>
        <ButtonBar />
      </div>
    );
  }
);
