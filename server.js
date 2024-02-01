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
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
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

// * A post request to submit the form data
app.post("/submit-form", async function (req, res) {
  const formData = req.body;

  // * Extract values from formData in the correct order
  const values = [
    formData.uploadDate,
    formData.location,
    formData.permitNo,
    formData.loto,
    formData.nameDesignation,
    formData.signature_filename,
    formData.permit_date,
    formData.permit_time,
    formData.workDescription,
    formData.safetyRequester,
    formData.hazards.join(", "), // * hazards is an array
    formData.ppe.join(", "), // * ppe is an array
    formData.permitIssuing,
    formData.permitIssuingSignature_filename,
    formData.permitValidity,
    formData.permitIssuingDate,
    formData.permitAccepting,
    formData.permitAcceptingSignature_filename,
    formData.permitTimeStart,
    formData.permitTimeEnd,
    formData.extendedPermitValidity,
    formData.extendedPermitDate,
    formData.extendedPermitTimeStart,
    formData.extendedPermitTimeEnd,
    formData.extendedPermitIssuing,
    formData.extendedPermitIssuingSignature_filename,
    formData.extendedPermitAccepting,
    formData.extendedPermitSignature_filename,
    formData.permitCloserName,
    formData.permitCloserSignature_filename,
    formData.permitClosingAccepting,
    formData.permitClosingAcceptingSignature_filename,
  ];

  // * SQL query to insert data into the 'form_data' table
  const sql = `
    INSERT INTO form_data (
      uploadDate, location, permitNo, loto, nameDesignation, signature_filename,
      permit_date, permit_time, workDescription, safetyRequester, hazards, ppe,
      permitIssuing, permitIssuingSignature_filename, permitValidity, permitIssuingDate,
      permitAccepting, permitAcceptingSignature_filename, permitTimeStart, permitTimeEnd,
      extendedPermitValidity, extendedPermitDate, extendedPermitTimeStart,
      extendedPermitTimeEnd, extendedPermitIssuing, extendedPermitIssuingSignature_filename,
      extendedPermitAccepting, extendedPermitSignature_filename, permitCloserName,
      permitCloserSignature_filename, permitClosingAccepting,
      permitClosingAcceptingSignature_filename
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?
    )
  `;

  try {
    // * Execute the query asynchronously
    const result = await new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    // * Send the response to the client with status code 200
    res.status(200).json({ success: true, insertId: result.insertId });
  } catch (err) {
    // * An error occurred
    console.error("Error executing query:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Add this endpoint after your existing routes
app.get("/report", async function (req, res) {
  const query = "SELECT * FROM form_data ORDER BY id DESC LIMIT 1";

  try {
    const result = await new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    res.status(200).json(result[0]);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", function (req, res, next) {
  res.json({ msg: "Express server running" });
});

app.listen(PORT, function () {
  console.log(`Node server listening on port ${PORT}`);
});
