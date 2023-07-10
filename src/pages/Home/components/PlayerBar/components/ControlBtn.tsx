import React from "react";
import { useIsPlay } from "../../../../../store/player/hook";
import { useTheme } from "../../../../../store/theme/hook";
import { playNext, togglePlay } from "../../../../../core/player/player";
import { createStyle } from "../../../../../utils/tools";

const BTN_SIZE = 24;
const handlePlayNext = () => {
  void playNext();
};

const PlayNextBtn = () => {
  const theme = useTheme();

  return (
    <button
      onClick={handlePlayNext}
    >
      Next
    </button>
  );
};

const TogglePlayBtn = () => {
  const isPlay = useIsPlay();
  const theme = useTheme();

  return (
    <button
        style={{
          marginRight:15
        }}
      onClick={togglePlay}
    >
      {isPlay ? "pause" : "play"}
    </button>
  );
};

export default () => {
  return (
    <div style={{
      display:'flex',
      flexDirection:'row'
    }}>
      {/* <TouchableOpacity activeOpacity={0.5} onPress={toggleNextPlayMode}>
        <Text style={{ ...styles.cotrolBtn }}>
          <Icon name={playModeIcon} style={{ color: theme.secondary10 }} size={18} />
        </Text>
      </TouchableOpacity>
    */}
      {/* {btnPrev}  */}
      <TogglePlayBtn />
      <PlayNextBtn />
    </div>
  );
};
