import React from "react";
import  Login from "../NavBarItems/login.component";
import SignUp from "../NavBarItems/signup.component";
import UserHelp from "../UserComponants/UserHelp";


export default function  MainPage()  {
   
    return (
    

      
    <div className="container">
    <div className="App-login">
     
          <Login/>  
          <SignUp/>
          <UserHelp/>
         </div>
         
      </div> 
    )
    }

    





