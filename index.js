const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/usersDB')
	.then(() => {
		// --- SUCCESS ---
		// Only run the server AFTER the DB is connected
		console.log("✅ Connected To MongoDB.");

		// Setup routes
		app.use('/users', userRoutes);
		app.get('/', (request, response) => {
			response.send("Welcome To The System!");
		});

		// Start listening
		app.listen(port, () => {
			console.log(`🚀 Server works on: http://localhost:${port}`);
			console.log(`View users on: http://localhost:${port}/users`);
		});

	})
	.catch((error) => {
		// --- FAILURE ---
		console.error('❌ Error Connecting To MongoDB: ', error);
		console.log("Server will not start due to database connection error.");
	});