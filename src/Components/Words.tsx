import React from "react";
import FlipMove from "react-flip-move";
import Word from "./Word";

interface WordsProps {
  words: string[];
  current: string;
  idx: number;
}

const Words = ({ words, idx, current }: WordsProps) => {
  const left = words.filter((_, i) => i >= idx && i < idx + 5);

  const elms = left.map((word, i) => {
    if (i === 0) {
      return (
        <div key={`${word}-${idx+i}`} className="active-word">
          <Word word={word} current={current} />
        </div>
      );
    } else {
      return (
        <div key={`${word}-${idx+i}`}>
          <span>{word}</span>
        </div>
      );
    }
  });
  return (
    <div className="words">
      <FlipMove>{elms}</FlipMove>
    </div>
  );
};

export default Words;
