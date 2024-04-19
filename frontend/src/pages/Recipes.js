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
    width: 100%;
`;
const MainTab = styled.div`
    display: flex;
    background-color: lightpink;
    margin-top: 0;
    width: 33%;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    z-index: 1;  
`;
const MainTitle = styled.h1`
    font-family: Geneva;
    color: white;
    text-transform: uppercase;
    letter-spacing: 5px;
    margin: auto;
`;
const Tabs = styled(Link)`
    display: flex;
    background-color: #fae4e3;
    margin-top: 0;
    width: 33%;
    z-index: 1;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    text-decoration: none;
    color: lightpink;
    &:hover {
        background-color: lightpink;
        border-color: #f9cfcc;
        color: white; 
        cursor: pointer;
    }
    &:hover h1 {
        color: white;
    }
`;
const Title = styled.h1`
    font-family: Geneva;
    color: lightpink;
    text-transform: uppercase;
    letter-spacing: 5px;
    margin: auto;
`;

const Body = styled.div`
    display: flex;
    height: 95vh;
    background-color: lightpink;
    flex-direction: row; 
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
const Header = styled.h1`
    font-family: Geneva;
    color: white;
    letter-spacing: 5px;
    margin: auto;
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

function Recipes() {
    return (
        <Container>
            <TabContainer>
                <Tabs to='/pantry'><Title>Pantry</Title></Tabs>
                <MainTab><MainTitle>Recipes</MainTitle></MainTab>
                <Tabs to='/cart'><Title>Shopping Cart</Title></Tabs>
            </TabContainer>

            <Body>
                <LeftContainer>
                    <Header>Recipe</Header>
                    <Input type="ingredient" placeholder="list ingredients and instruction"></Input>
                </LeftContainer>
                <RightContainer>
                    <Header>History</Header>
                    <Input type="history" placeholder="previous recipes"></Input>
                </RightContainer>
            </Body>
        </Container>
   
    );
}   
export default Recipes;