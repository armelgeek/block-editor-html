import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import {
  createAudio,
  getTrackList,
  setResource,
  setPlay,
  setPause,
  setStop,
  isEmpty,
  setLoopPlay,
  getPlaybackRate,
  setPlaybackRate,
  getMute,
  setMute,
  getCurrentTime,
  setCurrentTime,
  setMediaDeviceId,
  setVolume,
  getDuration,
  skip,
  onPlaying,
  onPause,
  onEnded,
  onError,
  onLoadeddata,
  onLoadstart,
  onCanplay,
  onEmptied,
  onTimeupdate,
  onWaiting,
  onVisibilityChange,
  getErrorCode,
  getVolume,
  setMode,
} from "@/plugins/player";
import { PlayOrder, Track } from "@/types/track";
import { getMode } from '../plugins/player';
type AudioPlayerProps = {
  trackList: Track[];
  maxHistoryListLength?: number;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  trackList,
  maxHistoryListLength = 10,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [mode, setMode] = useState<PlayOrder>("in-order");
  useEffect(() => {
    createAudio();
    getTrackList(trackList);
  }, [trackList]);

  const handlePlay = () => {
    setPlay();
  };

  const handlePause = () => {
    setPause();
  };

  const handleStop = () => {
    setStop();
  };

  const handleSkipNext = () => {
    skip("next");
  };

  const handleSkipPrev = () => {
    skip("prev");
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
  };

  const handleVolumeChange = (volume: number) => {
    setVolume(volume);
  };
  const toggleMode = () => {
    setMode((prev) => {
      switch (prev) {
        case "repeat":
          return "loop";
        case "loop":
          return "in-order";
        case "in-order":
          return "shuffle";
        case "shuffle":
          return "repeat";
        default:
          return "repeat";
      }
    });
  };




  // Exemple d'utilisation des événements audio
  useEffect(() => {
    const handleAudioPlaying = () => {
      console.log("Audio is playing");
    };

    const handleAudioPause = () => {
      console.log("Audio is paused");
    };

    const handleAudioEnded = () => {
      console.log("Audio playback ended");
    };

    onPlaying(handleAudioPlaying);
    onPause(handleAudioPause);
    onEnded(handleAudioEnded);

    return () => {
      onPause(handleAudioPause);
      onEnded(handleAudioEnded);
      // N'oubliez pas de supprimer les écouteurs d'événements lors du démontage du composant
    };
  }, []);
  return (
    <div>
     <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleSkipPrev}>Previous</button>
      <button onClick={handleSkipNext}>Next</button>
      <button onClick={toggleMode}>Changer de mode ({mode})</button>
      <input
        type="range"
        min={0.5}
        max={2}
        step={0.1}
        value={getPlaybackRate()}
        onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
      />

      <input
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={getVolume()}
        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default AudioPlayer;
