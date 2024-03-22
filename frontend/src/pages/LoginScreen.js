// Importing all the necessary dependencies & modules
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import config from '../firebase/config';

import styled from 'styled-components';

// Initalize Firebase
const admin = initializeApp(config);

// Setting the styles of the page
const LoginContainer = styled.div`
	height: 100%;
	min-height: 100vh;
	background-color: #000000;
`;
const Login = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const LoginButton = styled.button`
	display: inline-block;
	background-color: #4285f4;
	color: #ffffff;
	border-radius: 30px;
	padding: 17px 35px;
	margin: 20px 0 70px;
	min-width: 160px;
	font-weight: 700;
	letter-spacing: 2px;
	text-transform: uppercase;
	text-align: center;
`;

const LoginScreen = () => {
	// Function to handle login
  const handleLogin = () => {
    // Getting the parameters
    const auth = getAuth(admin);
    const provider =  new GoogleAuthProvider();

    // Signing in with Google
    signInWithPopup(auth, provider)
      .then((result) => {
        // Google Access Token
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info
        const user = result.user;
        console.log(user);
        // getAdditionalUserInfo(result)
      }).catch((error) => {
        // Handle Errors
        const errorCode = error.code;
        const errorMessage = error.message;
        // Email of the user's account used
        const email = error.email;
        // The AuthCredential type that was used
        const credential = GoogleAuthProvider.credentialFromError(error);
        // Loggging the error
        console.error(errorCode, errorMessage, email, credential);
      });
  }

	

	return (
		<LoginContainer>
			<Login>
				<h1>Google Login</h1>
				<LoginButton onClick={handleLogin}>Login with Google</LoginButton>
			</Login>
		</LoginContainer>
	)
}

export default LoginScreen;