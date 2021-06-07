import React, { useEffect, useRef, useState } from "react";
import Words from "./Components/Words";
import "./App.css";
import { texts } from "./texts";
import useWord from "./useWord";

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
  const [selectedTest, setSelectedTest] = useState<TestProps>(texts[0]);
  return (
    <div className="app">
      <div id="menu">
        {texts.map(({ title, ...test }) => (
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
      <a href="https://github.com/matst80/code-typing-test">
        <img width="80" src="github.png" alt="Github" />
      </a>
    </div>
  );
}

export default App;
