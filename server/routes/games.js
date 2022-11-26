const router = require("express").Router();

module.exports = db => {
  router.get("/games", (request, response) => {
    db.query(
      `
      SELECT
        * FROM games
    `
    ).then(({ rows: games }) => {
      response.json(games);
    });
  });

  return router;
};
