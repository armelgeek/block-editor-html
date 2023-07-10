import React, {memo, useEffect, useState} from "react";
import Progress from "../../../../../components/player/Progress";
import Status from "./Status";
import { useProgress } from "../../../../../store/player/hook";
import { useTheme } from "../../../../../store/theme/hook";

const FONT_SIZE = 13;

const PlayTimeCurrent = ({ timeStr }: { timeStr: string }) => {
  const theme = useTheme();
  // console.log(timeStr)
  return <div>{timeStr}</div>;
};
const ProgressBarComponent = ({ duration, currentTime, onSeek }:any) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculatedProgress = (currentTime / duration) * 100;
    setProgress(calculatedProgress);
  }, [currentTime, duration]);

  const handleChange = (e:any) => {
    const newProgress = parseInt(e.target.value, 10);
    const newPosition = (newProgress / 100) * duration;
    setProgress(newProgress);
    onSeek(newPosition);
  };

  return (
      <input
          type="range"
          min="0"
          max="100"
          value={String(progress)}
          onChange={handleChange}
          className="progress-bar"
      />
  );
};
const PlayTimeMax = memo(({ timeStr }: { timeStr: string }) => {
  const theme = useTheme();
  return <div>{timeStr}</div>;
});

export default () => {
  const theme = useTheme();
  const [autoUpdate, setAutoUpdate] = useState(true);
  const { nowPlayTime,maxPlayTimeStr, nowPlayTimeStr, progress, maxPlayTime } =
    useProgress(autoUpdate);
  global.lx.trackPlayer.updatePosition();
  return (
    <div style={{
        width:'100%'
    }}>
      <div style={{
        marginLeft:10,
        marginRight:10,
        display:"flex",
        flexDirection: "row",
        alignItems:'center'
      }}>
        <PlayTimeCurrent timeStr={nowPlayTimeStr} />
       <ProgressBarComponent currentTime={nowPlayTime} duration={maxPlayTime} onSeek={(position:number) => {
         global.lx.trackPlayer.seekTo(position);
       }}/>
        <PlayTimeMax timeStr={maxPlayTimeStr} />
      </div>
      <Status autoUpdate={autoUpdate} />
    </div>
  );
};
