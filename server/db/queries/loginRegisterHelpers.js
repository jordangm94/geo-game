const db = require('../connection');

const getUserByEmail = email => {
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

const getUserByUsername = username => {
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

const registerUser = (username, email, hashedPassword) => {
  const queryString = `
  INSERT INTO users (user_name, password_hash, email)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  const params = [username, email, hashedPassword];

  return db.query(queryString, params)
    .then(result => {
      return result.rows[0];
    })
    .catch(error => {
      console.log(error.message);
    });
};

module.exports = { getUserByEmail, getUserByUsername, registerUser };
