
const knex = require('knex');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const { authenticate } = require('../auth/authenticate');


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const userInfo = req.body;

  const hash = bcrypt.hashSync(userInfo.password, 12);

  userInfo.password = hash;

  db('users')
		.insert(userInfo)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => res.status(500).json(err));

}

function generateToken(user) {
  const payload = {
		username: user.username
	};

	const secret = process.env.JWT_SECRET;

	const options = {
		expiresIn: '45m',
	};

	return jwt.sign(payload, secret, options);
}

function login(req, res) {
  // implement user login
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        
        res.status(200).json({ message: `Welcome ${user.username}`, token });
        
      } else {
        res.status(401).json({ message: 'Access not authorized. Incorrect username or password.' });
      };
    })
    .catch(err => res.status(500).json(err));
};

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
