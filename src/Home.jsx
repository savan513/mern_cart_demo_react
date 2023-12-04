import React, { useContext } from 'react';
import Menu from './Menu';
import ProductCardContainer from './ProductCardContainer';
import {  userStateContext } from './UserReducer';


function Home() {
  const userState = useContext(userStateContext);
  console.log("home page--------",userState)
  return (
    <>
        <Menu/>
        <ProductCardContainer/>
    </>
  )
}

export default Home;