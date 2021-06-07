import { useEffect, useState } from "react";
import { shuffle } from "./texts";

const MINUTE = 1000 * 60;

const useWord = (wordList: string[], shouldShuffle = true) => {
  const [words, setWords] = useState<string[]>([]);
  const [started, setStarted] = useState<number | undefined>();
  const [ended, setEnded] = useState<number | undefined>();
  const [current, setCurrent] = useState<string>("");
  const [wordIdx, setWordIdx] = useState<number>(0);

  useEffect(() => {
    setWords(shuffle(wordList, shouldShuffle));
    setCurrent("");
    setWordIdx(0);
    setStarted(undefined);
    setEnded(undefined);
    return () => {};
  }, [wordList, shouldShuffle]);

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

export default useWord;