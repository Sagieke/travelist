import React, { useState,onClick } from "react";
import { Button, Modal,Dropdown,DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { BsFillBugFill } from 'react-icons/bs';
import { useHistory } from "react-router-dom";


  

const ButtonStyle1 = {
    width: "200px",
    borderColor: "black",
    color: "black",
    height: "50px",
    borderColor: "black",
    backgroundColor: "orange",
    margin: "1px",
}
//Requirement number 11
export default function SubmitBugReportUser() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [Priority, setPriority] = useState('');
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
                  onChange={event => setTitle(event.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>Explain us what is the problme : </label>
                <input
                  name="description"
                  type="description"
                  className="form-control"
                  placeholder="Enter description"
                  onChange={event => setDescription(event.target.value)} 
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
      