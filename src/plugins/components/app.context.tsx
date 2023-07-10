import React from "react";
import { Action as PrefAction, State as PrefState, usePref } from "../hooks/usePref";
import { TrimOptios } from "@lrc-maker/lrc-parser";
import { toastPubSub } from "./toast";

const { createContext, useEffect, useMemo } = React;

interface IAppContext {
    prefState: PrefState;
    prefDispatch: React.Dispatch<PrefAction>;
    trimOptions: Required<TrimOptios>;
}

const enum Bits {
    // lrcFormat,
    builtInAudio,
    // screenButton,
    // themeColor,
    prefState,
}

// tslint:disable: no-bitwise
export const enum ChangBits {
    // lrcFormat = 1 << Bits.lrcFormat,
    builtInAudio = 1 << Bits.builtInAudio,
    // screenButton = 1 << Bits.screenButton,
    // themeColor = 1 << Bits.themeColor,
    prefState = 1 << Bits.prefState,
}

export const appContext = createContext<IAppContext>(undefined, (prev, next) => {
    let bits = 0;

    // const changed = (prop: keyof IAppContext["prefState"]) => {
    //     return prev.prefState[prop] !== next.prefState[prop];
    // };

    // if (changed("spaceStart") || changed("spaceEnd") || changed("fixed")) {
    //     bits |= ChangBits.lrcFormat;
    // }

    // if (changed("builtInAudio")) {
    //     bits |= ChangBits.builtInAudio;
    // }
    // if (changed("screenButton")) {
    //     bits |= ChangBits.screenButton;
    // }

    // if (changed("themeColor")) {
    //     bits |= ChangBits.themeColor;
    // }

    if (prev.prefState.builtInAudio !== next.prefState.builtInAudio) {
        bits |= ChangBits.builtInAudio;
    }

    if (prev.prefState !== next.prefState) {
        bits |= ChangBits.prefState;
    }

    return bits;
});
const enum LSK {
    lyric = "lrc-maker-lyric",
    preferences = "lrc-maker-preferences",
    token = "lrc-maker-oauth-token",
    gistId = "lrc-maker-gist-id",
    gistEtag = "lrc-maker-gist-etag",
    gistFile = "lrc-maker-gist-file",
}
const enum Const {
    emptyString = "",
    space = " ",
}
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [prefState, prefDispatch] = usePref(() => localStorage.getItem(LSK.preferences) || Const.emptyString);

  
    const value = useMemo(() => {
        return {
            prefState,
            prefDispatch,
            trimOptions: {
                trimStart: prefState.spaceStart >= 0,
                trimEnd: prefState.spaceEnd >= 0,
            },
        };
    }, [ prefDispatch, prefState]);

    return <appContext.Provider value={value}>{children}</appContext.Provider>;
};
