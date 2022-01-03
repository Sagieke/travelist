import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";


const ButtonStyle1 = {
    width: "100px",
    borderColor: "black",
    color: "black",
    height: "35px",
    borderColor: "black",
    backgroundColor: "lightgrey",
    margin: "1px",
}

export default function Login() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
      
        <Button style={ButtonStyle1}variant="primary" onClick={handleShow}>login</Button>
        <Modal show={show}  onHide={handleClose}>
        <form action='http://localhost:5000/login' method='post' >
        <Modal.Header closeButton>
          <Modal.Title><h3> Sign In</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
            <div className="form-group">
                <label>Email address</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={event => setUserName(event.target.value)} 
                  required
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
      
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label className="custom-control-label" htmlFor="customCheck1">
                    Remember me
                  </label>
                </div>
              </div>
              <a href="http://127.0.0.1:5000/test" target="_blank">forgot pass</a>
       </Modal.Body>
        <Modal.Footer>
        <button type="submit" className="btn btn-primary btn-block" >
                log in
              </button>
        </Modal.Footer>
        </form>
      </Modal>
        </> 
       ); 
      }
      