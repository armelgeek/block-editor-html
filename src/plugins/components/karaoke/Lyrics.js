import React, { useState, useReducer, useEffect } from "react";

const initialState = {
  currentWordIndex: 0,
  currentLineIndex: 0,
  currentWord: "",
};

const karaokeReducer = (state, action) => {
  switch (action.type) {
    case "nextWord":
      if (state.currentWordIndex < action.maxWordIndex - 1) {
        return {
          ...state,
          currentWordIndex: state.currentWordIndex + 1,
          currentWord: action.words[state.currentWordIndex + 1],
        };
      } else if (state.currentLineIndex < action.maxLineIndex - 1) {
        return {
          ...state,
          currentLineIndex: state.currentLineIndex + 1,
          currentWordIndex: 0,
          currentWord: action.words[0],
        };
      } else {
        return state;
      }
    case "previousWord":
      if (state.currentWordIndex > 0) {
        return {
          ...state,
          currentWordIndex: state.currentWordIndex - 1,
          currentWord: action.words[state.currentWordIndex - 1],
        };
      } else if (state.currentLineIndex > 0) {
        const prevLine = action.lyrics[state.currentLineIndex - 1];
        return {
          ...state,
          currentLineIndex: state.currentLineIndex - 1,
          currentWordIndex: prevLine.words.length - 1,
          currentWord: prevLine.words[prevLine.words.length - 1].text,
        };

      } else {
        return state;
      }
     case "nextLine":
      if (state.currentLineIndex < action.maxLineIndex - 1) {
        const nextLine = action.words[state.currentLineIndex + 1];
        return {
          ...state,
          currentLineIndex: state.currentLineIndex + 1,
          currentWordIndex: 0,
          currentWord: nextLine.words[0].text,
        };
      } else {
        return state;
      }
    case "previousLine":
      if (state.currentLineIndex > 0) {
        const previousLine = action.words[state.currentLineIndex - 1];
        return {
          ...state,
          currentLineIndex: state.currentLineIndex - 1,
          currentWordIndex: 0,
          currentWord: previousLine.words[0].text,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

const Lyrics = ({ lyrics }) => {
  const maxLineIndex = lyrics.length;
  const maxWordIndex = lyrics[0].words.length;

  const [state, dispatch] = useReducer(karaokeReducer, initialState);
  const [isPlaying, setIsPlaying] = useState(false);

 useEffect(() => {
  let intervalId = null;

  if (isPlaying) {
    intervalId = setInterval(() => {
      dispatch({ type: "nextWord", maxLineIndex, maxWordIndex, words: lyrics[state.currentLineIndex].words });
    }, lyrics[state.currentLineIndex].words[state.currentWordIndex].startTime * 1000);
  }

  return () => clearInterval(intervalId);
}, [lyrics, state.currentLineIndex, state.currentWordIndex, isPlaying]);
  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePreviousClick = () => {
    dispatch({ type: "previousWord", maxLineIndex, maxWordIndex, lyrics, words: lyrics[state.currentLineIndex].words });
  };

  const handleNextClick = () => {
  if (state.currentLineIndex === maxLineIndex - 1 && state.currentWordIndex === maxWordIndex - 1) {
    // Do nothing, we're already at the end of the song
  } else if (state.currentWordIndex < maxWordIndex - 1) {
    dispatch({ type: "nextWord", maxLineIndex, maxWordIndex, words: lyrics[state.currentLineIndex].words });
  } else if (state.currentLineIndex < maxLineIndex - 1) {
    dispatch({ type: "nextWord", maxLineIndex, maxWordIndex, words: lyrics[state.currentLineIndex + 1].words });
  }
};
const handleNextLineClick = () => {
  dispatch({
    type: "nextLine",
    maxLineIndex,
    maxWordIndex,
    words: lyrics[state.currentLineIndex + 1].words,
  });
};

const handlePreviousLineClick = () => {
  dispatch({
    type: "previousLine",
    maxLineIndex,
    lyrics,
  });
};

  const renderLyrics = () => {
  return lyrics.map((line, lineIndex) => {
    const words = line.words.map((word, wordIndex) => {
      let className = "";
      if (lineIndex === state.currentLineIndex && wordIndex === state.currentWordIndex) {
        className = "active";
      }
      return (
        <span key={wordIndex} className={className}>
          <span data-text={word.text} className="word">{word.text}&nbsp;</span>
        </span>
      );
    });
    return (
      <div key={lineIndex} className="line">
        {words}
      </div>
    );
  });
};
  return (
    <div className="karaoke">
      {renderLyrics()}
      <div>
        <button onClick={handlePreviousClick}>Previous</button>
        <button onClick={handleNextClick}>Next</button>
        <button onClick={handlePreviousLineClick}>Previous Line</button>
        <button onClick={handleNextLineClick}>Next Line</button>
        <button onClick={handlePlayPauseClick}>
    {isPlaying ? "Pause" : "Play"}
  </button>
      </div>
  </div>)}

export default Lyrics;
