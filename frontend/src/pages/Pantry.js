import styled from "styled-components";
import { Link } from "react-router-dom";

import axios from 'axios';
import { useState, useRef } from "react";

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
    flex-direction: column; 
`;
const Header = styled.h1`
    font-family: geneva;
    color: white;
    letter-spacing: 5px;
    margin: auto;
    z-index: 0;
`;  
const Input = styled.input`
    width: 50%;
    height: 20%;
    border-radius: 30px;
    border-color: #fae4e3;
    font-family: Geneva;
    z-index: 0;
    margin-bottom: 20%;
    margin-left: 25%;
    background-color: #fae4e3;
    font-size: 200%;
    color: darkred;
    text-align: center;
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
    const [recipes, setRecipes] = useState([]);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const fetchRecipes = async () => {
        try {
            const ingredients = inputRef.current.value;
            const spoonRes = await axios.get(`/search?ingredients=${ingredients}`);
            const targetRes = await axios.get(`/target?ingredient=${ingredients}`);

            setRecipes({ spoonacular: spoonRes.data, target: targetRes.data });
        } catch (error) {
            console.error('Error fetching recipes: ', error);
        }
    }

    return (
        <Container>
            <TabContainer>
                <MainTab><MainTitle>Pantry</MainTitle></MainTab>
                <Tabs to='/recipes'><Title>Recipes</Title></Tabs>
                <Tabs to='/cart'><Title>Shopping Cart</Title></Tabs>
            </TabContainer>
            
            <Body>
                <Header>{user.displayName.split(' ')[0]}'s Pantry</Header>
                <Input ref={inputRef} type="ingredient" placeholder="list ingredients you have"></Input>
                <Recify to='/recipes' onClick={fetchRecipes}>Get Recipe</Recify>
            </Body>
        </Container>
   
    );
}   
export default Pantry;
