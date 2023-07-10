import React from "react"
import { useAudioPlayer } from "react-use-audio-player"
import { AudioSeekBar } from "./AudioSeekBar"
import { TimeLabel } from "./TimeLabel"
const AudioPlayer = ({ file ,isLoading}) => {
    const { togglePlayPause, ready,stop, loading, playing } = useAudioPlayer({
        src: file,
        format: "mp3",
        autoplay: false,
        onend: () => console.log("sound has ended!")
    })

   
    return (
        <div style={{
            position: "fixed",
            zIndex:3,
            bottom: "0px",
            right: "0px",
            left: "0px",
            background:'whitesmoke',
            border:"1px solid gray",
            paddingTop:"10px",
            paddingBottom:"10px"
            
        }}>

           <div style={{
             display:'flex',
             flexDirection:'row',
             alignItems: "center",
             justifyContent: "center"
           }}>
           {!ready && !loading  && <div style={{
            marginRight:5
           }}>No audio to play</div>}
           {loading  && <div style={{
            marginRight:5
           }}>Loading audio.... </div>}
           <button disabled={isLoading} onClick={togglePlayPause}>{playing ? "Pause" : "Play"}</button>
            <button disabled={isLoading} onClick={()=> stop()}>Stop</button>
            <AudioSeekBar className="player__seek" />

            <TimeLabel />
           </div>
           
        </div>
    )
}
export default AudioPlayer;