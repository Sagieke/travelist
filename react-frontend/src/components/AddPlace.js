import React ,{ useState }from "react";
import Datetime from 'react-datetime';

import "react-datetime/css/react-datetime.css";
import {Container,Row, Col,Button,Modal} from "react-bootstrap";
export default function  AddPlace()  {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Place, setPlace] = useState('');
  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');
    return (
      <>
      <Button variant="primary" onClick={handleShow}>
      add place
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h3> add place</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>   <div className="form-group">
          <label>select place</label>
          <input
            className="form-control"
            placeholder="Enter place"
            onChange={event => setPlace(event.target.value)}
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
    
            </Row>
        </Container>
      
       </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={() => { handleClose(); console.log(Place);console.log(StartDate);console.log(EndDate)}}>
          add place
         </Button>
        </Modal.Footer>
      </Modal>
    </>   
    );
  
}


