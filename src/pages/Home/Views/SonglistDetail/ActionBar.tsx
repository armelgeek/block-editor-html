import React, { memo } from "react";
import { useTheme } from "../../../../store/theme/hook";
import commonState from "../../../../store/common/state";
import { handleCollect, handlePlay } from "./listAction";
import songlistState from "../../../../store/songlist/state";
//import { useI18n } from "../../../../lang";
// import { NAV_SHEAR_NATIVE_IDS } from '../../../../config/constant'

export default memo(() => {
  const theme = useTheme();
  //const t = useI18n();

  const back = () => {
    //void pop(commonState.componentIds.songlistDetail as string);
  };

  const handlePlayAll = () => {
    console.log(songlistState.listDetailInfo);
    if (!songlistState.listDetailInfo.info.name) return;
    void handlePlay(
      songlistState.selectListInfo.id,
      songlistState.selectListInfo.source,
      songlistState.listDetailInfo.list
    );
  };

  const handleCollection = () => {
    console.log(songlistState.listDetailInfo.info.name);
    if (!songlistState.listDetailInfo.info.name) return;
    void handleCollect(
      songlistState.selectListInfo.id,
      songlistState.selectListInfo.source,
      songlistState.listDetailInfo.info.name ||
        songlistState.selectListInfo.name
    );
  };

  return (
    <div>
      <button
        onClick={handleCollection}
        style={{
          borderColor: theme["c-button-font"],
        }}
      >
        
        <p
          style={{ color: theme["c-button-font"] }}
        >
          {"collect_songlist"}
        </p>
      </button>
      <button
        onClick={handlePlayAll}
        style={{
          borderColor: theme["c-button-font"],
        }}
      >
        
        <p
          style={{color: theme["c-button-font"] }}
        >
          {"play_all"}
        </p>
      </button>
      <button
        onClick={back}
        style={{
          borderColor: theme["c-button-font"],
        }}
      >
      
        <p
          style={{ color: theme["c-button-font"] }}
        >
          {"back"}
        </p>
      </button>
    </div>
  );
});
