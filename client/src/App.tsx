import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useParams,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { texts } from "./texts";
import TypingTest from "./Components/TypingTest";
import { startGame } from "./api";
import ScoreBoard from "./Components/ScoreBoard";
import useKeyboard from "./useShortcuts";

const TestLink = ({ path, title }: any) => {
  const { gameId } = useParams<"gameId">();
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

const TypingRoute = () => {
  const [userId, setUserId] = useState<number | undefined>();
  useEffect(() => {
    startGame().then(setUserId);
  }, []);
  const { gameId } = useParams<"gameId">();
  const selectedTest = texts.find((d) => d.path === gameId);
  return !!selectedTest ? (
    <TypingTest userId={userId} {...selectedTest} gameId={gameId!} />
  ) : (
    <div>Invalid keyword</div>
  );
};

const TopList = () => {
  const { gameId } = useParams<"gameId">();
  if (!gameId) return <div>Invalid keyword</div>;
  useKeyboard(gameId);
  return (
    <div>
      <div>Scoreboard</div>
      <ScoreBoard gameId={gameId} />
    </div>
  );
};

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <div id="menu">
          {texts.map(({ title, path }) => (
            <TestLink key={`menuitem-${title}`} path={path} title={title} />
          ))}
        </div>
        <p>Select category</p>
      </>
    ),
  },
  { path: "/run/:gameId", element: <TypingRoute /> },
  { path: "/top/:gameId", element: <TopList /> },
]);

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />

        <a id="github" href="https://github.com/matst80/code-typing-test">
          <img width="80" src="/github.png" alt="Github" />
        </a>
      </QueryClientProvider>
    </div>
  );
}

export default App;
