import React , { useState, useEffect, Componant}from "react";
import {Container,Row, Col,Button,Modal,ListGroup,Table,Dropdown,DropdownButton,} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { BiEnvelope } from 'react-icons/bi';
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


export default function UserMesseges()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [ShowMsglist, setMsgList] = useState([]);
    const[UserId,setUserId]=useState('');
    const[rating,setUserrating]=useState('');

   function notEmpty(props){
     if(props==="Treated"){
     return(
      <td>
      <p1>Rate this answer:</p1>
       <DropdownButton >
       <DropdownItem onClick={()=>setUserrating(1)}>1 </DropdownItem>
       <DropdownItem onClick={()=>setUserrating(2)}>2 </DropdownItem>
       <DropdownItem onClick={()=>setUserrating(3)}>3 </DropdownItem>
       <DropdownItem onClick={()=>setUserrating(4)}>4 </DropdownItem>
       <DropdownItem onClick={()=>setUserrating(5)}>5 </DropdownItem>
       <form action="/RateTechSupport"><button >submit</button></form>
       </DropdownButton>
       
      </td>

);
}
   }

     useEffect(() => {
        fetch('http://localhost:5000/getMessageTech',{
            credentials: "include"
         })
          .then(response => response.json())
           .then(object => setMsgList(object))
        },[]);
    const ListMsg = (msg) => {

      return (
        <tr>
        <td>{msg.traveler_id}</td>
        <td>{msg.id}</td>
        <td>{msg.title}</td>
        <td>{msg.description}</td>
        <td>{msg.answer}</td>
        <td>{notEmpty(msg.status)}</td>
        

     </tr>
             )   
  };
 return (
    <>


<form ><Button style={ButtonStyle2}variant="primary" onClick={handleShow}><BiEnvelope/></Button></form>
  <Modal size="xl" show={show} onHide={handleClose}>
  <form action='http://localhost:5000/getMessageTech' method='post' name="id" >
  <Modal.Header closeButton>
    <Modal.Title><h3> Messege list:</h3></Modal.Title>
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
       <th>rating</th>
    </tr>
  </thead>
  <tbody>
 {ShowMsglist.map(ListMsg)} 
  </tbody>
</Table>
</div>
   </Modal.Body>
    <Modal.Footer>
    <UserAddMessege/>         
    </Modal.Footer>
    </form>
  </Modal>
    </> 
   ); 
 }
