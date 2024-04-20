import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
    font-family: Geneva;
    color: white;
    letter-spacing: 5px;
    align-self: center;
    margin-top: 5%;
`;  
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 8%;
`;
const Input = styled.input`
    align-self: center;
    width: 50%;
    height: 150px; 
    border: none; 
    border-radius: 30px;
    background-color: #fae4e3;
    font-family: Geneva;
    font-size: 24px; 
    color: darkred;
    text-align: center;
    margin-bottom: 20px;
    padding: 10px 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); 
`;
const Button = styled.button`
    align-self: center;
    width: 50%;
    height: 60px; 
    border: none;
    border-radius: 30px;
    background-color: #FF9AA2; 
    font-family: Geneva;
    font-size: 24px;
    color: white; 
    text-align: center;
    text-decoration: none;
    margin-bottom: 20px;
    cursor: pointer; 
    transition: background-color 0.3s; 
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    
    &:hover {
        background-color: #ff7b85;
    }
`;

const Pantry = ({ user })  => {
    const inputRef = useRef(null);

    // State to set the search city
    const [ingredients, setIngredients] = useState('');

    // Navigate to the city page
    const navigate = useNavigate();

    // Handle the input change
    const handleChange = (e) => {
        // Set the city state
        setIngredients(e.target.value);
    };

    // Handle the form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (ingredients === '') {
            return;
        } else {
            try {
                const res = await axios.get('/search', {
                    params: {
                        ingredients: ingredients
                    }
                })
                
                const rec = await axios.post(`/recipes/${user.uid}`, {
                    name: res.data?.recipe?.info?.title,
                    ingredients: res.data?.recipe?.info?.extendedIngredients,
                    instructions: res.data?.recipe?.info?.instructions,
                    shopping: res.data?.recipe?.recipe?.missedIngredients,
                    image: res.data?.recipe?.info?.image
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                navigate(`/recipes?id=${rec.data.recipeId}`)
            } catch (error) {
                console.error('Error searching for recipes: ', error);
            }
        }
    };

    return (
        <Container>
            <TabContainer>
                <MainTab><MainTitle>Pantry</MainTitle></MainTab>
                <Tabs to='/recipes'><Title>Recipes</Title></Tabs>
                <Tabs to='/cart'><Title>Shopping Cart</Title></Tabs>
            </TabContainer>
            
            <Body>
                <Header>{user.displayName.split(' ')[0]}'s Pantry</Header>
                <Form onSubmit={handleSubmit}>
                    <Input 
                        ref={inputRef}
                        type='text'
                        value={ingredients}
                        onChange={handleChange}
                        placeholder='Enter available ingredients'
                    />
                    <Button type='submit'>
                        Get Recipe
                    </Button>
                </Form>
            </Body>
        </Container>
    );
}   
export default Pantry;
