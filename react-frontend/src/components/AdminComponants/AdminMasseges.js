import React , { useState, useEffect}from "react";
import {Button,Modal,Table} from "react-bootstrap";
import { BiEnvelope } from 'react-icons/bi';
import AddMessageAdmin from "./AddmassegeAdmin";

const ButtonStyle1={
  mergin:"10px",
  borderColor:"black",
  color:"black",
  height:"50px",
  backgroundColor:"orange",
  margin:"10px",
}
//Requirement number 207
export default function AdminMessage()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [ShowMsglist, setMsgList] = useState([]);


     useEffect(() => {
        fetch('http://localhost:5000/getMessageAdmin',{
            credentials: "include"
         })
          .then(response => response.json())
           .then(object => setMsgList(object))
        },[]);
    const ListMsg = (msg) => {

      return (
        <tr>
        <td>{msg.id}</td>
        <td>{msg.title}</td>
        <td>{msg.description}</td>        
     </tr>
             )   
  };
 return (
    <>


<Button style={ButtonStyle1}variant="primary" onClick={handleShow}><BiEnvelope/>View masseges</Button>
  <Modal size="lg" show={show} onHide={handleClose}>
  <form action='http://localhost:5000//getAllMessageTech' method='post' name="id" >
  <Modal.Header closeButton>
    <Modal.Title><h3> Messege list:</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div style={{'height': '300px', 'overflow':'scroll', 'display': 'block',}}>
    <Table striped bordered hover size="sm">
  <thead>
    <tr>
      
      <th> id</th>
       <th>title</th>
       <th>description</th>
    
    </tr>
  </thead>
  <tbody>
 {ShowMsglist.map(ListMsg)} 
  </tbody>
</Table>
</div>
   </Modal.Body>
    <Modal.Footer> 
            <AddMessageAdmin/>
    </Modal.Footer>
    </form>
  </Modal>
    </> 
   ); 
 }
