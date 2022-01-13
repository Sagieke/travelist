import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

//Requirement number 12
export default function Suggestions() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    let history = useHistory();

    return (
        <>
      
        
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
                  required
                />
             
              </div>
       </Modal.Body>
        <Modal.Footer>
        <form action="http://localhost:3000/userPage">
        <button type="submit" className="btn btn-primary btn-block">
                sumbit
        </button>
        </form>
        
        </Modal.Footer>
        </form>
      </Modal>
        </> 
       ); 
      }
      