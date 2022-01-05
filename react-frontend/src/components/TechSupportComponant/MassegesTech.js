import React , { useState, useEffect, Componant}from "react";
import {Container,Row, Col,Button,Modal,ListGroup,Table,Dropdown,DropdownButton,} from "react-bootstrap";
import { BiEnvelope } from 'react-icons/bi';
import EditFAQ from "../Pages/EditFAQ";
import AddAnswer from "./AddAnswer";






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


export default function TechMesseges()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [ShowMsglist, setMsgList] = useState([]);
    const[UserId,setUserId]=useState('');
    const[rating,setRatingTech]=useState();



    useEffect(() => {
      fetch('http://localhost:5000/GetTechSupportRating',{
          credentials: "include"
       })
        .then(response => response.json())
         .then(object => setRatingTech(object))
      },[]);
      
      
     useEffect(() => {
        fetch('http://localhost:5000//getAllMessageTech',{
            credentials: "include"
         })
          .then(response => response.json())
           .then(object => setMsgList(object))
        },[]);
    const ListMsg = (msg) => {

      return (
        <tr>
        <td>{msg.user_id}</td>
        <td>{msg.id}</td>
        <td>{msg.title}</td>
        <td>{msg.description}</td>
        <td>{msg.answer}</td>
        <td><AddAnswer id={msg.id} /></td>   
        <td>{msg.rating}</td>
             
        

     </tr>
             )   
  };
 return (
    <>


<form ><Button style={ButtonStyle2}variant="primary" onClick={handleShow}><BiEnvelope/>View masseges</Button></form>
  <Modal size="lg" show={show} onHide={handleClose}>
  <form action='http://localhost:5000//getAllMessageTech' method='post' name="id" >
  <Modal.Header closeButton>
    <Modal.Title><h3> Your rating is : {rating}</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div style={{'height': '300px', 'overflow':'scroll', 'display': 'block',}}>
    <Table striped bordered hover size="sm">
  <thead>
    <tr>
      
      <th> user id</th>
       <th>massege id</th>
       <th>title</th>
       <th>Description</th>
       <th>answer</th>
       
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
