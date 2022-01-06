import React,{ useState } from "react";
import {Button,Modal} from "react-bootstrap";

const ButtonStyle1={
  
  width:"120px",
  color:"black",
  height:"35px",
 borderColor:"black",
  backgroundColor:"Lightblue",
  margin:"Auto",
  
}

const ButtonStyle2={
  width:"120px",
  mergin:"10px",
  color:"black",
  height:"35px",
 borderColor:"black",
  backgroundColor:"Lightgrey",
  margin:"Auto",
}

const ButtonStyle3={
  width:"120px",
  mergin:"10px",
  color:"black",
  height:"35px",
 borderColor:"black",
  backgroundColor:"orange",
  margin:"Auto",
}

//Requirement number 201
export default function  ChangeRole(props)  {
  const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);  





return (
  <>

  <Button style={ButtonStyle1}variant="primary" onClick={handleShow}>Change role</Button>
  <Modal  show={show} onHide={handleClose}>
  <form action='http://localhost:5000/changePermissionAdmin' method='post' >
  <Modal.Header closeButton>
    <Modal.Title><h3> Change user role :</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>

      <div className="form-group">
          <input
            name="id"
            type="id"
            className="form-control"
            placeholder={props.id}
            value={props.id}
            
            />
        </div>
       
 </Modal.Body>
  <Modal.Footer>
  <div className="form-group">
          <label>New Role - </label>
          <p1> Choose role you want to give the user :</p1>
          <button  type="submit" name="role" className="btn btn-primary btn-block" value={'ADMIN'} style={ButtonStyle1}>Admin</button>
          <button type="submit" name="role" className="btn btn-primary btn-block" value={'TECH'} style={ButtonStyle2}>Tech support</button>
          <button type="submit" name="role" className="btn btn-primary btn-block" value={'TRAVELER'} style={ButtonStyle3}>Traveler</button>
        </div>
  </Modal.Footer>
  </form>
</Modal>
  </> 
 ); 
}
