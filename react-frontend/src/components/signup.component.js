import React,{ useState } from "react";
import {Button,Modal} from "react-bootstrap";

export default function  SignUp()  {
  const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);  
const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');

return (
  <>
  
  <Button variant="primary" onClick={handleShow}>
    Sign up
      </Button>



  <Modal show={show} onHide={handleClose}>
  <form action='http://localhost:5000/register' method='post'>
  <Modal.Header closeButton>
    <Modal.Title><h3> Sign up</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>
      <div className="form-group">
          <label>Email address</label>
          <input
            name='email'
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={event => setUserName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={event => setPassword(event.target.value)}
          />
        </div>
   

 </Modal.Body>
  <Modal.Footer>
  <button type="submit" className="btn btn-primary btn-block" onClick={() => { handleClose();console.log(userName);console.log(password) }}>
          register
        </button>
  </Modal.Footer>
  </form>
</Modal>
</> 
    );
  
}