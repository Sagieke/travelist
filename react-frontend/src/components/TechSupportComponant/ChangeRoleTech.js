import React,{ useState } from "react";
import {Button,Modal,Dropdown,DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const ButtonStyle1={
  mergin:"10px",
  borderColor:"black",
  color:"black",
  height:"50px",
 borderColor:"black",
  backgroundColor:"Lightblue",
  margin:"10px",
}

const ButtonStyle2={
  width:"120px",
  mergin:"10px",
  borderColor:"black",
  color:"black",
  height:"30px",
 borderColor:"black",
  backgroundColor:"Lightgreen",
  margin:"10px",
}

const ButtonStyle3={
  width:"120px",
  mergin:"10px",
  borderColor:"black",
  color:"black",
  height:"30px",
 borderColor:"black",
  backgroundColor:"orange",
  margin:"10px",
}

//Requirement number 101
export default function  ChangeRoleTech(props)  {
  const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);  
const [id, setID] = useState(true);
const [role, setrole] = useState(true);




return (
  <>
  
  <Button variant="primary" onClick={handleShow}>Change role to user</Button>
  <Modal show={show} onHide={handleClose}>
  <form action='http://localhost:5000/changePermissionTech' method='post' >
  <Modal.Header closeButton>
    <Modal.Title><h3> Change user role</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>

      <div className="form-group">
          <label>User id</label>
          <input
            name="id"
            type="id"
            className="form-control"
            placeholder="Enter user id"
            value={props.id}
            />
        </div>
 </Modal.Body>
  <Modal.Footer>
  <div className="form-group">
  <label>New Role -</label>
          <p1> Choose the role you want to give to chosen user:</p1>
          <button type="submit" name="role" className="btn btn-primary btn-block" value={'TECH'} style={ButtonStyle1}onChange={event => setrole(event.target.value)}>Tech support</button>
          <button type="submit" name="role" className="btn btn-primary btn-block" value={'TRAVELER'} style={ButtonStyle1}onChange={event => setrole(event.target.value)}>Traveler</button>
        </div>
  </Modal.Footer>
  </form>
</Modal>
  </> 
 ); 
}
