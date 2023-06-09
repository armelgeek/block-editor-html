import React from 'react'
export const themeColor = {
    orange: "#ff691f",
    yellow: "#fab81e",
    lime: "#7fdbb6",
    green: "#19cf86",
    blue: "#91d2fa",
    navy: "#1b95e0",
    grey: "#abb8c2",
    red: "#e81c4f",
    pink: "#f58ea8",
    purple: "#c877fe",
};

export const enum ThemeMode {
    auto,
    light,
    dark,
}

const initState = {
    lang: "en-US",
    spaceStart: 1,
    spaceEnd: 0,
    fixed: 3 as Fixed,
    builtInAudio: false,
    screenButton: false,
    themeColor: themeColor.pink,
    themeMode: ThemeMode.auto,
};

export type State = Readonly<typeof initState>;

export type Action = {
    [key in keyof State]: { type: key; payload: State[key] | ((state: State) => State[key]) };
}[keyof State];

const reducer = (state: State, action: Action): State => {
    const payload = action.payload;
    return {
        ...state,
        [action.type]: typeof payload === "function" ? payload(state) : payload,
    };
};

const init = (lazyInit: () => string): State => {
    const state: Mutable<State> = initState;
    try {
        const storedState: State = JSON.parse(lazyInit());
        const validKeys = Object.keys(initState) as Array<keyof State>;
        for (const key of validKeys) {
            if (key in storedState) {
                (state[key] as unknown) = storedState[key];
            }
        }
    } catch (error) {
        //
    }
    return state;
};

export const usePref = (lazyInit: () => string): [State, React.Dispatch<Action>] =>
    React.useReducer(reducer, lazyInit, init);
