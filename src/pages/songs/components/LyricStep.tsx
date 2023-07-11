import React,{ useContext, useRef, useEffect} from 'react';
import TagsStep from './TagsStep';
import { ActionType as LrcActionType } from "../SongForm";
import { ChangBits, appContext } from '../../../components/app.context';
import { AudioActionType, audioStatePubSub } from '../../../utils/audiomodule';
import { convertTimeToTag } from '@lrc-maker/lrc-parser';
import { Editor } from '../../../components/editor';
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
function LyricStep({ state, dispatch, onNextStep,isEdit, onPrevStep, isComplete }:any) {
  const self = useRef(Symbol('LyricStep.name'));

  const { prefState, trimOptions } = useContext(
    appContext
  );


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
         // sessionStorage.setItem(SSK.selectIndex, lrc.selectIndex.toString());
        },
      });

     // localStorage.setItem(LSK.preferences, JSON.stringify(prefState));
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
  useEffect(() => {
    document.documentElement.addEventListener("drop", (ev) => {
      const file = ev.dataTransfer?.files[0];
      if (
        file &&
        (file.type.startsWith("text/") || /(?:\.lrc|\.txt)$/i.test(file.name))
      ) {
        const fileReader = new FileReader();

        const onload = (): void => {
          dispatch({
            type: LrcActionType.parse,
            payload: {
              text: fileReader.result as string,
              options: trimOptions,
            },
          });
        };

        fileReader.addEventListener("load", onload, {
          once: true,
        });

        //window.location.hash = Path.editor;

        fileReader.readAsText(file, "utf-8");
      }
    });
  }, [dispatch, trimOptions]);


  return (
    <div>
      <h2>Lyrics</h2>

      <form onSubmit={(event) => event.preventDefault()}>

        <div>
          <label htmlFor="title">Tags:</label>
          <TagsStep state={state} dispatch={dispatch}/>
        </div>

        <div>
          <label htmlFor="play_count">Lyrics:</label>


          <Editor lrcState={state} lrcDispatch={dispatch} />
          
        
        </div>
        <div>
          <button type="button" onClick={onPrevStep}>
            Previous
          </button>
          <button type="button" onClick={onNextStep} disabled={!isComplete}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
export default LyricStep;
