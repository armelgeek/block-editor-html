import _ from "lodash";
import { Track, PlayOrder } from "@/types/track";
import { cacheMusic, getCachedMusic } from "./cacheHelper";
import music from '@/utils/api-sdk/modules/music'

let audio: HTMLAudioElement | null = null;
let audioContext: AudioContext;
let mediaSource: MediaElementAudioSourceNode;
let analyser: AnalyserNode;
let trackList: Track[] = [];
let maxHistoryListLength = 10;
let historyList: Track[] = [];
let currentTrack: any;
let mode: PlayOrder = "repeat";
function includesDeep(arr: any[], obj: object) {
  const filtered = arr.filter((value) => _.isEqual(value, obj));
  return filtered.length > 0;
}
function shiftArrayLeft(arr: any[]) {
  if (arr.length > 0) {
    const firstElement = arr.shift();
    arr.push(firstElement);
  }
  return arr;
}
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const createAudio = () => {
  if (audio) return;
  audio = new window.Audio();
  audio.controls = false;
  audio.autoplay = true;
  audio.preload = "auto";
};
export const getTrackList = (list: Track[]) => {
  trackList = list.reduce((prev, curr) => {
    if (prev.length === 0) return [curr];
    else return includesDeep(prev, curr) ? prev : [...prev, curr];
  }, [] as Track[]);

  const first = trackList[0];
  if (first?.src) {
    setResource(first);
    currentTrack = first;
  }
};
export const getAnalyser = (): AnalyserNode | null => {
  if (!audio) throw new Error("audio not defined");

  if (audioContext == null) {
    audioContext = new window.AudioContext();
    mediaSource = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    mediaSource.connect(analyser);
    analyser.connect(audioContext.destination);
  }
  return analyser;
};

export const hasInitedAnalyser = (): boolean => audioContext != null;

export const setResource = async (track: any) => {
    
  const url = await getMusicUrl(track);
 
  if (audio) audio.src = url;
};

export const setPause = () => {
  audio?.pause();
};

export const setStop = () => {
  if (audio) {
    audio.pause(); // Pause la lecture audio
    audio.currentTime = 0; // Remet la position de lecture au début
  }
};

export const setPlay = () => {
  if (!audio?.src) throw new Error("audio not defined");

  void audio?.play();

  if (currentTrack) {
    historyList = historyList.concat(currentTrack);
    if (historyList.length > maxHistoryListLength) {
      historyList = shiftArrayLeft(historyList);
    }
  }

  // Vérifie si la piste actuelle est différente de la piste précédemment en cours de lecture
  if (!audio.paused && audio.currentSrc !== currentTrack?.src) {
    setCurrentTime(0); // Réinitialise la position de lecture au début
  }

  onEnded(() => skip("next"));
};

export const isEmpty = (): boolean => !audio?.src;

export const setLoopPlay = (isLoop: boolean) => {
  if (audio) audio.loop = isLoop;
};

export const getPlaybackRate = (): number => {
  return audio?.defaultPlaybackRate ?? 1;
};

export const setPlaybackRate = (rate: number) => {
  if (!audio) return;
  audio.defaultPlaybackRate = rate;
  audio.playbackRate = rate;
};

export const getMute = (): boolean => {
  return audio?.muted ?? false;
};

export const setMute = (isMute: boolean) => {
  if (audio) audio.muted = isMute;
};

export const getCurrentTime = () => {
  return audio?.currentTime ?? 0;
};
export const getCurrentTrack = () => {
  return currentTrack;
};
export const setCurrentTime = (time: number) => {
  if (audio) audio.currentTime = time;
};

export const setMediaDeviceId = (mediaDeviceId: string) => {
  // @ts-expect-error
  return audio ? audio.setSinkId(mediaDeviceId) : Promise.resolve();
};

export const setVolume = (volume: number) => {
  if (audio) audio.volume = volume;
};

export const getVolume = () => {
  return audio?.volume;
};

export const setMode = (md: any) => {
  mode = md;
};

export const getMode = () => {
  return mode;
};

export const getDuration = () => {
  return audio?.duration ?? 0;
};

export const skip = (order: "prev" | "next") => {
  if (!currentTrack || !trackList.length) return;

  const index = trackList.indexOf(currentTrack);

  skipTo(order, index, trackList.length);
};

export const skipTo = (
  order: "prev" | "next",
  index: number,
  length: number
) => {
  switch (mode) {
    case "loop":
      if (order === "next") {
        currentTrack = trackList[(index + 1) % length];
      } else {
        currentTrack = trackList[(index - 1 + length) % length];
      }
      break;
    case "repeat":
      currentTrack = trackList[index];
      break;
    case "in-order":
      if (order === "next") {
        if (index >= length - 1) {
          stop();
          currentTrack = undefined;
        } else {
          currentTrack = trackList[index + 1];
        }
      } else {
        if (index < 1) {
          stop();
          currentTrack = "";
        } else {
          currentTrack = trackList[index - 1];
        }
      }
      break;
    case "shuffle":
      const shuffledIndex = getRandomShuffledIndex(length, index);
      currentTrack = trackList[shuffledIndex];
      break;
  }
  if (currentTrack) {
    setResource(currentTrack);
    setPlay();
  }
};

const getRandomShuffledIndex = (
  length: number,
  currentIndex: number
): number => {
  let randomIndex = currentIndex;
  while (randomIndex === currentIndex) {
    randomIndex = Math.floor(Math.random() * length);
  }
  return randomIndex;
};

const getNextShuffledIndex = (currentIndex: number, length: number) => {
  const shuffledIndexes = getShuffledIndexes(length);
  const nextIndex = shuffledIndexes.indexOf(currentIndex) + 1;
  return nextIndex >= length ? shuffledIndexes[0] : shuffledIndexes[nextIndex];
};

const getPrevShuffledIndex = (currentIndex: number, length: number) => {
  const shuffledIndexes = getShuffledIndexes(length);
  const prevIndex = shuffledIndexes.indexOf(currentIndex) - 1;
  return prevIndex < 0
    ? shuffledIndexes[length - 1]
    : shuffledIndexes[prevIndex];
};

const getShuffledIndexes = (length: number) => {
  const indexes = Array.from({ length }, (_, index) => index);
  return shuffleArray(indexes);
};

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

type Noop = () => void;

export const onPlaying = (callback: Noop) => {
  if (!audio) throw new Error("audio not defined");

  audio.addEventListener("playing", callback);
  return () => {
    audio?.removeEventListener("playing", callback);
  };
};

export const onPause = (callback: Noop) => {
  if (!audio) throw new Error("audio not defined");

  audio?.addEventListener("pause", callback);
  return () => {
    audio?.removeEventListener("pause", callback);
  };
};

export const onEnded = (callback: Noop) => {
  if (!audio) throw new Error("audio not defined");

  audio.addEventListener("ended", callback);
  return () => {
    audio?.removeEventListener("ended", callback);
  };
};

export const onError = (callback: Noop) => {
  if (!audio) throw new Error("audio not defined");

  audio.addEventListener("error", callback);
  return () => {
    audio?.removeEventListener("error", callback);
  };
};

export const onLoadeddata = (callback: Noop) => {
  if (!audio) throw new Error("audio not defined");

  audio.addEventListener("loadeddata", callback);
  return () => {
    audio?.removeEventListener("loadeddata", callback);
  };
};

export const onLoadstart = (callback: Noop) => {
  if (!audio) throw new Error("audio not defined");

  audio.addEventListener("loadstart", callback);
  return () => {
    audio?.removeEventListener("loadstart", callback);
  };
};

export const onCanplay = (callback: Noop) => {
  if (!audio) throw new Error("audio not defined");

  audio.addEventListener("canplay", callback);
  return () => {
    audio?.removeEventListener("canplay", callback);
  };
};

export const onEmptied = (callback: Noop) => {
  if (!audio) throw new Error("audio not defined");

  audio.addEventListener("emptied", callback);
  return () => {
    audio?.removeEventListener("emptied", callback);
  };
};

export const onTimeupdate = (callback: Noop) => {
  if (!audio) throw new Error("audio not defined");

  audio.addEventListener("timeupdate", callback);
  return () => {
    audio?.removeEventListener("timeupdate", callback);
  };
};

// 缓冲中
export const onWaiting = (callback: Noop) => {
  if (!audio) throw new Error("audio not defined");

  audio.addEventListener("waiting", callback);
  return () => {
    audio?.removeEventListener("waiting", callback);
  };
};

// 可见性改变
export const onVisibilityChange = (callback: Noop) => {
  document.addEventListener("visibilitychange", callback);
  return () => {
    document.removeEventListener("visibilitychange", callback);
  };
};

export const getErrorCode = () => {
  return audio?.error?.code;
};

export const getMusicUrl = async (track: any) => {
    console.log('track',track.uuid);
  const cachedAudio: any = getCachedMusic(track.uuid);
    if(cachedAudio!= null){
        return window.URL.createObjectURL(cachedAudio);
    }
    const audioBlob =  await music.getMusicUrl(track.src);
     cacheMusic(track.uuid, audioBlob);
     return window.URL.createObjectURL(audioBlob);
};
