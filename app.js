const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const path = require("path");

const dbPath = path.join(__dirname, "userDatabase.db");

let database = null;
const initializeDBAndServer = async () => {
  try {
    database = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(process.env.PORT || 3005, () => {
      console.log("server is running at http://localhost:3005");
    });
  } catch (e) {
    console.log(`SERVER ERROR ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/user/", async (request, response) => {
  const getQuery = `
    SELECT * FROM user;`;

  const result = await database.all(getQuery);
  response.send(result);
  response.status(400);
});

module.exports = app;
