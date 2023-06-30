import Streamer from "./streamer";
import { getRandomShuffledIndex } from "./utils";

export default class Player {

  constructor(store) {
    this.store = store;
    this.streamer = new Streamer('', this.store);
    this.playlist = [];
    this.mode = "in-order";
    this.currentTrackIndex = 0;
    this.currentPosition = 0;
    this.lastPosition = 0;
  }
  addTrack(tracks) {
    tracks.forEach((track) => {
      this.playlist.push(track);
    });
  }
  getStatus(){
    return this.playing;
  }
  playTrack(index, position = 0) {
    if (index < 0 || index >= this.playlist.length) {
      return;
    }
    this.stop();
    this.currentTrackIndex = index;
    const track = this.playlist[index];
    this.streamer = new Streamer(track.url, this.store);
    this.streamer.load().then(() => {
      if (this.currentPosition > 0) {
        this.play(this.streamer, this.currentPosition);
      } else {
        this.play(this.streamer, 0);
      }
    });
  }
  playOnClickTrack(index) {
    if (index < 0 || index >= this.playlist.length) {
      return;
    }
    this.stop();
    this.currentTrackIndex = index;
    const track = this.playlist[index];
    this.streamer = new Streamer(track.url, this.store);
    this.streamer.load().then(() => {
      this.play(this.streamer, 0);
    });

  }
  getCurrentTrackIndex() {
    return this.currentTrackIndex;
  }
  nextTrack() {
    this.currentPosition = 0;
    this.skipTo('next', this.currentTrackIndex, this.playlist.length);
  }

  previousTrack() {
    this.currentPosition = 0;
    this.skipTo('prev', this.currentTrackIndex, this.playlist.length);
  }

  toggle() {
    if (!this.playing) {

      this.playTrack(this.currentTrackIndex);
    } else {
      this.pause();
    }
  }


  play(streamer, position = 0) {
    this.pause();
    this.streamer = streamer;

    if (position > 0) {
      this.streamer.seek(position, this.nextTrack.bind(this));
    }

    this.streamer.stream(position,this.nextTrack.bind(this));
    this.playing = true;
  }



  pause() {
    this.streamer.stop();
    this.playing = false;
  }
  stop() {
    this.streamer.stop();
    this.playing = false;
  }

  seek(position) {
    position = Math.min(position, this.streamer.duration - 0.5);
    this.currentPosition = position;
    this.streamer.seek(position, this.nextTrack.bind(this));
  }

  updatePosition() {
    this.position = this.streamer.currentTime();
    this.currentPosition = this.position;
    if (this.streamer.stopped) {
      this.pause();
    }
    return this.position;
  }

  skipTo(
    order,
    index,
    length
  ) {
    let position = this.streamer.currentTime()
    if(position > 0){
      console.log('ici leka');
      this.streamer.stop();
      this.streamer.seek(0);
     
    }
    
    let currentIndex = index;
    switch (this.mode) {
      case "loop":
        if (order === "next") {
          currentIndex = (index + 1) % length;
        } else {
          currentIndex = (index - 1 + length) % length;
        }
        break;
      case "repeat":
        currentIndex = index;
        break;
      case "in-order":
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
      case "shuffle":
        currentIndex = getRandomShuffledIndex(length, index);
        break;
      case "disabled":
        currentIndex = -1;
        break;
    }
    if (currentIndex != -1) {
      this.playOnClickTrack(currentIndex);
      this.currentTrackIndex = currentIndex;
    }

  };
  setMode(mode) {
    this.mode = mode;
  }
  formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(value) {
    return value.toString().padStart(2, '0');
  }
}