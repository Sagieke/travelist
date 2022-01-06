import React,{ useState } from "react";
import {Button,Modal,Dropdown,DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { AiFillEdit } from 'react-icons/ai';

const ButtonStyle1={
  mergin:"10px",
  borderColor:"black",
  width: '150px',
  height: '30px',
  backgroundColor:"grey",
  color:"black",
}



export default function  AddAnswer(props)  {
  const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);  
const [answer, setNewAnswer] = useState('');
const [question, setNewQuestion] = useState('');
const [id, setid] = useState('');
//Requirement 103
return (
  <>

  <Button style={ButtonStyle1} variant="primary" onClick={handleShow}><AiFillEdit/>AddAnswer</Button>
  <Modal show={show} onHide={handleClose}>
  <form action='http://localhost:5000/messageSenderFromTechToUser' method='post' >
  <Modal.Header closeButton>
    <Modal.Title><h3> Add answer to user</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>



  <div className="form-group">
          <label>Question id</label>
          <input
            name="id"
            type="id"
            className="form-control"
            placeholder={props.id}
            value={props.id}
            />
        </div>
      <div className="form-group">
          <label>question :</label>
          <input
            name="answer"
            type="text"
            className="form-control"
            />
        </div>
 </Modal.Body>
  <Modal.Footer>
  <button type="submit" className="btn btn-primary btn-block" >
          Sumbit
        </button>
  </Modal.Footer>
  </form>
</Modal>
  </> 
 ); 
}
