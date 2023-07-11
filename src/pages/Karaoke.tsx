import React, { useState,useRef, useEffect } from 'react';
import {RubyKaraokeContainer} from "../utils/karaoke/RubyLyrics";
import {KaraokeContainer} from "../utils/karaoke/lyrics";
const lyricstext =`
[00:00.00]
[00:09.66]た[00:09.85]だ[00:10.42]か[00:10.59]ぜ[00:11.15]に[00:11.35]ゆ[00:11.58]ら[00:11.78]れ[00:11.98]て[00:12.42]
[00:12.70]な[00:12.88]に[00:13.05]も[00:13.27]か[00:13.47]ん[00:13.84]が[00:14.22]え[00:14.54]ず[00:14.78]に[00:15.35]
[00:15.77]た[00:15.94]だ[00:16.50]く[00:16.69]も[00:17.10]を[00:17.45]な[00:17.65]が[00:17.82]め[00:18.02]て[00:18.59]
[00:18.72]す[00:18.97]ご[00:19.28]す[00:19.55]の[00:19.86]も[00:20.27]い[00:20.67]い[00:21.05]よ[00:21.24]ね[00:21.64]
[00:21.82]
[00:21.92]さ[00:22.33]ざ[00:22.76]な[00:23.09]み[00:23.34]の[00:24.85]お[00:25.06]と[00:25.40]に[00:25.79]い[00:26.17]や[00:26.31]さ[00:26.76]れ[00:26.95]て[00:27.30]く[00:27.58]
[00:27.90]き[00:28.01]せ[00:28.33]き[00:28.62]を[00:28.84]は[00:29.11]こ[00:29.40]ぶ[00:29.57]か[00:29.85]ぜ[00:30.15]の[00:30.35]ね[00:30.70]
[00:30.89]と[00:31.06]き[00:31.39]を[00:31.66]と[00:31.85]じ[00:32.13]こ[00:32.43]め[00:32.63]て[00:34.16]
[00:34.54]
[00:35.18]シャ[00:35.47]イ[00:35.67]ニ[00:35.83]ン[00:35.94]グ[00:36.09]ス[00:36.26]ター[00:36.59]つ[00:36.96]づ[00:37.39]れ[00:37.58]ば[00:37.92]
[00:38.11]ゆ[00:38.28]め[00:38.51]に[00:38.70]ね[00:39.09]む[00:39.30]る[00:39.61]ま[00:40.02]ぼ[00:40.41]ろ[00:40.54]し[00:40.83]が[00:41.35]て[00:41.54]の[00:41.70]ひ[00:42.14]ら[00:42.36]に[00:42.68]ふ[00:43.08]り[00:43.35]そ[00:43.55]そ[00:44.01]ぐ[00:44.39]
[00:44.61]あ[00:44.78]ら[00:44.96]た[00:45.35]な[00:45.60]せ[00:46.06]か[00:46.46]い[00:46.68]へ[00:47.08]
[00:47.43]I'll [00:47.81]believe [00:48.20]of [00:48.38]my [00:48.71]sensation[00:50.10]
[00:50.28]は[00:50.43]て[00:50.61]し[00:50.72]な[00:51.02]い[00:51.25]み[00:51.42]ち[00:51.78]の[00:52.18]む[00:52.56]こ[00:52.77]う[00:52.97]で[00:53.21]
[00:53.52]ま[00:53.72]ぶ[00:53.90]た[00:54.30]の[00:54.51]う[00:54.86]ら[00:55.26]に[00:55.61]う[00:55.76]つ[00:56.18]る[00:56.52]
[00:56.71]ひ[00:56.94]と[00:57.05]し[00:57.45]ず[00:57.82]く[00:58.22]の[00:58.59]ひ[00:58.84]か[00:59.24]り[00:59.58]
[00:59.76]ト[00:59.95]キ[01:00.31]メ[01:00.72]キ[01:01.09]を[01:01.47]か[01:02.28]ん[01:02.61]じ[01:02.84]て[01:05.44]
[01:06.02]
[01:06.22]LaLaLa [01:06.79]LaLaLa [01:07.39]La[01:08.72]
[01:09.21]LaLaLa [01:09.84]LaLaLa [01:10.42]La [01:11.33]La [01:12.11]La[01:15.16]
[01:15.16]
`;
const Tick = ({ lyrics }) => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime((c) => c + 100); // Met à jour le temps actuel toutes les 100 millisecondes
        }, 100);

        return () => {
            clearInterval(intervalId); // Nettoie l'intervalle lors du démontage du composant
        };
    }, []);

    return (
        <>
            {lyrics.lines.map((line, lineIndex) => {
                const isActiveLine =
                    line.starttime <= currentTime && currentTime < (lyrics.lines[lineIndex + 1] ? lyrics.lines[lineIndex + 1].starttime : Infinity);

                return (
                    <KaraokeLine
                        key={lineIndex}
                        id={`KaraokeLine${lineIndex}`}
                        isActiveLine={isActiveLine}
                        line={line}
                        currentTime={currentTime}
                    />
                );
            })}
        </>
    );
};
const KaraokeLine = ({ id, isActiveLine, line, currentTime }) => {
    const lineRef = useRef(null);

    useEffect(() => {
        if (isActiveLine) {
            lineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
    }, [isActiveLine]);

    return (
        <div
            ref={lineRef}
            id={id}
            className={`KaraokeLine ${isActiveLine ? 'KaraokeActiveLine' : 'KaraokeLine'}`}
            onTransitionEnd={(e) => {
                if (!isActiveLine) {
                    e.target.style.transitionDuration = '1s';
                    e.target.style.color = null;
                    e.target.style.textShadow = null;
                }
            }}
        >
            {line.elements.map((element, elementIndex) => (
                <KaraokeWord
                    key={elementIndex}
                    id={`KaraokeWord${id}_${elementIndex}`}
                    element={element}
                    currentTime={currentTime}
                />
            ))}
        </div>
    );
};

const KaraokeWord = ({ id, element, currentTime }) => {
    const [isActiveWord, setIsActiveWord] = useState(false);

    useEffect(() => {
        if (element.starttime <= currentTime) {
            setIsActiveWord(true);
        } else {
            setIsActiveWord(false);
        }
    }, [currentTime, element.starttime]);

    // @ts-ignore
    return (
        <span
            id={id}
            className={`KaraokeWord ${isActiveWord ? 'KaraokeActiveWord' : ''}`}
            style={{
                textShadow: isActiveWord ? '2px 2px 3px red, -2px 2px 3px red, 2px -2px 3px red, -2px -2px 3px red' : '',
                transitionProperty: 'color, text-shadow',
                transitionTimingFunction: 'ease-in-out',
                transitionDuration: `${element.endtime - element.starttime}ms`
            }}
        >
      {element.text}
    </span>
    );
};

const Karaoke = () => {
    const [currentTime, setCurrentTime] = useState(4500);
    const lines = [{ startTime: 0, endTime: 5000, text: "Première ligne de karaoké" }, { startTime: 5000, endTime: 10000, text: "Deuxième ligne de karaoké" },
    ];
    const lyrics = new KaraokeContainer(lyricstext);
    console.log('lyrics',lyrics);


    return (
        <div>
            <div id="KaraokeView">
                <Tick  lyrics={lyrics} />
            </div>
        </div>
    );
};


export default Karaoke;
