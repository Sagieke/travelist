import AddPlace from "../AddingComponants/AddPlace";
import Weather from "../Pages/weather";
import React , { useState, useEffect }from "react";
import {Container,Row, Col,Button,Modal,ListGroup} from "react-bootstrap";
import Faq from "../NavBarItems/FAQ";
import UserListTech from "./UserListTech";




const ButtonStyle1={
  height:"50px",
 borderColor:"black",
  backgroundColor:"Lightblue",
  margin:"10px",
}

const ButtonStyle2={
  height:"50px",
  borderColor:"black",
  backgroundColor:"Lightgreen",
  margin:"10px",
}

const ButtonStyle3={
  color:"black",
  height:"50px",
  borderColor:"black",
  backgroundColor:"Lightyellow",
  margin:"10px",
}


export default function techSupport()  {
 



    return (

      <div className="auth-wrapper">
          <Row>
        <div className="auth-inner-left">
          <h1>Tech support options:</h1>
          <hr class="my-4"></hr>
          <Row>

          <ListGroup defaultActiveKey="#link1" as="ol" numbered>
            
          
          
        </ListGroup>
          </Row>
          <br />
          <Row>
           <UserListTech/> 
        <Faq/>
          </Row>
          </div>
          <br />
          </Row>
        </div>

    );

}