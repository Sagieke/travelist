import WeatherPage from "./weather";
import React from "react";
import {Container,Row, Col,Button,Modal,ListGroup,} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
export default function  PlacePage(props)  {
  return (
    <div className="auth-wrapper">
    <Row>
        <div className="auth-inner-left">
          <h1>place weather</h1>
          <hr class="my-4"></hr>
      <Row>
        <div>
          <WeatherPage/>
        </div>
        
      </Row>
      <br/>
      <Row>
       
      </Row>
      </div>
      <br />
      <div className="auth-inner-center">
      <h1>list of attractions</h1>
      <hr class="my-4"></hr>
      <Row>
       
      </Row>
      </div>
      <div className="auth-inner-right">
      <h1>recommended attractions</h1>
      <hr class="my-4"></hr>
      <Row>
        
      </Row>
      </div>
    </Row>
    
    </div>
  );
}
