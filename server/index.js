const express = require("express");
const app = express();
const path = require("path");
const redis = require("redis");
const cors = require("cors");

const client = redis.createClient(
  process.env.REDIS || "redis://10.10.10.2:6379"
);

const hashCode = (s) =>
  s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

const corsOptions = {
  origin: (origin, cb) => {
    cb(
      null,
      !origin ||
        origin.includes("//localhost:30") ||
        origin.includes(".knatofs") ||
        origin.includes(".tornberg")
    );
  },
};

app.use(express.json());

app.use(express.static("./build"));

app.options("/api/*", cors());

app.get("/api/:gameId", cors(corsOptions), (req, res) => {
  const { gameId } = req.params;
  client.lrange(gameId, 0, 200, (err, data) => {
    if (err) res.sendStatus(400);
    else res.send(data.map(JSON.parse));
  });
});

const MINUTE = 1000 * 60;
const DAY = MINUTE * 60 * 12;

const diffUsers = [];

app.get("/api/start/:ts", cors(corsOptions), (req, res) => {
  const { ts } = req.params;
  const agent = req.headers["user-agent"];
  const diff = Date.now() - ts;
  if (Math.abs(diff > DAY)) res.sendStatus(400);
  else {
    res.json(diffUsers.push({ diff, agent }));
  }
});

const isValidTime = (a, b, diff) =>
  (a > b - diff && a < b + diff) || (b > a - diff && b < a + diff);

app.post("/api/:gameId", cors(corsOptions), (req, res) => {
  const { gameId } = req.params;
  const requestAgent = req.headers["user-agent"];
  const { hash, tsid } = req.headers;

  const user = diffUsers[tsid - 1];
  const { diff, agent } = user || {};
  if (
    user &&
    requestAgent === agent &&
    hashCode(JSON.stringify(req.body) + tsid) === Number(hash)
  ) {
    const now = Date.now() - diff;
    const { start, end, tt, ts, nick = "Unknown" } = req.body;

    const calculatedTs = end - start;

    const validTime =
      isValidTime(ts, now, 5000) && isValidTime(tt, calculatedTs, 5);

    client.lpush(
      gameId,
      JSON.stringify({
        ...req.body,
        nick: validTime ? nick : `Cheater ${nick}`,
      }),
      (d) => {
        res.json(d);
      }
    );
  } else {
    res.sendStatus(400);
  }
});

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
