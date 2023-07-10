import {getRandomShuffledIndex} from "./utils.js";
import Streamer from "../../plugins/streams/streamer";
import playerState from "../../store/player/state";
import {setPlayMusicInfo} from "../../core/player/playInfo";
import {pause, playNext} from "../../core/player/player";
import {MUSIC_TOGGLE_MODE} from "../../config/constant";

export default class Player {
  add(tracks) {
    tracks.forEach((track) => {
      global.lx.playlist.push(track);
    });
  }

  playTrack(index,nextOrPrev = false) {
    if (index < 0 || index >= global.lx.playlist.length) {
      return;
    }
    if(nextOrPrev){
      global.lx.currentPosition = 0;
    }
    this.stop();

    global.lx.currentTrackIndex = index;
    const track = global.lx.playlist[index];
    global.lx.streamer = new Streamer(track.url, global.lx.ac,global.lx.store);
    global.lx.streamer.load().then(() => {
      if (global.lx.currentPosition > 0) {
        this.played(global.lx.currentPosition);
      } else {
        this.played(0);
      }
    });
  }
  playOnClickTrack(index) {
    if (index < 0 || index >= global.lx.playlist.length) {
      return;
    }
    this.stop();

    global.lx.currentTrackIndex = index;
    const track = global.lx.playlist[index];
    global.lx.streamer.setUrl(track.url);
    this.played(0);

  }
  getCurrentTrackIndex() {
    return global.lx.currentTrackIndex;
  }
  getCurrentTrack(){
    return global.lx.playlist[global.lx.currentTrackIndex];
  }
  skipToNext() {
    console.log('skip to',global.lx.playMode);
    global.lx.currentPosition= 0;
    this.skipTo('next', global.lx.currentTrackIndex, global.lx.playlist.length);
  }

  previousTrack() {
    global.lx.currentPosition= 0;
    this.skipTo('prev', global.lx.currentTrackIndex, global.lx.playlist.length);
  }

  toggle() {
    if (!this.playing) {

      this.playTrack(global.lx.currentTrackIndex);
    } else {
      this.pause();
    }
  }


  playing(){
     this.playTrack(global.lx.currentTrackIndex);
  }

  played(position) {
    this.stop();
    global.lx.streamer.stream(position,this.skipToNext.bind(this));
    this.playing = true;
  }
  play(){
    this.playTrack(global.lx.currentTrackIndex);
  }



  pause() {
    global.lx.streamer.stop();
    this.playing = false;
  }
  stop() {
    global.lx.streamer.stop();
    this.playing = false;
  }

  seekTo(position) {
    let duration = global.lx.streamer.getDuration();
    position = Math.min(position, duration - 0.5);
    global.lx.streamer.seek(position, this.skipToNext.bind(this));
  }

  updatePosition() {
    global.lx.currentPosition = global.lx.streamer.currentTime();
    if (global.lx.streamer.stopped) {
      this.pause();
    }
  }
  skipTo(
    order,
    index,
    length
  ) {
    global.lx.currentPosition = 0;
    global.lx.streamer.stop();
    global.lx.streamer.seek(0);
    let currentIndex = index;
    switch (global.lx.playMode) {
      case MUSIC_TOGGLE_MODE.listLoop:
        if (order === "next") {
          currentIndex = (index + 1) % length;
        } else {
          currentIndex = (index - 1 + length) % length;
        }
        break;
      case MUSIC_TOGGLE_MODE.singleLoop:
        currentIndex = index;
        break;
      case  MUSIC_TOGGLE_MODE.list:
        if (order === "next") {
          if (index >= length - 1) {
            currentIndex = 0;
          } else {
            currentIndex = index + 1;
          }
        } else {
          if (index < 1) {
            currentIndex = 0;
          } else {
            currentIndex = index - 1;
          }
        }
        break;
      case  MUSIC_TOGGLE_MODE.random:
        currentIndex = getRandomShuffledIndex(length, index);
        break;
      case  MUSIC_TOGGLE_MODE.none:
        currentIndex = -1;
        break;
    }
    if (currentIndex !== -1)
      global.lx.currentTrackIndex = currentIndex;
    playNext().then(r => {});



  };

  setMode(mode) {
    global.lx.playMode = mode;
  }
  getPosition(){
    return global.lx.streamer.currentTime();
  }
  getDuration(){
    return global.lx.streamer.duration;
  }
  setVolume(volume){
    return global.lx.streamer.setVolume(volume);
  }
  setRate(num){

  }
  destroy(){
    global.lx.streamer = null;
  }
  getBufferedPosition(){
    return global.lx.streamer.currentTime();
  }
  getQueue(){
    return global.lx.playlist;
  }
  remove(index) {
    if (index > 0 || index <= global.lx.playlist.length) {
      global.lx.playlist.splice(index, 1);
    }

  }
  updateNowPlayingMetadata(param, isPlaying) {
    const currentTrack = this.getCurrentTrack();
    global.lx.playlist[global.lx.currentTrackIndex] = {
      ...currentTrack,
      param, // Remplacez par le nom du paramètre de métadonnées spécifique que vous souhaitez mettre à jour
      isPlaying, // Remplacez par le nom du paramètre de métadonnées spécifique que vous souhaitez mettre à jour
    };
  }
}