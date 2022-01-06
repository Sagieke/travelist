import React,{ useState } from "react";
import {Button,Modal} from "react-bootstrap";

const AddFaqStyleButton={
  backgroundColor:"Green",
  color:"black",
}


export default function  AddFAQ()  {
  
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);  

return (
  <>
  
  <Button style={AddFaqStyleButton}variant="primary" onClick={handleShow}>
    Add faq
      </Button>
  <Modal show={show} onHide={handleClose}>
  <form action='http://localhost:5000/addFAQ' method='post'  >
  <Modal.Header closeButton>
    <Modal.Title><h3> Edit faq</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>
      <div className="form-group">
          <label>Enter question</label>
          <input
            name='question'
            type="question"
            className="form-control"
            placeholder="Enter Question"
            required
            />
        </div>
        <div className="form-group">
          <label>Enter Answer</label>
          <input
            name="answer"
            type="answer"
            className="form-control"
            placeholder="Enter answer"
           required/>
        </div>

 </Modal.Body>
  <Modal.Footer>
  <button type="submit" className="btn btn-primary btn-block" >
          Enter question
        </button>
  </Modal.Footer>
  </form>
</Modal>
</> 
    );
  
}
