const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/portfolio', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "portfolio" 
  WHERE "user_id" = $1;`;

  pool
    .query(queryText, [req.user.id])
    .then((dbResponse) => {
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
router.post('/portfolio', rejectUnauthenticated, (req, res) => {
  // POST route code here
  const portfolioData = req.body;
  const queryText = `INSERT INTO "portfolio" ("title", "description", "forsale", "user_id")
  VALUES ($1, $2, $3, $4);`;

  const queryArray = [
    portfolioData.title,
    portfolioData.description,
    portfolioData.forsale,
    req.user.id,
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

// GET
router.get('/portfolio/details/:id', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "portfolio"
  WHERE "id" = $1 AND "user_id" = $2;`;
  pool
    .query(queryText, [req.params.id, req.user.id])
    .then((dbResponse) => {
      console.log(dbResponse);
      res.send(dbResponse.rows[0]);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// PUT to update all information
router.put('/update/:id', rejectUnauthenticated, (req, res) => {
  const newPortfolio = req.body;
  const queryText = `UPDATE "portfolio" SET title=$1, description=$2, forsale=$3 WHERE id=$4 ;`;

  pool
    .query(queryText, [
      newPortfolio.title,
      newPortfolio.description,
      newPortfolio.forsale,
      req.params.id,
    ])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//DELETE
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "portfolio" WHERE "id"=$1; `;
  const queryData = [req.params.id];

  pool
    .query(queryText, queryData)
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
