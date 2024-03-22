// Requiring all the necessary dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const history	= require('connect-history-api-fallback');

// Importing modules
const { admin, db } = require('./util/admin');
const path = require('path');

// Initializing the express app
const app = express();

// Prevent CORS errors
app.use(cors());

// Priority to serve any static files
app.use(express.static(path.resolve(__dirname, '../frontend/build')));
app.use(express.static(path.resolve(__dirname, 'public')))
	.use(cors())
	.use(cookieParser())
	.use(
		history({
			verbose: true,
			rewrites: [
				{ from: /\/login/, to: '/login'}
			]
		})
	)
	.use(express.static(path.resolve(__dirname, '../frontend/build')));

// ROUTING *****************************************************************
// Home Page
app.get('/', (req, res) => {
	res.render(path.resolve(__dirname, '../frontend/build', 'index.html'));
});


// Running the app
app.listen(3000, function () {
	console.log('Listening on port 3000');
})