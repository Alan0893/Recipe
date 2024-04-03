import styled from 'styled-components';

// Setting the styles of the page

const MainContainer = styled.div`
    display: flex;
    height: 100vh;
    background-color: #FFF4DF;
`;

const Box1 = styled.div`
    display: flex;
    flex-direction: column;
    height: 90%;
    width: 25%;
    border-color: #fae4e3;  
    border-width: 10px;
    border-radius: 30px;
    text-align: center;
    border-style: solid;
    margin-left: 30px;

    &:hover {
        background-color: #fae4e3;
    }

`;
const Box2 = styled.div`
    display: flex;
    flex-direction: column;
    height: 90%;
    width: 25%;
    border-color: #fae4e3;  
    border-width: 10px;
    border-radius: 30px;
    text-align: center;
    border-style: solid;

    &:hover {
        background-color: #fae4e3;
    }
`;

const Box3 = styled.div`
    display: flex;
    flex-direction: column;
    height: 90%;
    width: 25%;
    border-color: #fae4e3;  
    border-width: 10px;
    border-radius: 30px;
    text-align: center;
    border-style: solid;
    margin-right: 30px;


    &:hover {
        background-color: #fae4e3;
    }
`;

const BoxContainer = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    item-align: center;
    justify-content: space-between;
    
`;
const Title = styled.h2`
    font-family: Geneva; 
    color: #E9A3A0; 
    font-size: 250%; 
    font-family: 'Comic Sans MS', cursive; 
    margin-top: 500px;
`;
const Image1 = styled.img`
    width: 300px;
    height: auto;
    position: absolute;
    z-index: 0;
    top: 300px;
    left: 100px;
    
`;

const Image2 = styled.img`
    width: 300px;
    height: auto;
    position: absolute;
    z-index: 0;
    top: 300px;
    left: 41%;
    
`;

const Image3 = styled.img`
    width: 300px;
    height: auto;
    position: absolute;
    z-index: 0;
    top: 300px;
    left: 75%;
`;

const BinderHole1 = styled.img`
    width: 500px;
    z-index: 0;
    position: absolute;
    top: 715px;
    left: -10px;

`;

const BinderHole2 = styled.img`
    width: 500px;
    z-index: 0;
    position: absolute;
    top: 715px;
    left: 510px;

`;

const BinderHole3 = styled.img`
    width: 500px;
    z-index: 0;
    position: absolute;
    top: 715px;
    right: -10px;

`;


export default function MainPage() {    
    return (
        <MainContainer>
            <BoxContainer>
                <Box1>
                    <Image1 src="/MainPagePics/jar.png" alt="pantry"/>
                    <Title>Pantry</Title>
                </Box1>
                <Box2>
                    <Image2 src="/MainPagePics/recipe.png" alt="recipe"/>
                    <Title>Recipes</Title>
                </Box2>
                <Box3>
                    <Image3 src="/MainPagePics/shoppinglist.png" alt="shopping"/>
                    <Title>Shopping List</Title>
                </Box3>
            </BoxContainer>
            <BinderHole1 src="/MainPagePics/binder.png" alt="binderhole"/>
            <BinderHole2 src="/MainPagePics/binder.png" alt="binderhole2"/>
            <BinderHole3 src="/MainPagePics/binder.png" alt="binderhole3"/>

           
        </MainContainer>
    );
}