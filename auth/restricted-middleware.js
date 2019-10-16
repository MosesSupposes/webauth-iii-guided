const bcrypt = require('bcryptjs');

// const Users = require('../users/users-model.js');
const secrets = require('../config/secrets')


module.exports = (req, res, next) => {
  // const { username, password } = req.headers;

  // if (username && password) {
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: 'Invalid Credentials' });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({ message: 'Ran into an unexpected error' });
  //     });
  // } else {
  //   res.status(400).json({ message: 'No credentials provided' });
  // }

  const token = req.headers.authorization

  if (token) {
    // check that the token is valid
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // the token was tampered with, or has expired
        res.status(401).json({ error: { message: 'Bad token.' } })
      } else {
        // token is good
        req.username = decodedToken.username
        next()
      }
    })
  } else {
    res.status(400).json({ error : { message: 'No token provided' } })
  }
};
