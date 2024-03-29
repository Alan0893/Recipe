//Login Page after demo

// Importing all the necessary dependencies & modules
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import config from '../firebase/config';

import styled from 'styled-components';

// Initalize Firebase
const admin = initializeApp(config);

const Container = styled.div`
    background-color:  #FEE3E2 ; 
    width: 100%;
    min-width: 100vw;
    height: 100%;
    min-height: 100vh;
    display: flex;
`;
const Title = styled.h1`
    font-family: Geneva; 
    color: #E9A3A0; 
    font-size: 250%; 
`;

const SubTitle1 = styled.h1`
    font-family: Geneva;
    color: #A3C14B; 
    font-size: 500%;
    margin-bottom: 0px;
    letter-spacing: 10px; 
    font-weight: 150; 
`;

const SubTitle2 = styled.h1`
    font-family: Geneva;
    color: #A3C14B; 
    font-size: 500%;
    letter-spacing: 10px; 
    font-weight: 150; 
`;
const SubDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    margin-top: 100px;
`;

const LoginButton = styled.button`
    background-color: #E9A3A3; 
    border-radius: 20px;
    font-family: Geneva;
    border-color: #E9A3A3;
    width: 200px;
    height: 120px;
    font-size: 20px;
    color: #FFE1E1;
    font-weight: bold;
    letter-spacing: 2px;
    margin-left: 150px; 
    margin-top: 50px;
    font-weight: 150; 

    &:hover,
    &:focus {
      background-color: #d38685;
    }
    
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%; 
    height: auto; 
`;

const Image1 = styled.img`
    width: 500px;
    height: auto;
    position: absolute;
    transform: rotate(-10deg);
    margin-top: 20%;
`;

const Image2 = styled.img`
    width: 500px;
    height: auto;
    position: absolute;
    top: 5%;
`;

const Image3 = styled.img`
    width: 800px;
    height: auto;
    position: absolute;
    top: 40%;
    transform: translate(10%, -10%); 
`;
const Icon = styled.img`
	align-self: center;
	margin-right: 10px;
	width: 25px;
	height: 25px;
	display: inline-block;
	vertical-align: middle;
`;

export default function LoginPage() {
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
        <Container>
            <SubDiv>
                <Title>Munchy Minion</Title>
                <SubTitle1>HUNGRY?</SubTitle1>
                <SubTitle2><span>WE GOT YOU</span></SubTitle2>
                <LoginButton onClick={handleLogin}>
					<Icon src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1280px-Google_%22G%22_logo.svg.png" alt="Google Logo" />
					Login with Google
				</LoginButton>
                <Image1 src="leaf.png" alt="leaf" />
            </SubDiv>
               

        </Container>
    )
}


