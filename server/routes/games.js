const { request, response } = require("express");

const router = require("express").Router();

const bcrypt = require("bcryptjs");

module.exports = db => {

  // Register/Login Helper functions
  function getUserByEmail(email) {
    const queryString = `
  SELECT *
  FROM users
  WHERE email = $1
  `;
    return db.query(queryString, [email])
      .then(result => {
        return result.rows[0];
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  function getUserByUsername(username) {
    const queryString = `
  SELECT *
  FROM users
  WHERE user_name = $1
  `;
    return db.query(queryString, [username])
      .then(result => {
        return result.rows[0];
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  function registerUser(username, email, hashedPassword) {
    const queryString = `
  INSERT INTO users (user_name, password_hash, email)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
    const params = [username, hashedPassword, email];

    return db.query(queryString, params)
      .then(result => {
        return result.rows[0];
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  // Helper functions to calculate distance and score
  function calculateDistanceKm(questionLat, questionLon, answerLat, answerLon) {

    var R = 6371.0710;
    var rlat1 = questionLat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = answerLat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (answerLon - questionLon) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return Math.round(d);


    // const earthRadiusKm = 6371;
    // const radiansQuestionLat = questionLat * Math.PI / 180;
    // const radiansQuestionLon = questionLon * Math.PI / 180;
    // const radiansAnswerLat = answerLat * Math.PI / 180;
    // const radiansAnswerLon = answerLon * Math.PI / 180;

    // const dLon = radiansAnswerLon - radiansQuestionLon;
    // const dLat = radiansAnswerLat - radiansQuestionLat;
    // const a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(radiansQuestionLat) * Math.cos(radiansAnswerLat) + Math.pow(Math.sin(dLon / 2), 2);
    // const c = 2 * Math.asin(Math.sqrt(a));

    // console.log('Hello from radiansQuestionLat', radiansQuestionLat, 'Hello from radians questionLON', radiansQuestionLon, 'Hello from radians AnswerLat', radiansAnswerLat, 'Hello from radians AnswerLong', radiansAnswerLon, 'hello from DLON', dLon, 'hello from DLAT', dLat, 'Hello from a', a, 'Hello from c', c);

    //return Math.round(c * earthRadiusKm);
  }

  function calculateTurnScore(distanceKm) {
    const multiplier = 0.5;

    const roundScore = 5000 - (distanceKm * multiplier);

    if (roundScore < 0) {
      return 0;
    }

    return Math.round(roundScore);
  }

  // get user's games
  // curl http://localhost:8001/api/games/3
  router.get("/games/:user_id", (request, response) => {
    db.query(
      `
      SELECT
        * FROM games WHERE user_id = $1`,
      [request.params.user_id]
    ).then(({ rows }) => {
      response.json(rows);
    });
  });

  // ****************************************************
  // POST create new game
  // curl --request POST http://localhost:8001/api/games/3
  router.post("/games/:user_id", async (request, response) => {

    // get all questions id
    let { rows: questions } = await db.query(
      `SELECT id as question_id, latitude, longitude from questions;`
    );

    // choose 3 randon questions
    let selectedQuestions = [];
    for (let i = 0; i < 3; i++) {
      let n = Math.floor(Math.random() * questions.length);
      selectedQuestions.push(questions[n]);
      questions.splice(n, 1);
    }

    // insert game row to the db
    let { rows } = await db.query(
      `
      INSERT INTO games (user_id, start_time)
      VALUES ($1, NOW()) RETURNING *;`,
      [request.params.user_id]
    );
    let game = rows[0];
    game.turns = [];

    // insert turns into db
    for (let i = 0; i < selectedQuestions.length; i++) {
      let { rows } = await db.query(

        `INSERT INTO turns
      (user_id, game_id, question_id, turn_number, score)
         VALUES
      ($1, $2, $3, $4, null) RETURNING *;`,
        [game.user_id, game.id, selectedQuestions[i].question_id, i + 1]
      );
      rows[0].latitude = selectedQuestions[i].latitude;
      rows[0].longitude = selectedQuestions[i].longitude;
      delete rows[0].user_id;
      delete rows[0].game_id;

      game.turns.push(rows[0]);
    }
    console.log(game);

    // return game object
    response.json(game);
  });

  // ****************************************************
  // http://localhost:8001/api/register
  router.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    getUserByEmail(email).then(user => {
      if (user) {
        return res.json({ error: "Email exists", message: "An account with this email already exists!" });
      }
      getUserByUsername(username).then(user => {
        if (user) {
          return res.json({ error: "Username exists", message: "This username has already been taken!" });
        } else {
          const hashedPassword = bcrypt.hashSync(password, 10);
          registerUser(username, email, hashedPassword).then(user => {
            req.session.userEmail = user.email;
            return res.json({ error: null, message: "Success", user });
          })
            .catch(error => {
              console.log(error.message);
            });
        }
      });
    });
  });

  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    getUserByEmail(email).then(user => {
      if (!user || !bcrypt.compareSync(password, user.password_hash)) {
        return res.json({ error: "Failed login", message: "Incorrect email or password!" });
      } else {
        req.session.userEmail = user.email;
        return res.json({ error: null, message: "Success", user });
      }
    });
  });

  router.post("/authenticate", (req, res) => {
    if (req.session.userEmail) {
      getUserByEmail(req.session.userEmail).then(user => {
        return res.json({ error: null, message: "Success", user });
      });
    } else {
      return res.json({ error: "Failed authentication", message: "You do not have a cookie session!" });
    }
  });

  router.post("/logout", (req, res) => {
    if (req.session.userEmail) {
      req.session = null;
      res.json({ error: null, message: "Successfully logged out" });
    } else {
      res.json({ error: "Failed logout", message: "You are not logged in" });
    }
  });

  // ****************************************************
  // GET find user by email
  //
  // curl http://localhost:8001/api/users/email/kate@site.com
  router.get("/users/email/:email", (request, response) => {
    db.query(
      `
      SELECT
        * FROM users WHERE LOWER(email) = LOWER($1)`,
      [request.params.email]
    ).then(({ rows }) => {
      response.json(rows);
    });
  });

  // ****************************************************
  // GET find user by id
  //
  // curl http://localhost:8001/api/users/id/3
  router.get("/users/id/:user_id", (request, response) => {
    db.query(
      `
      SELECT
        * FROM users WHERE id = $1`,
      [request.params.user_id]
    ).then(({ rows }) => {
      response.json(rows[0]);
    });
  });



  // POST close turn by the player in the game
  router.post("/turns", (request, response) => {
    db.query(
      `
  INSERT INTO turns (user_id, game_id, question_id, turn_number, score)
  VALUES ($1, $2, $3, 1, $4) RETURNING *;`,
      [
        request.body.user_id,
        request.body.game_id,
        request.body.question_id,
        request.body.score
      ]
    ).then(({ rows }) => {
      response.json(rows[0]);
    });
  });

  // GET score for user
  // curl http://localhost:8001/api/users/score/103
  router.get("/users/:user_id/scores", (request, response) => {
    db.query(
      `
    SELECT SUM(score) as total FROM turns WHERE user_id = $1
    `,
      [request.params.user_id]
    ).then(({ rows }) => {
      console.log(rows);
      response.json({
        user_id: request.params.user_id,
        score: rows[0].total
      });
    });
  });


  // GET  global scores by user for leaderboard
  // curl http://localhost:8001/api/users/scores
  router.get("/users/scores", (request, response) => {
    db.query(
      `
    SELECT 
      user_id,
      (SELECT user_name FROM users WHERE users.id = user_id), 
      SUM(score) as total_for_game 
    FROM turns 
    GROUP BY game_id, user_id
    HAVING SUM(score) > 0
    ORDER BY user_id, SUM(score) desc`,
      []
    ).then(({ rows }) => {
      for (let i = rows.length - 1; i > 0; i--) {
        if (rows[i - 1].user_id === rows[i].user_id) {
          rows.splice(i, 1);
        }
      }
      rows.sort((a, b) => {
        return b.total_for_game - a.total_for_game;
      });
      response.json(rows);
    });
  });

  router.put("/calculate/:turn_id", (req, res) => {
    const { questionLat, questionLon, answerLat, answerLon } = req.body;
    console.log('Hello from req.body', req.body);

    const distanceKm = calculateDistanceKm(questionLat, questionLon, answerLat, answerLon);
    console.log(distanceKm);

    const score = calculateTurnScore(distanceKm);

    db.query(
      `
        UPDATE turns
        SET score = $1
        WHERE id = $2
        RETURNING score
      `, [score, req.params.turn_id]
    ).then(result => {
      return res.json({ score, distanceKm });
    });
  });

  //GROUP BY user_id
  return router;
};