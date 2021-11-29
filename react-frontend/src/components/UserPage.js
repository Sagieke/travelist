import AddList from "./addlist";
<<<<<<< HEAD
import React, {useState, useEffect}from "react";
import {Row,ListGroup} from "react-bootstrap";
=======
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Container,Row, Col,Button,ListGroup} from "react-bootstrap";
import logo from '../logo.svg';
import LogOut from "./LogOut";
import RemoveList from "./RemoveList";

export default function  UserPage()  {
  const listgiInfo = [
    {
      title: "Lebron James",
      color: "#df0c0c",
    },
    {
      title: "Alex Caruso",
      color: "#73b71f",
    },
    {
      
      title: "Steph Curry",
      color: "#04e000",
    },
  ];
  const ListGroupItem = (lgi, index) => {
    return (

<ListGroup.Item  variant="default"    key={index} style={{ textAlign: 'right', color: "white", background: lgi.color }} as="li" action href="#link1" >
 {lgi.title}            
</ListGroup.Item>
>>>>>>> GUY


export default function  UserPage()  {



    return (
    
       
      <div className="auth-wrapper">  
          <Row>
        <div className="auth-inner-left">
          <h1>my lists</h1>
          <hr class="my-4"></hr>
          <Row>
            <RemoveList/>
          <ListGroup defaultActiveKey="#link1" as="ol" numbered>
            
        </ListGroup>
          </Row>
          <br />
          <Row>
         <AddList/>
          </Row>
          </div>
          <br />
          <div className="auth-inner-right">
          <h1>most search places</h1>
          <hr class="my-4"></hr>
          
          </div>
          </Row>
        </div>
        
    );
    
}


