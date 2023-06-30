import React, { useEffect } from "react";

const Playlist = ({ tracks, player }:any) => {
  const handleItemClick = (index:number) => {
    player.playOnClickTrack(index);
  };

  const handlePrevButtonClick = () => {
    player.previousTrack();
  };

  const handleNextButtonClick = () => {
    player.stop();
    player.nextTrack();
  };
  const handleToggle = () =>{
    player.toggle();
  }

  return (
    <div className="playlist">
      {tracks.map((track: any, index: number) => (
        <div
          key={index}
          className={`playlist-item ${
            index === player.getCurrentTrackIndex() ? "active" : ""
          }`}
          onClick={() => handleItemClick(index)}
        >
          {track.title}
        </div>
      ))}
    
      <button className="prev-button" onClick={handlePrevButtonClick}>
        Previous
      </button>
      <button className="toggle-button" onClick={handleToggle}>
        Toggle
      </button>
      <button className="next-button" onClick={handleNextButtonClick}>
        Next
      </button>
    </div>
  );
};

export default Playlist;
