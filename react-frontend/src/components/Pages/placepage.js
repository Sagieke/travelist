import EquipmentChecklist from "../AddingComponants/EquipmentCheckList";
import WeatherPage from "./weather";
import React ,{ useState, useEffect }from "react";
import Countdown from "./countdown";
import {Container,Row, Col,Button,Modal,ListGroup,} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
export default function  PlacePage()  {
  var [place, setplace] = useState('');
  const [placedate, setplacedata] = useState('');

  function Setdate(){
    useEffect(() => {
      fetch('http://localhost:5000/getPlaceInfo',{
        credentials: "include"
      })
      .then(response => response.json())
      .then(object => setplacedata(object.start_date))
    },[]);
    if (placedate===''){return<h1>loading</h1>}
    else{
      return<Countdown date={placedate}/>
    }
  }

  function Setplace(){
 
    useEffect(() => {
      fetch('http://localhost:5000/getPlaceInfo',{
        credentials: "include"
      })
      .then(response => response.json())
      .then(object => setplace(object))
    },[]);
 

    if (place===''){return<h1>loading</h1>}
    else{
      return  <WeatherPage name={place.name} lat={place.lat} lon={place.lon}/>
    }
  }



  return (
    
    <div className="auth-wrapper">
     
    <Row>
        <div className="auth-inner-left">
          <h1>place weather</h1>
          <hr class="my-4"></hr>
      <Row>
        <div>
        
        {Setplace()}
       
        </div>
      </Row>
      <br/>
    </div>
      <br />
      <div className="auth-inner-center">
      <h1>Time left:</h1>
      <hr class="my-4"></hr>
      {Setdate()}
      </div>
      
      <div className="auth-inner-right">
      <EquipmentChecklist/>
      </div>
    </Row>
    </div>
    
  );
}
