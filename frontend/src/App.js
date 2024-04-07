
// Importing all necessary dependencies & modules
import { useAuth } from './api/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginScreen from "./pages/LoginScreen";
import Home from "./pages/Home";
import Main from "./pages/MainPage";
import Pantry from "./pages/Pantry";
import Recipes from "./pages/Recipes";
import Cart from "./pages/ShoppingCart";

import styled from 'styled-components';

const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`

const App = () => {
  // State to store the user
  const [user, setUser] = useAuth();
  
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={
            user ? 
              <Home user={user} /> :
              <LoginScreen />
          } />
          <Route path='/main' element={<Main />} />
          <Route path='/pantry' element={ 
            user ?
              <Pantry user={user} />:
              <LoginScreen />
            } />
          <Route path='/recipes' element={<Recipes/>} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  )
}

export default App;
