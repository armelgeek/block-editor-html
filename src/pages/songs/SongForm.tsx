import React, { useReducer, useState, useEffect, useContext } from "react";
import { parser, State as LrcState, TrimOptios } from "@lrc-maker/lrc-parser";
import {stringify} from '../../utils/lyric';
import { ActionType as LrcActionType } from "./SongForm";
import axios from "axios";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import {
  ArtistsStep,
  BasicInfoStep,
  ReviewStep,
  LyricStep,
  YoutubeSearchStep,
  SyncStep,
  Steps,
  Step,
} from "./components";
import { guard, mergeObject } from "../../utils/lyric";
import { appContext } from "../../components/app.context";

type InitArgs = Readonly<{
  text: string;
  options: TrimOptios;
  select: number;
}>;

export const enum ActionType {
  parse,
  refresh,
  next,
  time,
  info,
  select,
  deleteTime,
  getState,
}

export interface IState extends LrcState {
  readonly currentTime: number;
  readonly currentIndex: number;
  readonly nextTime: number;
  readonly nextIndex: number;
  readonly selectIndex: number;
}

type Map$Type$Payload<T, U> = {
  [key in keyof T]: U extends key ? { type: key; payload: T[key] } : never;
}[keyof T];

export type Action = Map$Type$Payload<
  {
    [ActionType.parse]: { text: string; options: TrimOptios };
    [ActionType.refresh]: number;
    [ActionType.next]: number;
    [ActionType.time]: number;
    [ActionType.info]: { name: string; value: string };
    [ActionType.select]: (index: number) => number;
    [ActionType.deleteTime]: undefined;
    [ActionType.getState]: (state: IState) => void;
  },
  ActionType
>;

const initialState = {
  title: "",
  duration: "",
  songmid: "",
  img: "",
  youtube: {},
  lyrics: "",
  lyric: [],
  artist_names: [],
  selectedArtists: [],
  tag_names: [],
  status: "",
  error: null,
  loading: false,
  step: 1,
  currentTime: Infinity,
  currentIndex: Infinity,
  nextTime: -Infinity,
  nextIndex: -Infinity,
  selectIndex: 0,
  info: {},
};

const reducer = (state: any, action: any):any=> {
  switch (action.type) {
    case ActionType.parse: {
      const { text, options } = action.payload;
      const lrc = parser(text, options);
      const selectIndex = guard(state.selectIndex, 0, lrc.lyric.length - 1);
      return { ...state, ...lrc, selectIndex };
    }
    case ActionType.refresh:
      const audioTime = action.payload;
      if (audioTime >= state.currentTime && audioTime < state.nextTime) {
        return state;
      }

      const record = state.lyric.reduce(
        (p: any, c: any, i: any) => {
          if (c.time) {
            if (c.time < p.nextTime && c.time > audioTime) {
              p.nextTime = c.time;
              p.nextIndex = i;
            }
            if (c.time > p.currentTime && c.time <= audioTime) {
              p.currentTime = c.time;
              p.currentIndex = i;
            }
          }
          return p;
        },
        {
          currentTime: -Infinity,
          currentIndex: -Infinity,
          nextTime: Infinity,
          nextIndex: Infinity,
        }
      );

      return mergeObject(state, record);
    case "sync": {
      const time = action.payload;
      const index = state.selectIndex;

      let lyric = state.lyric;
      if (lyric[index].time !== time) {
        const newLyric = lyric.slice();
        newLyric[index] = { text: lyric[index].text, time };
        lyric = newLyric;
      }
      const selectIndex = guard(index + 1, 0, lyric.length - 1);
      return {
        ...state,
        lyric,
        selectIndex,
        currentIndex: index,
        currentTime: time,
        nextTime: -Infinity,
      };
    }
    case ActionType.next: {
      const index = state.selectIndex;

      const lyric = state.lyric;

      const selectIndex = guard(index + 1, 0, lyric.length - 1);

      return {
        ...reducer(state, {
          type: ActionType.time,
          payload: action.payload,
        }),
        selectIndex,
      };
    }

    case ActionType.time: {
      const time = action.payload;
      const index = state.selectIndex;

      let lyric = state.lyric;
      if (lyric[index].time !== time) {
        const newLyric = lyric.slice();
        newLyric[index] = { text: lyric[index].text, time };
        lyric = newLyric;
      }

      return { ...state, lyric, currentTime: time, nextTime: -Infinity };
    }

    case ActionType.info: {
      const { name, value } = action.payload;

      const info = new Map(state.info);
      if (value.trim() === "") {
        info.delete(name);
      } else {
        info.set(name, value.trim());
      }

      return {
        ...state,
        info,
      };
    }

    case ActionType.select: {
      const selectIndex = guard(
        action.payload(state.selectIndex),
        0,
        state.lyric.length - 1
      );
      return state.selectIndex === selectIndex
        ? state
        : { ...state, selectIndex };
    }

    case ActionType.deleteTime: {
      const { selectIndex, currentIndex } = state;

      let lyric = state.lyric;
      if (lyric[selectIndex].time !== undefined) {
        const newLyric = lyric.slice();
        newLyric[selectIndex] = { text: lyric[selectIndex].text };
        lyric = newLyric;

        let { currentTime, nextTime } = state;
        if (selectIndex === currentIndex) {
          currentTime = Infinity;
          nextTime = -Infinity;
        }

        return {
          ...state,
          lyric,
          currentTime,
          nextTime,
        };
      }

      return state;
    }

    case ActionType.getState: {
      action.payload(state);
      return state;
    }
    case "update": {
      return { ...state, ...action.payload };
    }
    case "addArtistName":
      return {
        ...state,
        artist_names: [...state.artist_names, action.payload],
      };
    case "removeArtistName":
      return {
        ...state,
        artist_names: state.artist_names.filter(
          (name:any) => name !== action.payload
        ),
      };

    case "nextStep":
      return { ...state, step: state.step + 1 };
    case "prevStep":
      return { ...state, step: Math.max(state.step - 1, 0) };
    case "error":
      return { ...state, error: action.payload };
    case "setSong":
      return { ...action.payload, loading: false };
    case "reset":
      return { ...initialState };
    case "loading":
      return { ...state, loading: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function SongForm({ songId }:any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { prefState, trimOptions } = useContext(appContext);
  const [step, setStep] = useState(1);
  const isStep1Complete = state.title;
  const isStep2Complete = state.songmid;
  const isStep3Complete = state.artist_names && state.artist_names.length > 0;
 // const isStep4Complete = state.lyrics && state.lyrics.length > 0;
 const isStep4Complete = true;
  const history = useHistory();
  useEffect(() => {
    
    if (songId) {
      dispatch({ type: "loading", payload: true });
      axios
        .get(`http://localhost:8100/songs/${songId}`)
        .then((response) => {
         
          dispatch({
            type: "setSong",
            payload: {
              ...response.data,
              ...parser(response.data.lyrics, {
                trimStart: true,
                trimEnd: false,
              }),
              youtube: response.data.youtube
                ? JSON.parse(response.data.youtube)
                : {},
              currentTime: Infinity,
              currentIndex: Infinity,
              nextTime: -Infinity,
              nextIndex: -Infinity,
              selectIndex: 0,
            },
          });
        })
        .catch((error) => {
          dispatch({ type: "error", payload: error });
        });
    }
  }, [songId]);
  function handleNextStep() {
    if (step === 1 && !isStep1Complete) {
      alert("Please fill in all required fields.");
      return;
    }
    if (step === 2 && !isStep2Complete) {
      alert("Please fill in all required fields.");
      return;
    }
    if (step === 3 && !isStep3Complete) {
      alert("Please fill in all required fields.");
      return;
    }
    if (step === 4 && !isStep4Complete) {
      alert("Please fill in all required fields.");
      return;
    }

    setStep(step + 1);
  }

  function handlePrevStep() {
    setStep(step - 1);
  }

  function handleSubmit(event:any) {
    event.preventDefault();
    if (!isStep4Complete) {
      alert("Please fill in all required fields.");
      return;
    }
    const text = stringify(state, prefState);
    dispatch({ type: "loading", payload: true });
    // determine if this is a creation or an update
    const httpMethod = songId ? "put" : "post";
    const url = songId
      ? `http://localhost:8100/songs/${songId}`
      : "http://localhost:8100/songs";
    axios
      .request({
        method: httpMethod,
        url: url,
        data: {
          title: state.title,
          img: state.img,
          songmid: state.songmid,
          duration: state.duration,
          lyrics: text,
          artist_names: state.artist_names,
          tag_names: state.tag_names,
          youtube: JSON.stringify(state.youtube),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        dispatch({ type: "loading", payload: false });
        history.push("/songs/list");
      })
      .catch((error) => {
        dispatch({ type: "loading", payload: false });
        dispatch({ type: "error", payload: error });
      });
  }

  return (
    <div>
      <Link to={"/songs/list"}>Revenir en arriere</Link>
      <Steps current={step - 1}>
        <Step
          title="Basic Information"
          description="Enter the title, album, duration, genre, release year, and user ID."
        />
        <Step title="Audio" description="Search Music from web." />
        <Step title="Artists" description="Enter the artist names." />
        <Step title="Lyrics" description="Enter the lyrics." />
        <Step title="Sync." description="Synchronisation" />
      </Steps>
      {step === 1 && (
        <BasicInfoStep
          state={state}
          dispatch={dispatch}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          isComplete={isStep1Complete}
        />
      )}

      {step === 2 && (
        <YoutubeSearchStep
          state={state}
          dispatch={dispatch}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          isComplete={isStep2Complete}
        />
      )}

      {step === 3 && (
        <ArtistsStep
          state={state}
          dispatch={dispatch}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          isComplete={true}
        />
      )}

      {step === 4 && (
        <LyricStep
          state={state}
          dispatch={dispatch}
          isEdit={!!songId}
          onPrevStep={handlePrevStep}
          onNextStep={handleNextStep}
          isComplete={isStep4Complete}
        />
      )}
      {step === 5 && (
        <SyncStep
          state={state}
          dispatch={dispatch}
          onPrevStep={handlePrevStep}
          handleSubmit={handleSubmit}
        />
      )}
      
      {songId && (
        <button
          style={{
            marginTop: 10,
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </div>
  );
}
export default SongForm;
