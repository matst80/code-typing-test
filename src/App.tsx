import React, { useEffect, useState } from "react";
import Words from "./Components/Words";
import "./App.css";

const javascriptWords = [
  "var",
  "let",
  "if",
  "else",
  "Math",
  "JSON",
  "stringify",
  "array",
  "number",
  "function",
  "interface",
  "static",
  "string",
  "import",
  "const",
];

function shuffle(array: string[]) {
  let currentIndex = array.length,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const MINUTE = 1000 * 60;

const useWord = (wordList: string[]) => {
  const [words, setWords] = useState<string[]>([]);
  const [started, setStarted] = useState<number | undefined>();
  const [ended, setEnded] = useState<number | undefined>();
  const [current, setCurrent] = useState<string>("");
  const [wordIdx, setWordIdx] = useState<number>(0);

  useEffect(() => {
    setWords(shuffle(wordList));
    setCurrent("");
    setWordIdx(0);
    setStarted(undefined);
    setEnded(undefined);
    return () => {};
  }, [wordList]);

  const word = words.length ? words[wordIdx] : "loading";

  const inputChange = (e: any) => {
    setCurrent(e.target.value.trim());
    if (!started) {
      setStarted(Date.now());
    }
  };

  if (current === word) {
    if (wordIdx === words.length - 1) {
      setEnded(Date.now());
    } else {
      setWordIdx(wordIdx + 1);
    }
    setCurrent("");
  }

  const now = Date.now();
  const duration = (ended ?? now) - (started ?? now);

  return {
    word,
    current,
    inputChange,
    duration,
    done: !!ended,
    words,
    wordIdx,
    wpm: Math.round((wordIdx + 1) / (duration / MINUTE)),
  };
};

function App() {
  const { current, inputChange, wpm, done, words, wordIdx } =
    useWord(javascriptWords);
  return (
    <div className="app">
      {!done && (
        <div>
          <Words words={words} idx={wordIdx} current={current} />
          <div className="input">
            <input value={current} onChange={inputChange} />
          </div>
        </div>
      )}

      {done && <span>{wpm} words per minute</span>}
    </div>
  );
}

export default App;
