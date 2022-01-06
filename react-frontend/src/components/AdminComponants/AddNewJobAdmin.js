import React,{ useState } from "react";
import {Button,Modal} from "react-bootstrap";
import { AiFillEdit } from 'react-icons/ai';

const ButtonStyle1={
  mergin:"10px",
  borderColor:"black",
  width: '150px',
  height: '30px',
  backgroundColor:"grey",
  color:"black",
}



export default function  AddNewJobAdmin(props)  {
  const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);  


return (
  <>

  <Button style={ButtonStyle1} variant="primary" onClick={handleShow}><AiFillEdit/>Add New job</Button>
  <Modal show={show} onHide={handleClose}>
  <form action='http://localhost:5000/addJob' method='post' >
  <Modal.Header closeButton>
    <Modal.Title><h3> Add job</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>


  <div className="form-group">
                <label>Title:</label>
                <input
                  name="title"
                  type="title"
                  className="form-control"
                  placeholder="Enter title"
                  required
                />
              
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  name="description"
                  type="text"
                  className="form-control"
                  placeholder="Enter description"
                  required
                />
             </div>
              <div className="form-group">
                <label>requirements</label>
                <input
                  name="requirements"
                  type="Text"
                  className="form-control"
                  placeholder="Enter requirements"
                  required
                />
              </div>
    
 </Modal.Body>
  <Modal.Footer>
  <button type="submit" className="btn btn-primary btn-block" >
          Submit
        </button>
  </Modal.Footer>
  </form>
</Modal>
  </> 
 ); 
}
