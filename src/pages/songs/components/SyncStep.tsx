import React, { useReducer, useState, useCallback, useRef, useEffect, useContext } from 'react';
import { ActionType as LrcActionType } from "../SongForm";
import { ChangBits, appContext } from '../../../components/app.context';
import { AudioActionType, audioStatePubSub } from '../../../utils/audiomodule';
import { convertTimeToTag, stringify } from '@lrc-maker/lrc-parser';
import { Synchronizer } from '../../../components/synchronizer';
import { Footer } from '../../../components/footer';


export const enum Const {
  emptyString = "",
  space = " ",
}
const enum LSK {
  lyric = "lrc-maker-lyric",
  preferences = "lrc-maker-preferences",
  token = "lrc-maker-oauth-token",
  gistId = "lrc-maker-gist-id",
  gistEtag = "lrc-maker-gist-etag",
  gistFile = "lrc-maker-gist-file",
}
const enum SSK {
  audioSrc = "audio-src",
  editorDetailsOpen = "editor-details-open",
  syncMode = "sync-mode",
  selectIndex = "select-index",
  ratelimit = "x-ratelimit",
}
function SyncStep({ state, dispatch, onNextStep, onPrevStep, handleSubmit }:any) {
  const self = useRef(Symbol('sync_step'));

  const { prefState, trimOptions } = useContext(
    appContext,
    ChangBits.prefState
  );

  const [path, setPath] = useState(window.location.hash);
  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setPath(window.location.hash);
    });
  }, []);

  useEffect(() => {
    return audioStatePubSub.sub(self.current, (data) => {
      if (data.type === AudioActionType.getDuration) {
        dispatch({
          type: LrcActionType.info,
          payload: {
            name: "length",
            value: convertTimeToTag(data.payload, prefState.fixed, false),
          },
        });
      }
    });
  }, [dispatch, prefState.fixed]);

  useEffect(() => {
    const saveState = (): void => {
      dispatch({
        type: LrcActionType.getState,
        payload: (lrc:any) => {
          //localStorage.setItem(LSK.lyric, stringify(lrc, prefState));
          //sessionStorage.setItem(SSK.selectIndex, lrc.selectIndex.toString());
        },
      });

      //localStorage.setItem(LSK.preferences, JSON.stringify(prefState));
    };

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        saveState();
      }
    });

    window.addEventListener("beforeunload", () => {
      saveState();
    });
  }, [dispatch, prefState]);

  return (
    <div>
      <div>
        <button type="button" onClick={onPrevStep}>
          Previous
        </button>
        <button type="button" onClick={handleSubmit}>
          Publier
        </button>
      </div>
      <Synchronizer state={state} dispatch={dispatch}/>
      <Footer/>
    </div>
  );
}

export default SyncStep;
