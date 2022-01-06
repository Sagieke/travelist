import React,{ useState } from "react";
import {Button,Modal,Accordion,ListGroup, ListGroupItem} from "react-bootstrap";


export default function  SignUp()  {
  
const [show, setShow] = useState(true);
const handleClose = () => setShow(false);
const [question, setQuestion] = useState(' Please choose your security question: :');
return (
  <>
  
  <Modal show={show} onHide={handleClose}>

  <form action='http://localhost:5000/register' method='post'  >
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
            required
          />
          <lable> security question : </lable>
          <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
           {question}
          </Accordion.Header>
          <Accordion.Body>
          <ListGroup defaultActiveKey="#link1" as="ol" numbered>   
          <ListGroup.Item action onClick={() => setQuestion("What was the name of your dog growing up?")}  as="li">What was the name of your dog growing up?</ListGroup.Item>
          <ListGroup.Item action onClick={()=>setQuestion("Where did you grow up ?")}  as="li">Where did you grow up ? </ListGroup.Item>
          <ListGroup.Item action onClick={() => setQuestion("What was the name of your school?")}  as="li">What was the name of your school? </ListGroup.Item>
          </ListGroup> 
          <input hidden="hidden" name="question" value={question}>
          </input>
          </Accordion.Body>
        </Accordion.Item>
         </Accordion>
        </div>
        <div className="form-group">
          <label>Answer</label>
          <input
            name='answer'
            type="answer"
            className="form-control"
            placeholder="Enter your answer"
            required
          />
        </div>
        
 </Modal.Body>
  <Modal.Footer>
  <button type="submit" className="btn btn-primary btn-block" >
          register
        </button>
  </Modal.Footer>
  </form>
</Modal>
</> 
    );
  
}
