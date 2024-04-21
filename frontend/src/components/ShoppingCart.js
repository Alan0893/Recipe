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
    height: calc(100vh - 8vh);
    background-color: lightpink;
    flex-direction: column; 
    margin-top: 8vh;
`;
const Header = styled.h1`
    font-family: Geneva;
    color: white;
    letter-spacing: 5px;
    align-self: center;
    margin-top: 5%;
`;  
const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 80px;
    padding: 20px;
    margin-left: 20px;
    margin-right: 20px;
`;
const ListContainer = styled.a`
    display: inline-block;
    width: 100%;
    background-color: #f799a9;
    padding: 10px;
    text-align: center;
    margin-top: 20px;
    border-radius: 20px;
    transition: transform 0.3s ease-in-out;
    text-decoration: none !important;
    
    &:hover {
        transform: scale(1.05); 
    }
`;
const ListImg = styled.img`
    max-width: 100%;
    height: auto;
    margin-top: 10px;
    border-radius: 25px;
`;
const ListName = styled.div`
    font-weight: bold;
    margin-top: 5px;
    color: white;
`;
const ListPrice = styled.div`
    font-weight: bold;
    margin-top: 5px;
    color: #ff4362;
`;


function Cart({ user }) {
    const location = useLocation();
    const [recipeId, setRecipeId] = useState(null);
    const [list, setList] = useState(null);

    // Get the recipe ID from the URL
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');

        if (id) {
            setRecipeId(id);
            fetchList(id);
        }
    }, [location.search]);

    const fetchList = async (recipeId) => {
        try {
            const response = await axios.get(`/recipes/${user.uid}/${recipeId}`);
            setList(response.data.recipe.shopping);
            console.log(response.data.recipe.shopping)
        } catch (error) {
            console.error('Error fetching list: ', error);
        }
    }

    return (
        <Container>
            <TabContainer>
                <Tabs to='/pantry'><Title>Pantry</Title></Tabs>
                <Tabs to='/recipes'><Title>Recipes</Title></Tabs>
                <MainTab><MainTitle>Shopping Cart</MainTitle></MainTab>
            </TabContainer>

            <Body>
                <Header>Shopping Cart</Header>
                <GridContainer>
                {
                    list && list.map((item, index) => (
                        item && item.link !== "null" ? (
                            <ListContainer key={index} href={item.link}>
                                <ListImg src={item.image} alt={item.name} />
                                <ListName>{item.name}</ListName>
                                {item.price !== "N/A" && <ListPrice>${item.price}</ListPrice>}
                            </ListContainer>
                        ) : (
                            <ListContainer key={index}>
                                <ListImg src={item.image} alt={item.name} />
                                <ListName>{item.name}</ListName>
                            </ListContainer>
                        )
                    ))
                }

                </GridContainer>
            </Body>
        </Container>
   
    );
}   
export default Cart;