const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require("dotenv")
dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: process.env.LOCALHOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL ' );
});

app.post('/submit', (req, res) => {
  const { username, codeLanguage, stdin, sourceCode } = req.body;

  const submission = {
    username,
    code_language: codeLanguage,
    stdin,
    source_code: sourceCode
  };

  connection.query('INSERT INTO submissions SET ?', submission, (err, result) => {
    if (err) throw err;
    console.log('Submission saved to database:', result.insertId);
    res.status(200).send('Submission successful!');
  });
});

app.get('/submissions', (req, res) => {
  connection.query('SELECT username, code_language, stdin, LEFT(source_code, 100) AS source_code_short, timestamp FROM submissions', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
