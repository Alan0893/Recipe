// Requiring all the necessary dependencies
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Importing modules
const { db } = require('./util/admin');
const { doc, getDoc } =  require('firebase/firestore');

// Initializing the express app
const app = express();

// Prevent CORS errors
app.use(cors());

// Function to generate a random string for the id
const generateId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Priority to serve any static files
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

// ROUTING *****************************************************************
// Home Page
app.get('/', (req, res) => {
	res.render(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

// DATABASE ****************************************************************
// Initialize Firebase for user
app.get('/initialize/:userId', async (req, res) => {
	try {
		const userId = req.params.userId;

		// Check the users collection
		const userDocRef = doc(db, 'users', userId);
		const userDocSnapshot = await getDoc(userDocRef);

		// If the user does not exist, create a new user
		if (!userDocSnapshot.exists()) {
			await setDoc(userDocRef, {
				name: user.displayName,
				uid: user.uid,
				email: user.email,
				recipes: {}
			});
		}
		return res.status(200).json({ message: 'User initialized' });
	} catch (error) {
		console.error('Error initializing user: ', error);
		return res.status(500).json({ error: error.message });
	}
});
// Getting a single recipe 
app.get('/recipes/:userId/:recipeId', async (req, res) => {
	try {
		const userId = req.params.userId;
		const recipeId = req.params.recipeId;

		// Check if userId and recipeId are provided
		if (!userId || !recipeId) {
			return res.status(400).json({ error: 'User ID or Recipe ID not provided' });
		}

		// Fetch user document
		const userDocRef = doc(db, 'users', userId);
		const userDocSnapshot = await getDoc(userDocRef);

		if (!userDocSnapshot.exists()) {
			return res.status(404).json({ error: 'User not found' });
		}

		const userData = userDocSnapshot.data();
		const recipes = userData.recipes || {};

		if (!recipes[recipeId]) {
			return res.status(404).json({ error: 'Recipe not found' });
		}

		return res.status(200).json({ recipe: recipes[recipeId] });
	} catch (error) {
		console.error('Error fetching recipe: ', error);
		return res.status(500).json({ error: error.message });
	}
});
// Get all recipes
app.get('/recipes/:userId', async (req, res) => {
	try {
		const userId = req.params.userId;

		// Check if userId is provided
		if (!userId) {
			return res.status(400).json({ error: 'User ID not provided' });
		}

		// Fetch user document
		const userDocRef = doc(db, 'users', userId);
		const userDocSnapshot = await getDoc(userDocRef);

		if (!userDocSnapshot.exists()) {
			return res.status(404).json({ error: 'User not found' });
		}

		const userData = userDocSnapshot.data();
		const recipes = userData.recipes || {};

		return res.status(200).json({ recipes });
	} catch (error) {
		console.error('Error fetching recipes: ', error);
		return res.status(500).json({ error: error.message });
	}
});
// Add a recipe for the user
app.post('/recipes/:userId', async (req, res) => {
	try {
		const userId = req.params.userId;
		const { name, ingredients, instructions } = req.body;
		
		// Check if required fields are provided
		if (!userId || !name || !ingredients || !instructions) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		// Generate a unique ID for the recipe
		const recipeId = generateId();

		// Fetch user document
		const userDocRef = doc(db, 'users', userId);
		const userDocSnapshot = await getDoc(userDocRef);

		if (!userDocSnapshot.exists()) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Add the recipe to the user's document
		await updateDoc(userDocRef, {
			[`recipes.${recipeId}`]: {
				name,
				ingredients,
				instructions
			}
		});

		return res.status(200).json({ message: 'Recipe added successfully' });
 	} catch (error) {
		console.error('Error adding recipe: ', error);
		return res.status(500).json({ error: error.message });
	}
});
// Delete a recipe for the user
app.delete('/recipes/:userId/:recipeId', async (req, res) => {
	try {
		const userId = req.params.userId;
		const recipeId = req.params.recipeId;

		// Check if userId and recipeId are provided
		if (!userId || !recipeId) {
			return res.status(400).json({ error: 'User ID or Recipe ID not provided' });
		}

		// Fetch user document
		const userDocRef = doc(db, 'users', userId);
		const userDocSnapshot = await getDoc(userDocRef);

		if (!userDocSnapshot.exists()) {
			return res.status(404).json({ error: 'User not found' });
		}

		const userData = userDocSnapshot.data();
		const recipes = userData.recipes || {};

		if (!recipes[recipeId]) {
			return res.status(404).json({ error: 'Recipe not found' });
		}

		// Delete the recipe from the user's document
		delete recipes[recipeId];
		await updateDoc(userDocRef, {
			recipes
		});

		return res.status(200).json({ message: 'Recipe deleted successfully' });
	} catch (error) {
		console.error('Error deleting recipe: ', error);
		return res.status(500).json({ error: error.message });
	}
});

// SPOONACULAR API ****************************************************************
app.get('/search', async (req, res) => {
	try {
		const ingredients = req.query.ingredients;

		const recipes = await axios.get(
			`https://api.spoonacular.com/recipes/findByIngredients?ingredients=
			${ingredients}&apiKey=${process.env.SPOONACULAR_API_KEY}`
		);
		const recipe = recipes.data[0];
		const recipeId = recipe.id;

		const info = await axios.get(
			`https://api.spoonacular.com/recipes/${recipeId}/information?
			apiKey=${process.env.SPOONACULAR_API_KEY}`
		);
		
		const combinedRes = {
			recipe: recipe,
			info: info.data
		};
		
		return res.status(200).json({ recipe: combinedRes });
	} catch (error) {
		console.error('Error fetching data from Spoonacular: ', error);
		return res.status(500).json({ error: error.message });
	}
});

// TARGET API ****************************************************************
app.get('/target', async (req, res) => {
	const ingredient = req.query.ingredient;

	try {
		const response = await axios.get(
			`https://api.redcircleapi.com/request?
			api_key=${process.env.TARGET_API_KEY}&
			type=search&search_term=${ingredient}&
			category_id=5xt1a&sort_by=best_seller`
		);

		return res.status(200).json({ response: response.data[0] });
	} catch (error) {
		console.error('Error fetching data from Target: ', error);
		return res.status(500).json({ error: error.message });
	}
});

// Running the app
app.listen(3000, function () {
	console.log('Listening on port 3000');
})