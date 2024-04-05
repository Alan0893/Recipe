// Importing all necessary dependencies & modules
import { useEffect, useState } from 'react';
import { useAuth } from './api/index';
import LoginScreen from "./pages/LoginScreen";
import axios from 'axios';
import MainPage from './pages/MainPage';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    height: 100vh;
    background-color: #fcd9d6;
`;

const Title = styled.h1`
    font-family: 'Rubik', sans-serif;
    color: white;
    font-size: 500%;
    margin: auto;  
    margin-top: 200px;
    text-transform: uppercase;
    letter-spacing: 10px;
`;

const Button = styled.button`
    font-family: Geneva;
    display: inline-block;
    background-color: #E9A3A2;
    color: white;
    border-radius: 40px;
    min-width: 160px;
    font-weight: 1000;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 25px;
    font-style: bold;
    text-align: center;
    width: 280px;
    height: 150px;
    border-color: #E9A3A2;
    line-height: 40px;
    position: absolute;
    margin-left: 800px;
	  margin-top: 350px;
    &:hover,
    &:focus {
        background-color: #f0cc76;
        border-color: #f0cc76;
        color: brown;
    }
`;

const Bread = styled.img` 
    width: 400px;
    height: auto;
    position: absolute;
    z-index: 0;
    top: 450px;
    left: 1470px;
    rotate: 10deg;
`;

const Strawberry = styled.img`
    width: auto;
    height: 400px;
    position: absolute;
    z-index: 0;
`;

const Bread2 = styled.img` 
    width: 320px;
    height: auto;
    position: absolute;
    z-index: 0;
    top: 340px;
    left: 1420px;
    rotate: -10deg;
`;

const Juice = styled.img` 
    width: 330px;
    height: auto;
    position: absolute;
    z-index: 0;
    left: 1500px;
    rotate: 10deg;
    top: 30px;
`;

const Cake = styled.img`
  width: 380px;
  height: auto;
  position: absolute;
  z-index: 0;
  top: 650px;
  left: 1350px;
  rotate: -10;
`;

const Toast = styled.img`
  width: auto;
  height: 300px;
  top: 740px;
  left: 200px;
  position: absolute;
  z-index: 0;
`;

const Drink = styled.img`
  width: 230px;
  height: auto;
  top: 400px;
  position: absolute;
  z-index: 0;
  rotate: 10deg;
  left: 100px;
`;

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
      <Container>
          <Title>Welcome, {user.displayName.split(' ')[0]}</Title>
          {/* go to main page on click */}
          <Button>Go to My Recipe</Button>  
          <Strawberry src={"/appPics/strawberry.png"} alt="food" />
          <Bread2 src={"/appPics/bread2.png"} alt="bread2"/>
          <Juice src={"/appPics/juice.png"} alt="juice"/>
          <Cake src={"/appPics/cake.png"} alt="cake"/>
          <Toast src={"/appPics/toast.png"} alt="toast"/>
          <Drink src={"/appPics/drink.png"} alt="milk"/>
      </Container>
          :<LoginScreen/>
  )
}

export default App;