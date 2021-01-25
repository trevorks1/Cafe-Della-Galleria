const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/portfolio/gallery', (req, res) => {
  // GET route code here
  const queryText = `SELECT *, "portfolio".id FROM "portfolio" 
  LEFT JOIN "genre" ON "portfolio".id = "genre".portfolio_id
  LEFT JOIN "rating" ON "portfolio".id = "rating".portfolio_id
  LEFT JOIN "images" ON "portfolio".id = "images".portfolio_id;`;

  pool
    .query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// GET for details
router.get('/portfolio/details/:id', (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "portfolio"
  LEFT JOIN "images" ON "portfolio".id = "images".portfolio_id
  WHERE "portfolio".id = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((dbResponse) => {
      console.log(dbResponse);
      res.send(dbResponse.rows[0]);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// POST for updating ratings
router.post('/rating', (req, res) => {
  const ratingData = req.body;
  const queryText = `INSERT INTO "rating" ("portfolio_id", "star_rating", "date")
  VALUES ($1, $2, $3);`;

  pool
    .query(queryText, [
      ratingData.portfolio_id,
      ratingData.star_rating,
      ratingData.date,
    ])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
