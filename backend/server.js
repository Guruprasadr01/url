const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

const client = redis.createClient({
  url: process.env.REDIS_URL
});
client.connect();

const Url = mongoose.model("Url", {
  short: String,
  original: String
});

app.post("/shorten", async (req, res) => {
  const { short, original } = req.body;
  await Url.create({ short, original });
  res.send("Saved");
});

app.get("/", (req, res) => {
  res.send("URL Shortener API is running 🚀 ");
});

app.listen(3000, () => console.log("Server running"));
