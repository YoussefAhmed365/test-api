const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

app.use(express.json());

let systemReady = false;

mongoose.connect('mongodb://127.0.0.1:27017/usersDB')
	.then(() => {
		console.log("Connected To MongoDB.");
		systemReady = true;
	})
	.catch((error) => {
		console.error('Error Connecting To MongoDB: ', error);
		systemReady = false;
	});

if (systemReady = true) {
	app.use('/users', userRoutes);

	app.get('/', (request, response) => {
		response.send("Welcome To The System!");
	});

	app.listen(port, () => {
		console.log(`Server works on: http://localhost:${port}`);
		console.log(`View users on: http://localhost:${port}/users`);
	});
} else {
	console.log("The server encounters a problem right now, Try again later.");
}