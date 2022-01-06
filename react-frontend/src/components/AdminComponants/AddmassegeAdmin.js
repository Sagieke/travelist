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



export default function  AddMessageAdmin(props)  {
  const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);  


return (
  <>

  <Button style={ButtonStyle1} variant="primary" onClick={handleShow}><AiFillEdit/>Add Message</Button>
  <Modal show={show} onHide={handleClose}>
  <form action='http://localhost:5000/messageSenderFromAdminToAll' method='post' >
  <Modal.Header closeButton>
    <Modal.Title><h3> Add Massege</h3></Modal.Title>
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
                  type="description"
                  className="form-control"
                  placeholder="Enter description"
                  required
                />
             
              </div>
    
 </Modal.Body>
  <Modal.Footer>
  <button type="submit" className="btn btn-primary btn-block" >
          Post
        </button>
  </Modal.Footer>
  </form>
</Modal>
  </> 
 ); 
}
