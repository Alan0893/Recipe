// Importing all the necessary dependencies & modules
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import config from '../firebase/config';
import axios from 'axios';

import styled from 'styled-components';

// Initalize Firebase
const admin = initializeApp(config);

// Setting the styles of the page
const LoginContainer = styled.div`
	box-sizing: border-box;
	display: flex;
	height: 100vh;
	min-height: 100vh;
	background-color: #FFE3E2;
	border-bottom: 35px solid #FED763;
	overflow: hidden;
`;
const Login = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	margin-left: 70px; 
	margin-top: 100px;	
`;
const Title = styled.h2`
	font-family: Geneva; 
	color: #E9A3A0; 
	font-size: 2em; 
`;
const Desc = styled.h1`
	font-family: Geneva;
	color: #A3C14B; 
	font-size: 6em;
	margin-bottom: 0px;
	letter-spacing: 3px; 
	font-weight: 150; 
	text-transform: uppercase;
	margin-top: -40px; 
`;
const ButtonDiv = styled.div`
	margin-left: 250px;
	top: 50%;
	z-index: 1;
`;
const LoginButton = styled.button`
	font-family: Geneva;
	display: inline-block;
	background-color: #E9A3A2;
	color: #FFE3E2;
	border-radius: 40px;
	min-width: 160px;
	font-weight: 1000;
	letter-spacing: 2px;
	text-transform: uppercase;
	font-size: 125%; 
	font-style: bold;
	text-align: center;
	width: 60%;
  height: 160%;
	border-color: #E9A3A2; 
	line-height: 40px;
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
const Image1 = styled.img`
	width: 30%;
	height: auto;
	position: absolute;
	transform: rotate(-10deg);
	bottom: 5%;
	left: 0%;
	z-index: 0;
`;
const Image2 = styled.img`
	width: 40%;
	height: auto;
	position: absolute;
	top: 0;
	right: 0;
`;
const Image3 = styled.img`
	width: 45%;
	height: auto;
	position: absolute;
	bottom: 0%;
	right: 10%;
  transform: translate(10%, -10%); 
`;

const LoginScreen = () => {
	// Function to handle login
  const handleLogin = () => {
    // Getting the parameters
    const auth = getAuth(admin);
    const provider =  new GoogleAuthProvider();

    // Signing in with Google
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // Google Access Token
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info
        const user = result.user;
				// Initialize the user, if user does not exist
				await axios.get(`/initialize/${user.uid}`);
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
				<Desc>Hungry?</Desc>
				<Desc> We got you</Desc>
				<ButtonDiv>
					<LoginButton onClick={handleLogin}>
						<Icon src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1280px-Google_%22G%22_logo.svg.png" alt="Google Logo" />
						Login with Google
					</LoginButton>
				</ButtonDiv>
			</Login>
			<Image1 src="/LoginPics/leaf.png" alt="Image1" />
			<Image2 src="/LoginPics/leaf2.png" alt="Image2" />
			<Image3 src="/LoginPics/food.png" alt="Image3" />
		</LoginContainer>
	)
}

export default LoginScreen;