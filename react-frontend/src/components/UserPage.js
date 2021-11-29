import AddList from "./addlist";
import React, {useState, useEffect}from "react";
import {Row,ListGroup} from "react-bootstrap";


export default function  UserPage()  {



    return (
    
       
      <div className="auth-wrapper">  
          <Row>
        <div className="auth-inner-left">
          <h1>my lists</h1>
          <hr class="my-4"></hr>
          <Row>
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


