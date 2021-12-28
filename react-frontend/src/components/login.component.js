import React,{ useState } from "react";
import {Button,Modal} from "react-bootstrap";




export default function  Login()  {
  const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);  
const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');
const [passwordError, setpasswordError] = useState("");
const [emailError, setemailError] = useState("");

const handleValidation = (event) => {
  let formIsValid = true;

  if (!userName.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
    formIsValid = false;
    setemailError("Email Not Valid");
    return false;
  } else {
    setemailError("");
    formIsValid = true;
  }

  if (!password.match(/^[a-zA-Z0-9]{8,22}$/)) {
    formIsValid = false;
    setpasswordError(
      "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
    );
    return false;
  } else {
    setpasswordError("");
    formIsValid = true;
  }
  if(formIsValid==true){ handleClose()}
  return formIsValid;
};

const loginSubmit = (e) => {
  e.preventDefault();
  handleValidation();

};




return (
  <>

  <Button variant="primary" onClick={handleShow}>login</Button>
  <Modal show={show} onHide={handleClose}>
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
          />
          <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
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
          <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
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
