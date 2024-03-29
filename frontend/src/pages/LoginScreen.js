// Importing all the necessary dependencies & modules
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import config from '../firebase/config';

import styled from 'styled-components';

// Initalize Firebase
const admin = initializeApp(config);

// Setting the styles of the page
const LoginContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	min-height: 100vh;
	background-color: #FFE3E2;
`;
const Login = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100%;
`;
const Title = styled.h2`
	color: #E8A4A5;
`;
const Desc = styled.h1`
	color: #A2C14A;
	text-transform: uppercase;
`;
const LoginButton = styled.a`
	display: inline-block;
	background-color: #E9A3A2;
	color: #FFE3E2;
	border-radius: 30px;
	padding: 17px 35px;
	margin: 20px 0 70px;
	min-width: 160px;
	font-weight: 700;
	letter-spacing: 2px;
	text-transform: uppercase;
	text-align: center;
	&:hover,
  &:focus {
    background-color: #d38685;
  }
`;
const Icon = styled.img`
	align-self: center;
	margin-right: 10px;
	width: 25px;
	height: 25px;
	display: inline-block;
	vertical-align: middle;
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
				<Title>Munchy Minion</Title>
				<Desc>Hungry? We got you!</Desc>
				<LoginButton onClick={handleLogin}>
					<Icon src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1280px-Google_%22G%22_logo.svg.png" alt="Google Logo" />
					Login with Google
				</LoginButton>
			</Login>
		</LoginContainer>
	)
}

export default LoginScreen;