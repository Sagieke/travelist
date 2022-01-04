import React , { useState, useEffect, Componant}from "react";
import {Container,Row, Col,Button,Modal,ListGroup,Table,Dropdown,DropdownButton,} from "react-bootstrap";
import { GrUserAdmin } from 'react-icons/gr';
import AddFAQ from "../AddingComponants/AddFaq";
import UserAddMessege from "./UserAddMessege";




const ButtonStyle2={
  color:"black",
  height:"50px",
  borderColor:"black",
  backgroundColor:"Lightgreen",
  margin:"10px",
  
}
 


const DeleteFaqStyleButton={
  borderColor:"black",
  width: '150px',
  height: '30px',
  backgroundColor:"red",
  color:"black",
}


export default function UserAdminMesseges()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [ShowMsglist, setMsgList] = useState([]);
    const[UserId,setUserId]=useState('');


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


<form ><Button style={ButtonStyle2}variant="primary" onClick={handleShow}><GrUserAdmin/></Button></form>
  <Modal size="lg" show={show} onHide={handleClose}>
  <form action='http://localhost:5000/getMessageAdmin' method='post' name="id" >
  <Modal.Header closeButton>
    <Modal.Title><h3>Admin Messege list:</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div style={{'height': '300px', 'overflow':'scroll', 'display': 'block',}}>
    <Table striped bordered hover size="sm">
  <thead>
    <tr>
      
      <th> id</th>
       <th>massege title</th>
       <th>massege description</th>
      
    </tr>
  </thead>
  <tbody>
 {ShowMsglist.map(ListMsg)} 
  </tbody>
</Table>
</div>
   </Modal.Body>
    <Modal.Footer>         
    </Modal.Footer>
    </form>
  </Modal>
    </> 
   ); 
 }
