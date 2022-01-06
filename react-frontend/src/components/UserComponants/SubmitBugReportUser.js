import React, { useState } from "react";
import {  Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

//Requirement number 11
export default function SubmitBugReportUser() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    let history = useHistory();
    return (
        <>
        <Modal show={show} onHide={handleClose}>
        <form action='http://localhost:5000/submitBug' method='post' >
        <Modal.Header closeButton>
          <Modal.Title><h3> Sumbit</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="form-group">
                <label>Enter bug title:</label>
                <input
                  name="title"
                  type="title"
                  className="form-control"
                  placeholder="Enter Bug title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Explain us what is the problme : </label>
                <input
                  name="description"
                  type="description"
                  className="form-control"
                  placeholder="Enter description"
                  required
                />
              </div>
       </Modal.Body>
        <Modal.Footer>
        <button type="submit" className="btn btn-primary btn-block" onClick={() => history.goBack()} >
                Sumbit 
              </button>
        </Modal.Footer>
        </form>
      </Modal>
        </> 
       ); 
      }
      