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
    z-index: 1;
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


const Tab1 = styled(Link)`  
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

const Tab2 = styled.div`
    display: flex;
    background-color: lightpink;
    margin-top: 0;
    width: 33%;
    border-radius: 30px;
    z-index: 1;
    
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
    flex-direction: row; 
`;

const Title2 = styled.h1`
    font-family: geneva;
    color: white;
    letter-spacing: 5px;
    margin: auto;
`;  

const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

function Recipes() {
    return (
        <Container>
            <TabContainer>
                <Tab1 to='/pantry'><Title>Pantry</Title></Tab1>
                <Tab2><MainTitle>Recipes</MainTitle></Tab2>
                <Tab3 to='/cart'><Title>Shopping Cart</Title></Tab3>
            </TabContainer>
            <Body>
                <LeftContainer>
                <Title2>Recipe</Title2>
                <Input type="ingredient" placeholder="list ingredients and instruction"></Input>
                </LeftContainer>
                <RightContainer>
                <Title2>History</Title2>
                    <Input type="history" placeholder="previous recipes"></Input>
                </RightContainer>
            </Body>
        </Container>
   
    );
}   
export default Recipes;