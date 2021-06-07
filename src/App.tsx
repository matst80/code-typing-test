import React, { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Words from "./Components/Words";
import "./App.css";
import { texts } from "./texts";
import useWord from "./useWord";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
} from "react-router-dom";

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

      {done && <span>{wpm} words per minute. Press space to restart</span>}
    </div>
  );
};

interface TestProps {
  input: string[];
  shouldShuffle: boolean;
}

const TestLink = ({ path, title }: any) => {
  return (
    <Link key={`menuitem-${title}`} to={"/run/" + path} className={"button"}>
      {title}
    </Link>
  );
};

interface Score {
  score: number;
  nick: string;
}

const orderByScore = (scores: Score[]) =>
  scores.sort((a, b) => b.score - a.score);

const useScoreboard = (id: string) => {
  const { data: top = [], isLoading } = useQuery(`gamescore-${id}`, () =>
    fetch(`https://type.knatofs.se/api/${id}`)
      .then((d) => d.json())
      .then(orderByScore)
  );
  return { top, isLoading };
};

const TopList = () => {
  const { testId } = useParams<any>();
  const { isLoading, top } = useScoreboard(testId);
  if (isLoading) {
    return <div>Loading scores</div>;
  }
  return (
    <div>
      <h2>Scoreboard</h2>
      <ul>
        {top.map(({ score, nick }: any) => {
          return (
            <li>
              <span>{nick}</span>
              <i>{score}</i>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const TypingRoute = () => {
  const { testId } = useParams<any>();
  const selectedTest = texts.find((d) => d.path === testId);
  return !!selectedTest ? (
    <TypingTest {...selectedTest} />
  ) : (
    <div>Invalid keyword</div>
  );
};

const queryClient = new QueryClient();

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Router>
          <div id="menu">
            {texts.map(({ title, path }) => (
              <TestLink key={`menuitem-${title}`} path={path} title={title} />
            ))}
          </div>
          <Route path={"/run/:testId"}>
            <TypingRoute />
          </Route>
          <Route path={"/top/:testId"}>
            <TopList />
          </Route>
          {/* {texts.map(({ path, title, ...selectedTest }) => (
          <>
            <Route key={`r-${title}`} path={path} exact>
              <TypingTest {...selectedTest} />
            </Route>
            <Route key={`rtop-${title}`} path={path + "/top"} exact>
              <p>Slaska</p>
            </Route>
          </>
        ))} */}
        </Router>
        <a id="github" href="https://github.com/matst80/code-typing-test">
          <img width="80" src="/github.png" alt="Github" />
        </a>
      </QueryClientProvider>
    </div>
  );
}

export default App;
