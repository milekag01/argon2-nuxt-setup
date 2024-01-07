// server-middleware.js
const express = require("express");
const argon2 = require("argon2-browser");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/hash-password", async (req, res) => {
  console.log("hash-password: ", {
    body: req.body,
  });
  try {
    const { password, salt } = req.body;
    const hash = await argon2.hash({ pass: password, salt: salt });
    res.json({ hash: hash.encoded });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/verify-password", async (req, res) => {
  console.log("verify-password");
  res.json({ verify: "verify" });
});

module.exports = app;
