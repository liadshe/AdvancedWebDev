const express = require("express");
const app = express();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!......");
});

app.get("/movie", (req, res) => {
  res.send("movie get...123...");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
