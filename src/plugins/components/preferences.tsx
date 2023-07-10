import { themeColor, ThemeMode } from "../hooks/usePref";
import { convertTimeToTag, formatText } from "@lrc-maker/lrc-parser";
import { unregister } from "../utils/sw.unregister";
import { appContext, ChangBits } from "./app.context";
import { AkariHideWall } from "./svg.img";
import React from 'react';
const { useCallback, useContext, useEffect, useMemo, useRef } = React;
export const enum Const {
    emptyString = "",
    space = " ",
}
const enum MetaData {
    version = "5.6.6",
    hash = "26783c9",
    updateTime = "2022-10-22T10:52:25+08:00",
    akariOdangoLoading = "./svg/akari-odango-loading.svg",
    akariHideWall = "./svg/akari-hide-wall.svg",
    akariNotFound = "./svg/akari-not-found.svg",
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
const numberInputProps = { type: "number", step: 1 } as const;

type OnChange<T> = (event: React.ChangeEvent<T>) => void;

interface IUseNumberInput<T = HTMLInputElement> {
    (defaultValue: number, onChange: OnChange<T>): typeof numberInputProps & {
        ref: React.RefObject<T>;
        onChange: OnChange<T>;
        defaultValue: number;
    };
}

const useNumberInput: IUseNumberInput = (defaultValue: number, onChange) => {
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const target = ref.current;
        if (target) {
            const onChange = (): void => {
                target.value = defaultValue.toString();
            };

            target.addEventListener("change", onChange);
            return (): void => target.removeEventListener("change", onChange);
        }
    }, [defaultValue]);

    const $onChange = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            if (ev.target.validity.valid) {
                onChange(ev);
            }
        },
        [onChange],
    );

    return { ...numberInputProps, ref, onChange: $onChange, defaultValue };
};

export const Preferences: React.FC = () => {
    const { prefState, prefDispatch } = useContext(appContext,ChangBits.prefState);

    const onColorPick = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            prefDispatch({
                type: "themeColor",
                payload: ev.target.value,
            });
        },
        [prefDispatch],
    );

    const userColorInputText = useRef<HTMLInputElement>(null);

    const onUserInput = useCallback(
        (input: EventTarget & HTMLInputElement) => {
            let value = input.value;

            if (!input.validity.valid) {
                input.value = input.defaultValue;
                return;
            }

            if (value.length === 3) {
                value = [].map.call(value, (v: string) => v + v).join("");
            }
            if (value.length < 6) {
                value = value.padEnd(6, "0");
            }

            prefDispatch({
                type: "themeColor",
                payload: "#" + value,
            });
        },
        [prefDispatch],
    );

    const onUserColorInputBlur = useCallback(
        (ev: React.FocusEvent<HTMLInputElement>) => onUserInput(ev.target),
        [onUserInput],
    );

    const onColorSubmit = useCallback(
        (ev: React.FormEvent<HTMLFormElement>) => {
            ev.preventDefault();

            const form = ev.target as HTMLFormElement;

            const input = form.elements.namedItem("user-color-input-text") as HTMLInputElement;

            return onUserInput(input);
        },
        [onUserInput],
    );

    useEffect(() => {
        userColorInputText.current!.value = prefState.themeColor.slice(1);
    }, [prefState.themeColor]);

    const onSpaceChange = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            prefDispatch({
                type: ev.target.name as "spaceStart" & "spaceEnd",
                payload: ev.target.value,
            });
        },
        [prefDispatch],
    );

    const onCacheClear = useCallback(() => {
        unregister();
    }, []);

    const updateTime = useMemo(() => {
        const date = new Date(MetaData.updateTime);
        const options = {
            year: "numeric" as const,
            month: "short" as const,
            day: "numeric" as const,
            hour: "numeric" as const,
            minute: "numeric" as const,
            second: "numeric" as const,
            timeZoneName: "short" as const,
            hour12: false as const,
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }, []);

   

    const onBuiltInAudioToggle = useCallback(
        () =>
            prefDispatch({
                type: "builtInAudio",
                payload: (prefState) => !prefState.builtInAudio,
            }),
        [prefDispatch],
    );

    const onScreenButtonToggle = useCallback(
        () =>
            prefDispatch({
                type: "screenButton",
                payload: (prefState) => !prefState.screenButton,
            }),
        [prefDispatch],
    );

    const onThemeModeChange = useCallback(
        (ev: React.ChangeEvent<HTMLSelectElement>) => {
            prefDispatch({
                type: "themeMode",
                payload: Number.parseInt(ev.target.value, 10) as ThemeMode,
            });
        },
        [prefDispatch],
    );

    const onFixedChanged = useCallback(
        (ev: React.ChangeEvent<HTMLSelectElement>) => {
            prefDispatch({
                type: "fixed",
                payload: Number.parseInt(ev.target.value, 10) as Fixed,
            });
        },
        [prefDispatch],
    );


    const ColorPickerWall = useMemo(() => {
        return Object.values(themeColor).map((color) => {
            const checked = color === prefState.themeColor;
            const classNames = ["color-picker", "ripple"];
            if (checked) {
                classNames.push("checked");
            }
            return (
                <label className={classNames.join(Const.space)} key={color} style={{ backgroundColor: color }}>
                    <input
                        hidden={true}
                        type="radio"
                        name="theme-color"
                        value={color}
                        checked={checked}
                        onChange={onColorPick}
                    />
                </label>
            );
        });
    }, [onColorPick, prefState.themeColor]);

    const currentThemeColorStyle = useMemo(() => {
        return {
            backgroundColor: prefState.themeColor,
        };
    }, [prefState.themeColor]);

    const formatedText = useMemo(() => {
        return formatText("   hello   世界～   ", prefState.spaceStart, prefState.spaceEnd);
    }, [prefState.spaceStart, prefState.spaceEnd]);

    const userColorLabel = useRef<HTMLLabelElement>(null);
    const userColorInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (userColorInput.current!.type === "color") {
            userColorLabel.current!.removeAttribute("for");
        }
    }, []);

    return (
        <div className="preferences">
            <ul>
                <li>
                    <section className="list-item">
                        <span>{'Version'}</span>
                        <span className="select-all">{MetaData.version}</span>
                    </section>
                </li>
                <li>
                    <section className="list-item">
                        <span>{'Commit Hash'}</span>
                        <span className="select-all">{MetaData.hash}</span>
                    </section>
                </li>
                <li>
                    <section className="list-item">
                        <span>{'update time'}</span>
                        <span>{updateTime}</span>
                    </section>
                </li>
                
                
                <li>
                    <label className="list-item">
                        <span>{'build in audio'}</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={prefState.builtInAudio}
                                onChange={onBuiltInAudioToggle}
                                aria-label={'build in audio'}
                            />
                            <span className="toggle-switch-label" />
                        </label>
                    </label>
                </li>
                <li>
                    <label className="list-item">
                        <span>{'space button'}</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={prefState.screenButton}
                                onChange={onScreenButtonToggle}
                                aria-label={'space button'}
                            />
                            <span className="toggle-switch-label" />
                        </label>
                    </label>
                </li>

               

                <li>
                    <section className="list-item">
                        <span>{'Theme Color'}</span>
                        <details className="dropdown">
                            <summary>
                                <span className="color-picker ripple hash" style={currentThemeColorStyle}>
                                    {"#"}
                                </span>
                                <span className="current-theme-color">{prefState.themeColor.slice(1)}</span>
                            </summary>
                            <form className="dropdown-body color-wall" onSubmit={onColorSubmit}>
                                {ColorPickerWall}
                                <label
                                    className="color-picker ripple user-color-label hash"
                                    htmlFor="user-color-input-text"
                                    style={currentThemeColorStyle}
                                    ref={userColorLabel}
                                >
                                    {"#"}
                                    <input
                                        type="color"
                                        className="color-picker pseudo-hidden"
                                        value={prefState.themeColor}
                                        onChange={onColorPick}
                                        ref={userColorInput}
                                    />
                                </label>
                                <input
                                    ref={userColorInputText}
                                    id="user-color-input-text"
                                    name="user-color-input-text"
                                    className="user-color-input-text"
                                    type="text"
                                    pattern="[\da-f]{3,6}"
                                    required={true}
                                    autoCapitalize="none"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    spellCheck={false}
                                    defaultValue={prefState.themeColor.slice(1)}
                                    onBlur={onUserColorInputBlur}
                                />
                            </form>
                        </details>
                    </section>
                </li>
                <li>
                    <section className="list-item">
                        <span>{'lrc format'}</span>
                        <span>
                            <time className="format-example-time">{convertTimeToTag(83.456, prefState.fixed)}</time>
                            <span className="format-example-text">{formatedText}</span>
                        </span>
                    </section>
                </li>
                <li>
                    <section className="list-item">
                        <span>{'fixed'}</span>
                        <div className="option-select">
                            <select
                                name="fixed"
                                value={prefState.fixed}
                                onChange={onFixedChanged}
                                aria-label={'lrc format'}
                            >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </select>
                        </div>
                    </section>
                </li>
                <li>
                    <label className="list-item">
                        <label htmlFor="space-start">{'left space'}</label>
                        <input
                            name="spaceStart"
                            id="space-start"
                            required={true}
                            min={-1}
                            {...useNumberInput(prefState.spaceStart, onSpaceChange)}
                        />
                    </label>
                </li>
                <li>
                    <label className="list-item">
                        <label htmlFor="space-end">{'right space'}</label>
                        <input
                            name="spaceEnd"
                            id="space-end"
                            required={true}
                            min={-1}
                            {...useNumberInput(prefState.spaceEnd, onSpaceChange)}
                        />
                    </label>
                </li>
                <li className="ripple" onTransitionEnd={onCacheClear}>
                    <section className="list-item">{'clear cache'}</section>
                </li>
            </ul>
            <AkariHideWall />
        </div>
    );
};
