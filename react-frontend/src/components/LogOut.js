import React from "react";
import {Button} from "react-bootstrap";
import {  Link } from "react-router-dom";

export default function LogOut(){
return(
 <div className="App-LogOut">
 <Link to="/MainPage">
 <Button renderAs="button">
    <span>LogOut</span>
  </Button>
 </Link>
    </div>
   
    )


}