const express = require("express");
const app = express();
const cors = require("cors");
const models = require("./models");

app.use(cors());
app.use(express.json());

app.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await models.User.findAll();
    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/leaderboard", async (req, res) => {
  const { name, ending, score } = req.body;

  await models.User.create({
    name: name,
    ending: ending,
    score: score,
  });
  const leaderboard = await models.User.findAll();

  res.json(leaderboard);
});

app.listen(8080, () => {
  console.log("Server is running....");
});
