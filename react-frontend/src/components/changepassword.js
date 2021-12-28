import React,{ useState } from "react";
import {Button,Modal} from "react-bootstrap";



export default function  ChangePassword()  {
  
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);  

const [password, setPassword] = useState('');


return (
  <>
  
  <Button variant="primary" onClick={handleShow}>
   change password
      </Button>{' '}
  <Modal show={show} onHide={handleClose}>
  <form action='http://localhost:5000/changepassword' method='post'  >
  <Modal.Header closeButton>
    <Modal.Title><h3> change password</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>         
        <div className="form-group">
          <label>change password</label>
          <input
            name="new_password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
 </Modal.Body>
  <Modal.Footer>
  <button type="submit" className="btn btn-primary btn-block" >
          change
        </button>
  </Modal.Footer>
  </form>
</Modal>
</> 
    );
  
}
