import React,{ useState } from "react";
import {Modal} from "react-bootstrap";
//requirement number 9
export default function  ChangePassword()  {
const [show, setShow] = useState(true);
const handleClose = () => setShow(false);
return (
  <>
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
            required
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
