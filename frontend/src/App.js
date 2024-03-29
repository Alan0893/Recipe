// Importing all necessary dependencies & modules
import { useEffect, useState } from 'react';
import { useAuth } from './api/index';
import LoginScreen from "./pages/LoginScreen";
import axios from 'axios';
import LoginPage from './pages/LoginPage';

const App = () => {
  // State to store the user
  const [user, setUser] = useAuth();
  const [recipes, setRecipes] = useState(null);

  useEffect(() =>{
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`/recipes/${user.uid}`);
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error('Error fetching recipes: ', error);
      }
    }
    if (user) {
      fetchRecipes();
    }
  }, [user])

  console.log(recipes)
  
  return (
    user ? 
      <div>Welcome, {user.displayName}</div> 
      : <LoginScreen />
  )
}

export default App;