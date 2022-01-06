import React,{ useState } from "react";
import {Button,Modal} from "react-bootstrap";

const AddFaqStyleButton={
  backgroundColor:"Green",
  color:"black",
}


export default function  UserAddMessege()  {
  
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);  

return (
  <>
  
  <Button style={AddFaqStyleButton}variant="primary" onClick={handleShow}>
    Add Question
      </Button>
  <Modal show={show} onHide={handleClose}>
  <form id="loginform">
  <form action='http://localhost:5000/messageSenderToTechFromUser' method='post'  >
  <Modal.Header closeButton>
    <Modal.Title><h3> Add question</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>
      <div className="form-group">
          <label>Enter Title</label>
          <input
            name='title'
            type="title"
            className="form-control"
            placeholder="Enter title"
            required
          />
         
        </div>
        <div className="form-group">
          <label>Enter description</label>
          <input
            name="description"
            type="description"
            className="form-control"
            placeholder="Enter description"
            required
          
          />  
        </div>

 </Modal.Body>
  <Modal.Footer>
  <button type="submit" className="btn btn-primary btn-block">
          Enter question
        </button>
  </Modal.Footer>
  </form>
  </form>
</Modal>
</> 
    );
  
}
