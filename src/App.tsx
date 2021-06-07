import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { texts } from "./texts";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import TypingTest from "./Components/TypingTest";
import { startGame } from "./api";
import ScoreBoard from "./Components/ScoreBoard";

const TestLink = ({ path, title }: any) => {
  const { gameId } = useParams<RouteParams>();
  const className = path === gameId ? "selected button" : "button";
  return (
    <Link key={`menuitem-${title}`} to={"/run/" + path} className={className}>
      {title}
    </Link>
  );
};

interface UserProps {
  userId?: number;
}

interface RouteParams {
  gameId: string;
}

const TypingRoute = ({ userId }: UserProps) => {
  const { gameId } = useParams<RouteParams>();
  const selectedTest = texts.find((d) => d.path === gameId);
  return !!selectedTest ? (
    <TypingTest {...selectedTest} userId={userId} gameId={gameId} />
  ) : (
    <div>Invalid keyword</div>
  );
};

const TopList = () => {
  const { gameId } = useParams<RouteParams>();
  return (
    <div>
      <div>Scoreboard</div>
      <ScoreBoard gameId={gameId} />
    </div>
  );
};

const queryClient = new QueryClient();

function App() {
  const [userId, setUserId] = useState<number | undefined>();
  useEffect(() => {
    startGame().then(setUserId);
  }, []);

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Router>
          <div id="menu">
            {texts.map(({ title, path }) => (
              <TestLink key={`menuitem-${title}`} path={path} title={title} />
            ))}
          </div>
          <Route path={"/run/:gameId"}>
            <TypingRoute userId={userId} />
          </Route>
          <Route path={"/top/:gameId"}>
            <TopList />
          </Route>
          <Route path="/" exact>
            <p>Select category</p>
          </Route>
        </Router>
        <a id="github" href="https://github.com/matst80/code-typing-test">
          <img width="80" src="/github.png" alt="Github" />
        </a>
      </QueryClientProvider>
    </div>
  );
}

export default App;
