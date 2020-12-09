const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

// GET for details
router.get('/portfolio/details/:id', (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "portfolio"
  WHERE "id" = $1;`;
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

// PUT for updating ratings

module.exports = router;
