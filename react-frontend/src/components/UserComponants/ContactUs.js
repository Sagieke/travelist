import React , { useState, useEffect, Componant}from "react";
import {Container,Row, Col,Button,Modal,ListGroup,Table,Dropdown,DropdownButton,} from "react-bootstrap";
import { FaQuestionCircle } from 'react-icons/fa';
import AddFAQ from "../AddingComponants/AddFaq";
import EditFAQ from "../Pages/EditFAQ";
import { FaFrownOpen } from 'react-icons/fa';
const DeleteButtonStyle={
  flexDirection:'row',
  alignItems:'center',
  borderColor:"black",
  backgroundColor:"red",
  color:"black",
  width:"100px",
  height: '30px'
}


const ButtonStyle2={
    color:"black",
    height:"50px",
    borderColor:"black",
    backgroundColor:"yellow",
    margin:"10px",
    width:"200px",
    height:"50px",
    
  }

 
const DropDownButtonStyle={
  mergin:"10px",
  borderColor:"black",
  width: '150px',
  height: '30px',
  backgroundColor:"black",
  color:"white",
}
const EditFaqStyleButton={
  mergin:"10px",
  borderColor:"black",
  width: '150px',
  height: '30px',
  backgroundColor:"grey",
  color:"black",
}

const DeleteFaqStyleButton={
  mergin:"10px",
  borderColor:"black",
  width: '150px',
  height: '30px',
  backgroundColor:"red",
  color:"black",
}


export default function ContactUs()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [ShowFaqlist, setFaqList] = useState([]);



 return (
    <>


<Button style={ButtonStyle2}variant="primary" onClick={handleShow}><FaFrownOpen/>Contact us</Button>
  <Modal size="lg" show={show} onHide={handleClose}>
  <form action='http://localhost:5000/addFAQ' method='post' >
  <Modal.Header closeButton>
    <Modal.Title><h3>Contact us</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>
    
  <thead>
    <tr>
      <th> You can reach us at : WeDontFuckingCare@gmail.com</th>
       <th> Or :you can open a ticket and chat with our IT team</th>
    </tr>
  </thead>
  <tbody>
  
  </tbody>


   </Modal.Body>
    <Modal.Footer>
    </Modal.Footer>
    </form>
  </Modal>
    </> 
   ); 
 }
