import styled from "styled-components";
import { Link } from "react-router-dom"; 

const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
`;

const TabContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 8vh;
    margin-top: 1%;
    width: 100%;
`;
 const Input = styled.input`
    width: 50%;
    height: 20%;
    border-radius: 30px;
    border-color: #fae4e3;
    font-family: geneva;
    z-index: 0;
    margin-bottom: 20%;
    margin-left: 25%;
    background-color: #fae4e3;
    font-size: 200%;
    font-family: geneva;
    color: darkred;
    text-align: center;



`;

const MainTitle = styled.h1`
    font-family: geneva;
    color: white;
    text-transform: uppercase;
    letter-spacing: 5px;
    margin: auto;
`;

const Title = styled.h1`
    font-family: geneva;
    color: lightpink;
    text-transform: uppercase;
    letter-spacing: 5px;
    margin: auto;
    
    &:hover {
        color: white;
`;


const Tab1 = styled.div`
    display: flex;
    background-color: lightpink;
    margin-top: 0;
    width: 33%;
    border-radius: 30px;
    z-index: 1;
    
`;

const Tab2 = styled(Link)`
    display: flex;
    background-color: #fae4e3;
    margin-top: 0;
    width: 33%;
    border-radius: 30px;
    text-decoration: none;
    

    &:hover {
        background-color: lightpink;
        border-color: #f9cfcc;
        color: white;
        cursor: pointer;
    }
    
`;

const Tab3 = styled(Link)`
    display: flex;
    background-color: #fae4e3;
    margin-top: 0;
    width: 33%;
    border-radius: 30px;
    text-decoration: none;


    &:hover {
        background-color: lightpink;
        border-color: #f9cfcc;
        color: white;
        cursor: pointer;
    }
`;
const Body = styled.div`
    display: flex;
    height: 95vh;
    background-color: lightpink;
    flex-direction: column; 
`;

const Title2 = styled.h1`
    font-family: geneva;
    color: white;
    letter-spacing: 5px;
    margin: auto;
    z-index: 0;
`;  

const Recify = styled(Link)`
    font-family: geneva;
    border-radius: 20px;
    width: 20%;
    height: auto;
    margin-bottom: 30%; 
    z-index: 0;
    margin-bottom: 50px;
    margin-left: calc(50% - 10%);
    text-align: center;
    text-decoration: none;
    font-size: 200%;
    color: darkred;
  `;  

const Pantry = ({ user })  => {
    return (
        <Container>
            <TabContainer>
                <Tab1><MainTitle>Pantry</MainTitle></Tab1>
                <Tab2 to='/recipes'><Title>Recipes</Title></Tab2>
                <Tab3 to='/cart'><Title>Shopping Cart</Title></Tab3>
            </TabContainer>
            <Body>
                <Title2>{user.displayName.split(' ')[0]}'s Pantry</Title2>
                <Input type="ingredient" placeholder="list ingredients you have"></Input>
                <Recify to='/recipes'>Get Recipe</Recify>
            </Body>
        </Container>
   
    );
}   
export default Pantry;