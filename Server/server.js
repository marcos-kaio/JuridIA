import express from "express";
import mysql from "mysql";
import 'dotenv/config';

const app = express();
app.use(express.json());

const port = 8081;

const db = mysql.createConnection({
  // incluir DB config
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
