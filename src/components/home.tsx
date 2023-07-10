import { isKeyboardElement } from "../utils/is-keyboard-element";
import { appContext } from "./app.context";
import { loadAudioDialogRef } from "./loadaudio";
import { EditorSVG, LoadAudioSVG, SynchronizerSVG } from "./svg";
import React from 'react';
const { useContext } = React;

export const Home: React.FC = () => {

    const onLoadAudioDialogOpen = (): void => {
        loadAudioDialogRef.open();
    };

    return (
        <div className="home">
           ts fangalana
        </div>
    );
};

document.addEventListener("keydown", (ev) => {
    const { code, key, target } = ev;

    if (isKeyboardElement(target)) {
        return;
    }

    if (key === "?" || (code === "Slash" && ev.shiftKey)) {
        //location.hash = Path.home;
    }
});
