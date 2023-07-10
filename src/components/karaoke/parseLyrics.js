import React from "react";
import LyricWord from "./LyricWord";

export default function parseLyrics(lyrics) {
  // Match all words within the text, including words with apostrophes
  const matches = [...lyrics.matchAll(/[\w']+/g)];

  // Derived array to find matches by start letter index
  const matchStarts = matches.map((match) => match.index);

  const nodes = [];

  let i = 0;
  let letter;

  while (i < lyrics.length) {
    letter = lyrics[i];

    // Find the match index by the start letter's index
    const matchIndex = matchStarts.indexOf(i);

    if (letter === "\n") {
      // Replace newlines with <br>
      nodes.push(<br key={i} />);
      i++;
      continue;
    }

    if (matchIndex !== -1) {
      const match = matches[matchIndex];
      const word = match[0];

      // The match index is the word index
      nodes.push(
        <LyricWord
          key={i}
          index={matchIndex}
          word={word}
          color={getRandomColor()}
        />
      );

      // Skip to the character after the word
      i += word.length;
      continue;
    }

    nodes.push(<span key={i}>{letter}</span>);
    i++;
  }

  return nodes;
}

function getRandomColor() {
  const colors = ["#FF5733", "#C70039", "#900C3F", "#581845"];
  return colors[Math.floor(Math.random() * colors.length)];
}
