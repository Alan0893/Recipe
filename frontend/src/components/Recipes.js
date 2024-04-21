import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; 
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
    display: flex;
    height: 100%;
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
    height: 100%;
    background-color: lightpink;
    flex-direction: row; 
`;
const Header = styled.h2`
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
    height: 100vh;
    position: relative;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
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
    bottom: 50%;
    width: 5px; 
    background-color: rgba(255, 255, 255, 0.3);
`;

const StyledInstructions = styled.div`
    font-family: Geneva;
    color: #590A07;
    margin: auto; 
    margin-left: 20px;
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 20px;

    ol {
        margin-left: 20px;
        padding-left: 0;
    }

    li {
        list-style-type: decimal;
        margin-bottom: 10px;
    }
`;

const RecipeName = styled.h1`
    font-family: Geneva;
    color: white;
    text-align: center;
    color: #590A07;
`;

const Img = styled.img`
    width: 50%;
    height: auto;
    border-radius: 10px;
    display: flex;
    margin: auto;
    border: 10px solid pink;
`;

const Ulist = styled.ul`
    font-family: Geneva;
    color: #590A08; 
    text-align: center; 
    list-style-type: none;
    margin-top: 10px;
    padding: 0;

    `; 

const Item = styled.li`
    font-family: Geneva;
    margin-top: 5px;
    justify-content: center; 
    display: flex; 
    
`;

const Label = styled.h2`
    font-family: Geneva;
    color: white;
    margin-top: 20px;
    text-align: center;
    margin: auto; 
    margin-top: 10px;
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
                                <RecipeName>{recipe.name}</RecipeName>
                                <Img src={recipe.image} alt={recipe.name} />
                                <Label>Ingredients</Label>
                                <Ulist>
                                    {
                                        recipe?.ingredients.map((ingredient, index) => (
                                            <Item key={index}>{ingredient.original}</Item>
                                        ))
                                    }
                                </Ulist>
                                <Label>Instructions</Label>
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
