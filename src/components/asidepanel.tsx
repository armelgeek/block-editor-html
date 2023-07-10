import { State as PrefState } from "../hooks/usePref";
import { stringify } from "../utils/lyric";
import { lrcFileName } from "../utils/lrc-file-name";
import { DownloadSVG, LockSVG } from "./svg";
import { SyncMode } from "./synchronizer";
import React from 'react';
import { Action, ActionType } from "../pages/songs/SongForm";
const { useState, useCallback } = React;
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
  const enum Path {
    home = "#/",
    homeID = "/",
    editor = "#/editor/",
    editorID = "/editor/",
    synchronizer = "#/synchronizer/",
    synchronizerID = "/synchronizer/",
    gist = "#/gist/",
    gistID = "/gist/",
    preferences = "#/preferences/",
    preferencesID = "/preferences/",
  }
  const enum SSK {
    audioSrc = "audio-src",
    editorDetailsOpen = "editor-details-open",
    syncMode = "sync-mode",
    selectIndex = "select-index",
    ratelimit = "x-ratelimit",
  }
export const AsidePanel: React.FC<{
    syncMode: SyncMode;
    setSyncMode: React.Dispatch<React.SetStateAction<SyncMode>>;
    lrcDispatch: React.Dispatch<Action>;
    prefState: PrefState;
}> = React.memo(({ syncMode, setSyncMode, lrcDispatch, prefState }) => {
    const [href, setHref] = useState<string>();
    const [name, setName] = useState<string>();

    const onSyncModeToggle = useCallback(() => {
        setSyncMode((syncMode) => (syncMode === SyncMode.select ? SyncMode.highlight : SyncMode.select));
    }, [setSyncMode]);

    const onDownloadClick = useCallback(() => {
        lrcDispatch({
            type: ActionType.getState,
            payload: (state) => {
                const text = stringify(state, prefState);
                setHref((url) => {
                    if (url) {
                        URL.revokeObjectURL(url);
                    }

                    return URL.createObjectURL(
                        new Blob([text], {
                            type: "text/plain;charset=UTF-8",
                        }),
                    );
                });

                setName(lrcFileName(state.info));
            },
        });
    }, [lrcDispatch, prefState]);

    const mode = syncMode === SyncMode.select ? "select" : "highlight";

    const className = ["aside-button", "syncmode-button", "ripple", "glow ", mode].join(Const.space);

    return (
        <aside className="aside-panel">
            <button className={className} onClick={onSyncModeToggle} aria-label={`${mode} mode`}>
                <LockSVG />
            </button>
            <a href={href} download={name} className="aside-button ripple glow" onClick={onDownloadClick}>
                <DownloadSVG />
            </a>
        </aside>
    );
});

AsidePanel.displayName = AsidePanel.name;
