import React from "react";
import  Login from "./login.component";
import  SignUp from "./signup.component";




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