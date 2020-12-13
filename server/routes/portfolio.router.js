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
  const queryText = `SELECT *, "portfolio".id FROM "portfolio" 
  LEFT JOIN "images" ON "portfolio".id = "images".portfolio_id
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
  VALUES ($1, $2, $3, $4) RETURNING id;`;

  const queryArray = [
    portfolioData.title,
    portfolioData.description,
    portfolioData.forsale,
    req.user.id,
  ];
  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.send(dbResponse.rows[0]);
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
  LEFT JOIN "images" ON "portfolio".id = "images".portfolio_id
  WHERE "portfolio".id = $1 AND "user_id" = $2;`;
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
  const queryImage = `DELETE FROM "images" WHERE "portfolio_id"=$1`;
  const queryGenre = `DELETE FROM "genre" WHERE "portfolio_id"=$1`;
  const queryRating = `DELETE FROM "rating" WHERE "portfolio_id"=$1`;
  const queryText = `DELETE FROM "portfolio" WHERE "id"=$1; `;
  const queryData = [req.params.id];
  const promiseImages = pool.query(queryImage, queryData);
  const promiseGenre = pool.query(queryGenre, queryData);
  const promiseRating = pool.query(queryRating, queryData);
  Promise.all([promiseImages, promiseGenre, promiseRating])
    .then((response) => {
      pool
        .query(queryText, queryData)
        .then((response) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

// POST for genre
router.post('/genre', rejectUnauthenticated, (req, res) => {
  const genreData = req.body;
  const queryText = `INSERT INTO "genre" ("portfolio_id", "genre_name")
  VALUES ($1, $2);`;

  pool
    .query(queryText, [genreData.portfolio_id, genreData.genre_name])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// POST for images
router.post('/images', rejectUnauthenticated, (req, res) => {
  const imagesData = req.body;
  const queryText = `INSERT INTO "images" ("alt", "url", "portfolio_id")
  VALUES ($1, $2, $3);`;

  pool
    .query(queryText, [imagesData.alt, imagesData.url, imagesData.portfolio_id])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
