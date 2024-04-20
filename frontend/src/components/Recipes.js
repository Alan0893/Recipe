import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; 
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
    flex-direction: row; 
`;
const Header = styled.h1`
    font-family: Geneva;
    color: white;
    letter-spacing: 5px;
    align-self: center;
    margin-top: 5%;
`;  
const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    position: relative; 
`;
const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;
const BorderLine = styled.div`
    position: absolute; 
    top: 50%; 
    transform: translateY(-50%); 
    right: 0; 
    height: 80%; 
    width: 2px; 
    background-color: white;
`;

const StyledInstructions = styled.div`
    ol {
        margin-left: 20px;
        padding-left: 0;
    }

    li {
        list-style-type: decimal;
        margin-bottom: 10px;
    }
`;

function Recipes({ user }) {
    const location = useLocation();
    const [recipe, setRecipe] = useState(null);
    const [recipeId, setRecipeId] = useState(null);

    // Get the recipe ID from the URL
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');

        if (id) {
            setRecipeId(id);
            fetchRecipe(id); 
        }
    }, [location.search])

    const fetchRecipe = async (recipeId) => {
        try {
            const res = await axios.get(`/recipes/${user.uid}/${recipeId}`);
            setRecipe(res.data.recipe)
        } catch (error) {
            console.error('Error fetching recipe: ', error);
        }
    }

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
                    {
                        recipe ? (
                            <div>
                                <h1>{recipe.name}</h1>
                                <img src={recipe.image} alt={recipe.name} />
                                <StyledInstructions dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                            </div>
                        ) : (
                            <Header>Select a recipe to view</Header>
                        )
                    }
                    <BorderLine />
                </LeftContainer>
                
                <RightContainer>
                    <Header>History</Header>
                </RightContainer>
            </Body>
        </Container>
   
    );
}   
export default Recipes;
