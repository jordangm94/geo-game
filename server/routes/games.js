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

  // POST create new game
  // curl --request POST http://localhost:8001/api/games/3
  router.post("/games/:user_id", (request, response) => {
    db.query(
      `
      INSERT INTO games (user_id, start_time)
      VALUES ($1, NOW()) RETURNING *;`,
      [request.params.user_id]
    ).then(({ rows }) => {
      response.json(rows[0]);
    });
  });

  // ****************************************************
  // // GET all turns by game_id
  // router.get("/turns/:game_id", (request, response) => {
  //   db.query(
  //     `
  //     SELECT
  //       * FROM turns WHERE game_id = $1`,
  //     [request.params.game_id]
  //   ).then(({ rows: games }) => {
  //     response.json(games);
  //   });
  // });



  // ****************************************************
  // HTTP POST /api/register create new user
  // Body:
  // {
  //    user_name: "Kate",
  //    password_hash: "09sduf01234ib3n3",
  //    email: "kate@site.com"
  // }
  // 
  // To test:
  // curl --header "Content-Type: application/json" \
  // --request POST \
  // --data '{ "user_name": "Kate", "password_hash": "09sduf01234ib3n3", "email": "kate@site.com" }' \
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
            req.session.user_id = user.id;
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
        req.session.user_id = user.id;
        return res.json({ error: null, message: "Success", user });
      }
    });
  });

  router.get("/authenticate", (req, res) => {
    if (req.session.user_id) {
      res.json({ loggedIn: true, user: req.session.user_id });
    } else {
      res.json({ loggedIn: false });
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
  // curl http://localhost:8001/api/users/score/3
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


  // GET  http://localhost:8001/api/scores - global scores by user
  // curl http://localhost:8001/api/users/scores
  router.get("/users/scores", (request, response) => {
    db.query(
      `
    SELECT 
      user_id,
      (SELECT user_name FROM users WHERE users.id = user_id), 
      SUM(score) as total 
    FROM turns 
    GROUP BY user_id
    HAVING SUM(score) > 0`,
      []
    ).then(({ rows }) => {
      response.json(rows);
    });
  });

  return router;
};
