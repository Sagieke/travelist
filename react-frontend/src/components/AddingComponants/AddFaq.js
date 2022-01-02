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
const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');
const [answer, setAnswer] = useState('');
const [passwordError, setpasswordError] = useState("");
const [emailError, setemailError] = useState("");

const handleValidation = (event) => {
  let formIsValid = true;

  if (!userName.match()) {
    formIsValid = false;
    setemailError("Email Not Valid");
    return false;
  } else {
    setemailError("");
    formIsValid = true;
  }

  if (!password.match()) {
    formIsValid = false;
    setpasswordError(
      "length must best min 8 Chracters and Max 22 Chracters"
    );
    return false;
  } else {
    setpasswordError("");
    formIsValid = true;
  }
  if(formIsValid===true){ handleClose()}

  return formIsValid;
};

const signupSubmit = (e) => {
  e.preventDefault();
 handleValidation()

}
return (
  <>
  
  <Button style={AddFaqStyleButton}variant="primary" onClick={handleShow}>
    Add faq
      </Button>
  <Modal show={show} onHide={handleClose}>
  <form id="loginform" onSubmit={signupSubmit}>
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
            onChange={(event) => setUserName(event.target.value)}
          />
           <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
        </div>
        <div className="form-group">
          <label>Enter Answer</label>
          <input
            name="answer"
            type="answer"
            className="form-control"
            placeholder="Enter answer"
            onChange={(event) => setPassword(event.target.value)}
          />
           <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
        </div>

 </Modal.Body>
  <Modal.Footer>
  <button type="submit" className="btn btn-primary btn-block"  onClick={() => { console.log(userName);console.log(password) }}>
          Enter question
        </button>
  </Modal.Footer>
  </form>
  </form>
</Modal>
</> 
    );
  
}
