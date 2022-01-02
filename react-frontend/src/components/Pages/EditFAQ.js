import React,{ useState } from "react";
import {Button,Modal,Dropdown,DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const ButtonStyle1={
  mergin:"10px",
  borderColor:"black",
  color:"black",
  height:"30px",
 borderColor:"black",
  backgroundColor:"Lightblue",
  margin:"10px",
}

const ButtonStyle2={
  width:"65px",
  mergin:"10px",
  borderColor:"black",
  color:"black",
  height:"50px",
 borderColor:"black",
  backgroundColor:"Lightgreen",
  margin:"10px",
}

const ButtonStyle3={
  width:"80px",
  mergin:"10px",
  borderColor:"black",
  color:"black",
  height:"50px",
 borderColor:"black",
  backgroundColor:"orange",
  margin:"10px",
}


export default function  EditFAQ(props)  {
  const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);  
const [answer, setNewAnswer] = useState('');
const [question, setNewQuestion] = useState('');
const [id, setid] = useState('');

return (
  <>

  <Button style={ButtonStyle1} variant="primary" onClick={handleShow}>Edit FAQ</Button>
  <Modal show={show} onHide={handleClose}>
  <form action='http://localhost:5000/updateFAQ' method='post' >
  <Modal.Header closeButton>
    <Modal.Title><h3> Edit FAQ</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>



  <div className="form-group">
          <label>Question id</label>
          <input
          
            name="id"
            type="id"
            className="form-control"
            placeholder="Enter question id"
            value={props.id}
            />
        </div>
      <div className="form-group">
          <label>question :</label>
          <input
            name="question"
            type="text"
            className="form-control"
            placeholder={props.question}
            value={props.question}
            
            />
        </div>
        <div className="form-group">
          <label>New answer</label>
          <input
            name="answer"
            type="text"
            className="form-control"
            placeholder={props.answer}
            onChange={event => setNewAnswer(event.target.value)} 
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
