import React ,{ useState,useEffect }from "react";
import Datetime from 'react-datetime';
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
  const [Lati, setLati] = useState(0);
  const [Long, setLong] = useState(0);

  let getLatPromise = (pObj) => geocodeByPlaceId(pObj.value.place_id)
  .then(results => getLatLng(results[0]))
  .then(({ lat, lng }) => { return {lat,lng}.lat })
  .then(function(result){console.log(result)})

    return (
      <>
      <Button variant="primary" onClick={handleShow}>
      add place
      </Button>
      <Modal show={show} onHide={handleClose}>
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
          />
        </div>
        <Container>
            <Row>
             <Col>start date</Col>
             <Col>end date</Col>
            </Row>
            <Row>
      
            <Col><Datetime dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true} placeholder="start date"  onChange={(event) => {setStartDate(event.format("DD-MM-YYYY"))}}/></Col>
              <Col><Datetime dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true}  placeholder="end date" onChange={(event) => {setEndDate(event.format("DD-MM-YYYY"))}}/></Col>
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
          getLatPromise(Place);
          console.log("lati",Lati);
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


