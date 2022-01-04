import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BiMessageAdd } from 'react-icons/bi';
const ButtonStyle1 = {
  color:"black",
  height:"50px",
  borderColor:"black",
  backgroundColor:"lightpink",
  margin:"10px",
  width:"190px",
  height:"50px",
}

export default function Suggestions() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [title, settitle] = useState('');
    const [description, setSuggestion] = useState('');

    return (
        <>
      
        <Button style={ButtonStyle1}variant="primary" onClick={handleShow}><BiMessageAdd/>Add a suggestion </Button>
        <Modal show={show}  onHide={handleClose}>
        <form action='http://localhost:5000/submitSuggestion' method='post' >
        <Modal.Header closeButton>
          <Modal.Title><h3> Submit Suggestion</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
            <div className="form-group">
                <label>Title:</label>
                <input
                  name="title"
                  type="title"
                  className="form-control"
                  placeholder="Enter title of suggestion"
                  onChange={event => settitle(event.target.value)} 
                  required
                />
              
              </div>
              <div className="form-group">
                <label>Suggestion:</label>
                <input
                  name="description"
                  type="suggestion"
                  className="form-control"
                  placeholder="Enter description of suggestion: "
                  onChange={event => setSuggestion(event.target.value)}
                />
             
              </div>
       </Modal.Body>
        <Modal.Footer>
        <button type="submit" className="btn btn-primary btn-block" >
                sumbit
              </button>
        </Modal.Footer>
        </form>
      </Modal>
        </> 
       ); 
      }
      