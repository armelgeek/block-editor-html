import { Action as LrcAction, ActionType as LrcActionType } from "../pages/songs/SongForm";
import { State as LrcState, stringify } from "../utils/lyric";
import { createFile } from "../utils/gistapi";
import { lrcFileName } from "../utils/lrc-file-name";
import { appContext } from "./app.context";
import { CopySVG, DownloadSVG, OpenFileSVG } from "./svg";
import React from "react";
const { useCallback, useContext, useEffect, useMemo, useRef, useState } = React;
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
const disableCheck = {
    autoCapitalize: "none",
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: false,
};

type HTMLInputLikeElement = HTMLInputElement & HTMLTextAreaElement;

type UseDefaultValue<T = React.RefObject<HTMLInputLikeElement>> = (
    defaultValue: string,
    ref?: T,
) => { defaultValue: string; ref: T };

const useDefaultValue: UseDefaultValue = (defaultValue, ref) => {
    const or = <T, K>(a: T, b: K): NonNullable<T> | K => a ?? b;

    const $ref = or(ref, useRef<HTMLInputLikeElement>(null));

    useEffect(() => {
        if ($ref.current) {
            $ref.current.value = defaultValue;
        }
    }, [defaultValue, $ref]);
    return { ref: $ref, defaultValue };
};

export const Editor: React.FC<{
    lrcState:any;
    lrcDispatch: React.Dispatch<LrcAction>;
}> = ({ lrcState, lrcDispatch }) => {
    const { prefState, trimOptions } = useContext(appContext);

    const parse = useCallback(
        (ev: React.FocusEvent<HTMLTextAreaElement>) => {
            lrcDispatch({
                type: LrcActionType.parse,
                payload: { text: ev.target.value, options: trimOptions },
            });
        },
        [lrcDispatch, trimOptions],
    );

    const text = stringify(lrcState, prefState);
    const textarea = useRef<HTMLInputLikeElement>(null);
    const [href, setHref] = useState<string | undefined>(undefined);

    const onDownloadClick = useCallback(() => {
        setHref((url) => {
            if (url) {
                URL.revokeObjectURL(url);
            }

            return URL.createObjectURL(
                new Blob([textarea.current!.value], {
                    type: "text/plain;charset=UTF-8",
                }),
            );
        });
    }, []);

    const onTextFileUpload = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            if (ev.target.files === null || ev.target.files.length === 0) {
                return;
            }

            const fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
                lrcDispatch({
                    type: LrcActionType.parse,
                    payload: { text: fileReader.result as string, options: trimOptions },
                });
            });
            fileReader.readAsText(ev.target.files[0], "UTF-8");
        },
        [lrcDispatch, trimOptions],
    );

    const onCopyClick = useCallback(() => {
        textarea.current?.select();
        document.execCommand("copy");
    }, []);

   // const downloadName = useMemo(() => lrcFileName(lrcState.title), [lrcState]);
    const downloadName = "lyric.lrc";
    return (
        <div className="app-editor">
            <section className="editor-tools">
                <label className="editor-tools-item ripple" title={'upload'}>
                    <input hidden={true} type="file" accept="text/*, .txt, .lrc" onChange={onTextFileUpload} />
                    <OpenFileSVG />
                </label>
                <button className="editor-tools-item ripple" title={'copy'} onClick={onCopyClick}>
                    <CopySVG />
                </button>
                <a
                    className="editor-tools-item ripple"
                    title={'download'}
                    href={href}
                    onClick={onDownloadClick}
                    download={downloadName}
                >
                    <DownloadSVG />
                </a>
            </section>

            <textarea
                className="app-textarea"
                aria-label="lrc input here"
                rows={20}
                onBlur={parse}
                {...disableCheck}
                {...useDefaultValue(text, textarea)}
            />
        </div>
    );
};
