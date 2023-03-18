import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendScore } from "../api";

interface ScoreProps {
  gameId: string;
  userId?: number;
  data: any;
}

const SubmitHighScore = ({ gameId, userId, data }: ScoreProps) => {
  const [nick, setNick] = useState<string>(
    localStorage.getItem("nick") || "Anonymous"
  );
  const push = useNavigate();

  const updateNick = (e: any) => {
    const value = e.target.value;
    setNick(value);
    localStorage.setItem("nick", value);
    e.stopPropagation();
  };

  const submitScore = () => {
    if (userId) {
      sendScore(gameId, { ...data, nick }, userId).then((d) => {
        if (d.status === 200) {
          push(`/top/${gameId}`);
        }
      });
    }
  };
  return (
    <div>
      <input placeholder="Nickname" value={nick} onChange={updateNick} />
      &nbsp;
      <span className="button" onClick={submitScore}>
        Submit highscore
      </span>
    </div>
  );
};

export default SubmitHighScore;
