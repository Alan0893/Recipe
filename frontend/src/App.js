// Importing all necessary dependencies & modules
import { useAuth } from './api/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import LoginScreen from "./pages/LoginScreen";
import Home from "./pages/Home";

import Pantry from "./components/Pantry";
import Recipes from "./components/Recipes";
import Shopping from "./components/ShoppingCart";

// Styling 
const Container = styled.div`
  height: 100%;
  min-height: 100vh;
`
const App = () => {
  // State to store the user
  const [user, setUser] = useAuth();
  
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={
            user ? 
              <Home user={user} /> :
              <LoginScreen />
          } />
          {
            user ? (
              <>
                <Route path='/pantry' element={<Pantry user={user} />} />
                <Route path='/recipes' element={<Recipes user={user} />} />
                <Route path='/cart' element={<Shopping user={user} />} />
              </>
            ) : (
              <Route path='/' element={<LoginScreen />} />
            )
          }
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App;
