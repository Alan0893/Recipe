import { Link } from "react-router-dom";

import styled from "styled-components";

const Container = styled.div`
	display: flex;
	height: 100vh;
	min-height: 100vh;
	background-color: #fcd9d6;
`;
const Title = styled.h1`
	font-family: 'Rubik', sans-serif;
	color: white;
	font-size: 500%;
	margin: auto;  
	margin-top: 200px;
	text-transform: uppercase;
	letter-spacing: 10px;
`;
const Button = styled(Link)`
	font-family: Geneva;
	display: inline-block;
	background-color: #E9A3A2;
	color: white;
	border-radius: 40px;
	min-width: 160px;
	font-weight: 1000;
	letter-spacing: 2px;
	text-transform: uppercase;
	font-size: 25px;
	font-style: bold;
	text-align: center;
	width: 280px;
	height: 150px;
	border-color: #E9A3A2;
	position: absolute;
	left: 50%;
	top: 40%;
	transform: translate(-50%, -50%);
	text-decoration: none;
	line-height: 150px;
	&:hover,
	&:focus {
		background-color: #f0cc76;
		border-color: #f0cc76;
		color: brown;
	}
`;

const Strawberry = styled.img`
	width: 15%;
	top: 2%;
	left: 2%;
	position: absolute;
`;
const Drink = styled.img`
  width: 13%;
  top: 400px;
	top: 33%;
	left: 8%;
  position: absolute;
  rotate: 10deg;
`;
const Toast = styled.img`
  width: 17%;
  bottom: 5%;
  left: 15%;
  position: absolute;
`;
const Juice = styled.img` 
	width: 20%;
	top: 0%;
	right: 2%;
	position: absolute;
	z-index: 0;
	rotate: 10deg;
`;
const Bread = styled.img` 
	width: 18%;
	top: 33%;
	right: 8%;
	position: absolute;
	rotate: -10deg;
`;
const Cake = styled.img`
  width: 20%;
	bottom:  5%;
	right: 15%;
  position: absolute;
  rotate: -10;
`;

const Home = ({ user }) => {
	return (
		<Container>
			<Title>Welcome, {user.displayName.split(' ')[0]}</Title>
			<Button to="/main">Go to My Recipe</Button>  
			<Strawberry src={"/appPics/strawberry.png"} alt="food" />
			<Drink src={"/appPics/drink.png"} alt="milk"/>
			<Toast src={"/appPics/toast.png"} alt="toast"/>
			<Juice src={"/appPics/juice.png"} alt="juice"/>
			<Bread src={"/appPics/bread.png"} alt="bread2"/>
			<Cake src={"/appPics/cake.png"} alt="cake"/>
		</Container>
	);
}

export default Home;