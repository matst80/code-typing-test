import React, { useEffect, useRef, useState } from "react";
import Words from "./Components/Words";
import "./App.css";

const tests = [
  {
    title: "Törnrosa",
    input:
      "Det ska vi nog ta reda på tänkte den gamla drottningen men hon sa ingenting gick bara in i gästrummet lyfte bort alla sängkläderna och la en ärta i botten på sängen".split(
        " "
      ),
    shouldShuffle: false,
  },
  {
    title: "Svensk saga",
    input:
      "När hon svarade att hon ingenting fått blev skräddaren arg och körde ut sin son från hemmet".split(
        " "
      ),
    shouldShuffle: false,
  },
  {
    title: "Javascript",
    input: [
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
      "string",
      "import",
      "const",
      "return",
    ],
    shouldShuffle: true,
  },
  {
    title: "C#",
    input: [
      "var",
      "record",
      "if",
      "else",
      "public",
      "private",
      "class",
      "delegate",
      "System",
      "interface",
      "return",
    ],
    shouldShuffle: true,
  },
];
function shuffle(array: string[], doShuffle = true) {
  if (!doShuffle) return [...array];
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

const TypingTest = ({ input, shouldShuffle }: TestProps) => {
  const { current, inputChange, wpm, done, words, wordIdx } = useWord(
    input,
    shouldShuffle
  );
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref?.current?.focus();
  }, [input, ref]);
  return (
    <div>
      {!done && (
        <div>
          <Words words={words} idx={wordIdx} current={current} />
          <div className="input">
            <input ref={ref} value={current} autoFocus onChange={inputChange} />
          </div>
        </div>
      )}

      {done && <span>{wpm} words per minute</span>}
    </div>
  );
};

interface TestProps {
  input: string[];
  shouldShuffle: boolean;
}

function App() {
  const [selectedTest, setSelectedTest] = useState<TestProps>({
    input: [],
    shouldShuffle: true,
  });
  return (
    <div className="app">
      <div id="menu">
        {tests.map(({ title, ...test }) => (
          <div
            key={title}
            className="button"
            onClick={() => setSelectedTest(test)}
          >
            {title}
          </div>
        ))}
      </div>
      <TypingTest {...selectedTest} />
    </div>
  );
}

export default App;
