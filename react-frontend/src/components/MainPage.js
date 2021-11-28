import React, { useState } from "react";
import {Container,Row, Col,Button,ListGroup} from "react-bootstrap";
import  Login from "./login.component";
import  SignUp from "./signup.component";



import AddList from "./addlist";

export default function  MainPage()  {
   
    return (
    <div className="container">
    <div className="App-login">
          <Login/>  
          <SignUp/>
         </div>
      </div> 
    )
}