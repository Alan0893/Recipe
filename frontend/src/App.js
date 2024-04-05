// Importing all necessary dependencies & modules
import { useAuth } from './api/index';
import LoginScreen from "./pages/LoginScreen";
import Home from "./pages/Home";

const App = () => {
  // State to store the user
  const [user, setUser] = useAuth();
  
  return (
    user ? 
      <Home user={user} /> :
      <LoginScreen />
  )
}

export default App;