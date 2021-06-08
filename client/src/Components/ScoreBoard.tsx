import { useScoreboard } from "../api";

interface ScoreBoardProps {
  gameId: string;
}

const ScoreBoard = ({ gameId }: ScoreBoardProps) => {
  const { isLoading, top } = useScoreboard(gameId);
  if (isLoading) {
    return <div>Loading scores</div>;
  }
  return (
    <div className="scoreboard">
      {top.map(({ score, nick }: any) => (
        <div>
          <span>{nick}</span>
          <i>{score}</i>
        </div>
      ))}
    </div>
  );
};

export default ScoreBoard;
