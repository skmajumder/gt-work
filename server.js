const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8081;

// * CORS middleware configuration
const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.use(cors(corsConfig));
app.use(express.json());

// * MySQL DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_db",
});

// * Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// * A get request to get all users
app.get("/users", async function (req, res) {
  const query = "SELECT * FROM users";

  try {
    // * Execute the query asynchronously
    const results = await new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    // * Send the response to the client with status code 200
    res.status(200).json(results);
  } catch (err) {
    // * An error occurred
    console.error("Error executing query:", err);
    res
      .status(500)
      .send(
        "Internal Server Error. The server encountered an unexpected condition to fulfilling the request."
      );
  }
});

app.get("/", function (req, res, next) {
  res.json({ msg: "Express server running" });
});

app.listen(PORT, function () {
  console.log(`Node server listening on port ${PORT}`);
});
