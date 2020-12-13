const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/artist', (req, res) => {
  // POST route code here
  const queryText = `SELECT * FROM "user" WHERE "id"=$1;`;

  pool.query(queryText, [req.body.user_id]).then((dbResponse) => {
    const artist = dbResponse.rows[0];
    if (artist == null) {
      res.sendStatus(500);
      return;
    }

    const transportConfig = {
      service: 'gmail',
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_EMAIL_PASS,
      },
    };
    let transporter = nodemailer.createTransport(transportConfig);

    const mailOptions = {
      from: req.body.email, // sender address
      to: artist.email, // list of receivers
      subject: req.body.subject, // Subject line
      html: `<div>
    ${req.body.message}
              </div>`, // plain text body
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err != null) {
        res.sendStatus(500);
        return;
      }

      res.sendStatus(201);
    });
  });
});

/**
 * POST route template
 */
router.post('/admin', (req, res) => {
  // POST route code here
  const transportConfig = {
    service: 'gmail',
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_EMAIL_PASS,
    },
  };
  let transporter = nodemailer.createTransport(transportConfig);
  const mailOptions = {
    from: req.body.email, // sender address
    to: process.env.MAILER_ADMIN, // list of receivers
    subject: req.body.subject, // Subject line
    html: `<div>
${req.body.message}
          </div>`, // plain text body
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err != null) {
      res.sendStatus(500);
      return;
    }
    res.sendStatus(201);
  });
});

module.exports = router;
