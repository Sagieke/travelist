import React, { useState } from "react";
import {Container,Row, Col,Button,ListGroup} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainPage from "./MainPage";





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