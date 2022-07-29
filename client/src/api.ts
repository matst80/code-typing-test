import { useQuery } from "react-query";

const baseUrl = "/api";

export interface Score {
  score: number;
  nick: string;
}

const hashCode = (s: string) =>
  s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

export const sendScore = (id: string, data: any, userId: number) => {
  const body = JSON.stringify({
    ...data,
    ts: Date.now(),
    tt: data.end - data.start,
  });
  return fetch(`${baseUrl}/${id}`, {
    method: "POST",
    headers: {
      hash: hashCode(body + userId).toString(),
      tsid: userId.toString(),
      "content-type": "application/json",
    },
    body,
  });
};

export const startGame = () =>
  fetch(`${baseUrl}/start/${Date.now()}`).then((d) => d.json());

const orderByScore = (scores: Score[]) =>
  scores.sort((a, b) => b.score - a.score);

export const useScoreboard = (id: string) => {
  const { data: top = [], isLoading } = useQuery(`gamescore-${id}`, () =>
    fetch(`${baseUrl}/${id}`)
      .then((d) => d.json())
      .then(orderByScore)
  );
  return { top, isLoading };
};
