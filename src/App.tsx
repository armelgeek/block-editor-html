import React from "react";
import Routes from "./Routes";
//import AudioStore from "./plugins/streams/audiostore";
//import Player from "./plugins/streams/player";
//import Playlist from "./pages/Player";
//import Streamer from "./plugins/streams/streamer";
//const ac = new window.AudioContext();
//const store = new AudioStore(ac);

/**async function init() {
  await store.init();
}
init();
const player = new Player(store);
const tracks = [
  { title: "Anaro aho", url: "http://localhost:8100/songs/TJxeiEiXBYQ.mp3" },
  {
    title: "Tsy fangalana",
    url: "http://localhost:8100/songs/GFf6w46X95U.mp3",
  },
];
player.addTrack(tracks);
const streamer = new Streamer('',store);**/
const App = () => {

  return <>
        <Routes/>
    {/**<Playlist streamer={streamer} tracks={tracks} player={player}/>**/}
  </>;
};

export default App;
