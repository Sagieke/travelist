import React,{ useState } from "react";
import {Button,Modal,Accordion,ListGroup, ListGroupItem} from "react-bootstrap";
export default function ForgotPasswordPage()  {


    const [question, setQuestion] = useState(' Please Select your question :');
    const [answer, setAnswer] = useState('');
    
    return(
        <div className="auth-wrapper">
            <div className="auth-inner-center">
            <h3>Compleate this stages to reset password:</h3>
            <label>Security question: </label>
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
        
           
            <div className="form-group">
                <label>Answer</label>
                <input
                  name="answer"
                  type="email"
                  className="form-control"
                  placeholder="Enter Answer: "
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
              
        <button type="submit" className="btn btn-primary btn-block" >
                Reset Password
              </button>
       
           
            </div>
      
            </div>
    );
}