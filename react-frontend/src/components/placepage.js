import EquipmentChecklist from "./EquipmentCheckList";
import WeatherPage from "./weather";
import React ,{ useState, useEffect }from "react";
import Countdown from "./countdown";
import {Container,Row, Col,Button,Modal,ListGroup,} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
export default function  PlacePage(props)  {

  const [placedata, setplacedata] = useState({});
  
  useEffect(() => {
    fetch('http://localhost:5000/getPlaceInfo',{
      credentials: "include"
    })
    .then(response => response.json())
    .then(object => setplacedata(object))
  },[]);

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
    </div>
      <br />
      <div className="auth-inner-center">
      <h1>list of attractions</h1>
      <hr class="my-4"></hr>
      <Countdown date='12-30-21'/>
      </div>
      
      <div className="auth-inner-right">
      <Row>
      <EquipmentChecklist/>
      </Row>
      </div>
    </Row>
    </div>
    
  );
}
