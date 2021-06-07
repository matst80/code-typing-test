import React, { useEffect, useRef } from "react";
import useWord from "../useWord";
import ScoreBoard from "./ScoreBoard";
import SubmitHighScore from "./SubmitHighscore";
import Words from "./Words";

const TypingTest = ({ input, shouldShuffle, userId, gameId }: TestProps) => {
  const { current, inputChange, wpm, done, words, wordIdx, game, resetGame } =
    useWord(input, shouldShuffle);
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
            <input
              ref={ref}
              value={current}
              id="word-input"
              autoFocus
              onChange={inputChange}
            />
          </div>
        </div>
      )}

      {done && (
        <>
          <span onClick={resetGame}>
            {wpm} words per minute. Press to restart
          </span>
          <SubmitHighScore data={game} userId={userId} gameId={gameId} />
          <ScoreBoard gameId={gameId} />
        </>
      )}
    </div>
  );
};

export interface TestProps {
  userId?: number;
  gameId: string;
  input: string[];
  shouldShuffle: boolean;
}

export default TypingTest;
