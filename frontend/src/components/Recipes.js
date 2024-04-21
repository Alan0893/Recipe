import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import styled from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

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
    position: fixed;
    background-color: white;
    z-index: 2;
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
    margin-top: 8vh;
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
    height: calc(100vh - 8vh); 
    overflow-y: auto;
    position: sticky;
    top: 8vh;
    scrollbar-width: none; 
    -ms-overflow-style: none; 
    &::-webkit-scrollbar {
        display: none; 
    }
`;
const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    position: sticky;
    top: 8vh; 
    scrollbar-width: none; 
    -ms-overflow-style: none; 
    &::-webkit-scrollbar {
        display: none;
    }
`;
const BorderLine = styled.div`
    position: fixed; 
    top: 20%;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    height: 60%; 
    width: 5px; 
    background-color: rgba(255, 255, 255, 0.3);
    z-index: 3; 
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

const RecipeContainer = styled.div`
    display: inline-block;
    width: 40%;
    background-color: #f799a9;
    padding: 10px;
    text-align: center;
    margin-top: 20px;
    border-radius: 20px;
    transition: transform 0.3s ease-in-out;
    
    &:hover {
        transform: scale(1.05); 
    }
`;
const RecipeImage = styled.img`
    max-width: 90%;
    height: auto;
    margin-top: 10px;
    border-radius: 25px;
`;
const RecipeNames = styled.div`
    font-weight: bold;
    margin-top: 5px;
`;

const ErrImg = styled.img`
    width: 50%;
    margin: 0 auto; 
    display: block;
    margin-top: 30px;
`;
const ErrMsg = styled.h1`
    font-family: Geneva;
    color: #fe655a;
    text-align: center;
`;

const ShoppingCartButton = styled.button`
    margin-left: 25%;
    width: 50%;
    height: 60px; 
    border: none;
    border-radius: 30px;
    background-color: #FF9AA2; 
    font-family: Geneva;
    font-size: 18px;
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
const CartIcon = styled(FontAwesomeIcon)`
    margin-right: 10px;
`;

function Recipes({ user }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [recipeId, setRecipeId] = useState(null);
    const [recipe, setRecipe] = useState(null);
    const [recipes, setRecipes] = useState(null);

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

    useEffect(() => {
        fetchAllRecipes();
    }, [])

    const fetchAllRecipes = async () => {
        try {
            const res = await axios.get(`/recipes/${user.uid}`);
            setRecipes(res.data.recipes);
        } catch (error) {
            console.error('Error fetching recipes: ', error);
        }
    }

    const handleRecipeClick = (id) => {
        setRecipeId(id);
        const searchParams = new URLSearchParams();
        searchParams.set('id', id);
        window.history.pushState(null, '', `?${searchParams.toString()}`);
        window.location.reload();
    }

    const handleShoppingCartClick = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        
        navigate(`/cart?id=${id}`)
    };

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
                                <ShoppingCartButton onClick={handleShoppingCartClick}><CartIcon icon={faShoppingCart}/>Go to Shopping Cart</ShoppingCartButton>
                            </div>
                        ) : (
                            <>
                                <ErrImg src="/MainPagePics/recipe.png" alt="recipe" />
                                <ErrMsg>Select a recipe to view</ErrMsg>
                            </>
                        )
                    }
                    <BorderLine />
                </LeftContainer>
                
                <RightContainer>
                    <Header>History</Header>
                    {
                        recipes && (
                            <Ulist>
                                {
                                    Object.entries(recipes).map(([recipeId, recipeData]) => (
                                        <Item key={recipeId} onClick={() => handleRecipeClick(recipeId)}>
                                            <RecipeContainer>
                                                <RecipeImage src={recipeData.image} alt={recipeData.name} />
                                                <RecipeNames>{recipeData.name}</RecipeNames>
                                            </RecipeContainer>
                                       </Item>
                                       
                                    ))
                                }
                            </Ulist>
                        )
                    }
                </RightContainer>
            </Body>
        </Container>
   
    );
}   
export default Recipes;
