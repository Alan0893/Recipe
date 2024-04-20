# Backend

# Installing
- Make sure all necessary dependencies are installed 
```shell
cd backend
npm install
```

## Starting the Server
- In order to start the backend, first start the frontend:
```shell
cd frontend
npm start
```
- Once the frontend has been started
```shell
cd backend
node index
```
- You should see the following message in the console:
```
Listening on port 3000
```

## Build
- The backend utilizes the build folder of the frontend for rendering and routing. Everytime the frontend is updated, run the following:
```shell
cd frontend
npm run build
```

## Endpoints
The backend utilizes NodeJS and ExpressJS. In order to access the backend, the package `axios` is utilized in the frontend client side to fetch from the backend server side. 
```javascript
import axios from 'axios'
``` 
or
```javascript
const axios = require ('axios')
```
- Database : Initialize Firebase for user
```javascript
await axios.get(`/initialize/:userId`, {
	params: {
		displayName: user.displayName,
		uid: user.uid,
		email: user.email
	}
});
```
- Database : Get all recipes for user
```javascript
await axios.get(`/recipes/:userId`)
```
- Database : Get a single recipe from the user
```javascript
await axios.get(`/recipes/:userId/:recipeId`)
```
- Database : Add a recipe for the user
```javascript
await axios.post(`/recipes/:userId`, {
	name: recipeName,
	ingredients: recipeIngredients,
	instructions: recipeInstructions
	shopping: shoppingList
	image: image
});
```

- Spoonacular API : search and get a recipe given ingredients
```javascript
await axios.get('/search', {
	params: {
		ingredients: 'ingredient1, ingredient2, ...'
	}
});
```

- Target API : get the ingredient from target
```javascript
await axios.get(`/target`, {
	params: {
		ingredient: 'ingredient1'
	}
});
```