import React ,{ useState,useEffect }from "react";
import Datetime from 'react-datetime';
import moment from 'moment';
import GooglePlacesAutocomplete, {geocodeByPlaceId, getLatLng} from "react-google-places-autocomplete";
import "react-datetime/css/react-datetime.css";
import {Container,Row, Col,Button,Modal} from "react-bootstrap";
export default function  AddPlace()  {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Place, setPlace] = useState({});
  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');
  var yesterday = moment().subtract(1, "day");
  function valid(current) {
    return current.isAfter(yesterday);
}

  /*
  useEffect(() => {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+Place.value.structured_formatting.main_text+"&limit=1"+"&appid="+OpenWeatherAPIKey)
    .then(response => response.json())
    .then(object => setGeolocObj(object))
  });
  */

  /*let getLatPromise = (pObj) => geocodeByPlaceId(pObj.value.place_id)
  .then(results => getLatLng(results[0]))
  .then(({ lat, lng }) => { return {lat,lng}.lat })
  .then(function(result){console.log(result)})*/

    return (
      <>
      <Button variant="primary" onClick={handleShow}>
      add place
      </Button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <form action="http://localhost:5000/addplace" method='post'>
        <Modal.Header closeButton>
          <Modal.Title><h3> add place</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>   
          <div className="form-group">
          <label>select place</label>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyChTcMUCY9Zw3j00st0uKkqTz0RGlOpea8"
            selectProps={{
              Place,
              onChange: setPlace
            }}
          />
          <input
            className="form-control"
            hidden='true'
            name='place_name'
            value={Place.label}
            required
          />
        </div>
        <br/>
        <Container>
            <Row md={2}>
             <Col style={{ textAlign:"center"}} > <label>start date</label></Col>
             <Col style={{ textAlign:"center"}}> <label>end date</label></Col>
            </Row>
            <Row>
      
            <Col><Datetime dateFormat="MM-DD-YY" timeFormat={false} closeOnSelect={true} input={false} placeholder="start date"  onChange={(event) => {setStartDate(event.format("MM-DD-YY"))}} isValidDate={valid}/></Col>
              <Col><Datetime dateFormat="MM-DD-YY" timeFormat={false} input={false} closeOnSelect={true}  placeholder="end date" onChange={(event) => {setEndDate(event.format("MM-DD-YY"))}} isValidDate={valid} /></Col>
            <input hidden="true"
              name="start_date"
              value={StartDate}
            />
            <input hidden="true"
              name="end_date"
              value={EndDate}
            />
            </Row>
        </Container>
      
       </Modal.Body>
        <Modal.Footer>
        <Button type="submit" variant="primary" onClick={() => {
          handleClose();
          /*console.log(StartDate);
          console.log(EndDate);*/
          window.location.reload();
        }}>
          add place
         </Button>
        </Modal.Footer>
        </form>
      </Modal>
    </>   
    );
  
}


