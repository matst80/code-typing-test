import React, { useEffect, useRef, useState } from "react";
import Words from "./Components/Words";
import "./App.css";
import { texts } from "./texts";
import useWord from "./useWord";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
  return (
    <div className="app">
      <Router>
        <div id="menu">
          {texts.map(({ title, path }) => (
            <Link key={title} to={path} className="button">
              {title}
            </Link>
          ))}
        </div>
        {texts.map(({ path, title, ...selectedTest }) => (
          <Route path={path}>
            <TypingTest {...selectedTest} />
          </Route>
        ))}
        <a href="https://github.com/matst80/code-typing-test">
          <img width="80" src="github.png" alt="Github" />
        </a>
      </Router>
    </div>
  );
}

export default App;
