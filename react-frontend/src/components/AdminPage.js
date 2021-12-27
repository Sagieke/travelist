import AddPlace from "./AddPlace";
import Weather from "./weather";
import React , { useState, useEffect }from "react";
import {Container,Row, Col,Button,Modal,ListGroup} from "react-bootstrap";
import UserList from "./UserList";
import Login from "./login.component";
export default function  AdminPage()  {
 



    return (

      <div className="auth-wrapper">
          <Row>
        <div className="auth-inner-left">
          <h1>Admin options:</h1>
          <hr class="my-4"></hr>
          <Row>

          <ListGroup defaultActiveKey="#link1" as="ol" numbered>
            
          
          
        </ListGroup>
          </Row>
          <br />
          <Row>
            <UserList/>
          </Row>
          </div>
          <br />
          </Row>
        </div>

    );

}