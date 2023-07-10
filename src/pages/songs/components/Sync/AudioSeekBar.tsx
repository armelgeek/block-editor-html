import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
    FunctionComponent,
    MouseEvent
} from "react"
import { useAudioPlayer, useAudioPosition } from "react-use-audio-player"

export const AudioSeekBar = props => {
    const { className = "" } = props
    const { duration, seek, percentComplete } = useAudioPosition({
        highRefreshRate: true
    })
    const { playing } = useAudioPlayer()
    const [barWidth, setBarWidth] = useState("0%")
    const seekBarElem = useRef(null)
    
    useEffect(() => {
        setBarWidth(`${percentComplete}%`)
    }, [percentComplete])

    const goTo = useCallback(
        (event) => {
            const { pageX: eventOffsetX } = event
            if (seekBarElem.current) {
                const elementOffsetX = seekBarElem.current.offsetLeft
                const elementWidth = seekBarElem.current.clientWidth
                const percent = (eventOffsetX - elementOffsetX) / elementWidth
                seek(percent * duration)
            }
        },
        [duration, playing, seek]
    )

    return (
        <div
            className={`audioSeekBar ${className} `}
            ref={seekBarElem}
            onClick={goTo}
        >
            <div style={{ width: barWidth }} className="audioSeekBar__tick" />
        </div>
    )
}
