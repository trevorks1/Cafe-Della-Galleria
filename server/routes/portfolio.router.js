const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/portfolio', (req, res) => {
  // GET route code here
  const queryText = 'SELECT * FROM "portfolio";';

  pool
    .query(queryText)
    .then((dpResponse) => {
      console.log(dbResponse);
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/portfolio', (req, res) => {
  // POST route code here
  const portfolioData = req.body;
  const queryText = `INSERT INTO "portfolio" ("title", "description", "forsale")
  VALUES ($1, $2, $3);`;

  const queryArray = [
    portfolioData.title,
    portfolioData.description,
    portfolioData.forsale,
  ];
  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
