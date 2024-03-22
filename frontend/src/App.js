// Importing all necessary dependencies & modules
import { useEffect, useState } from 'react';
import { useAuth } from './api/index';
import LoginScreen from "./pages/LoginScreen";

const App = () => {
  // State to store the user
  const [user, setUser] = useAuth();
  
  return (
    user ? 
      <div>Welcome, {user.displayName}</div> 
      : <LoginScreen />
  )
}

export default App;