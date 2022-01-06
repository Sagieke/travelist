import React , { useState, useEffect, Componant}from "react";
import {Container,Row, Col,Button,Modal,ListGroup,Table,Dropdown,DropdownButton,AccordionButton,Accordion,ButtonToolbar,ButtonGroup} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { BiEnvelope } from 'react-icons/bi';
import AddFAQ from "../AddingComponants/AddFaq";
import UserAddMessege from "./UserAddMessege";
import { useHistory } from "react-router-dom";
import HoverRating from "../Testing/starRating";


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
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [ShowMsglist, setMsgList] = useState([]);
    const[UserId,setUserId]=useState('');
    const[rating,setUserrating]=useState(0.0);
    let history = useHistory();





   function notEmpty(props,props2){
     if(props==="Treated"){
       if(rating===0.0){
     return(
      <td>
      <p1>Rate this answer:</p1>
      
  
         <HoverRating/>
        
        
        
        </td>
     )
     


        }

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
     

<div className="auth-inner-FAQ2">
<Accordion style={{overflow:"Auto"}} defaultActiveKey="0" flush>
<Accordion.Item>
<Accordion.Header><label>question title: </label> { msg.title}</Accordion.Header>
<Accordion.Body><label>question description: </label>{msg.description}</Accordion.Body>
<Accordion.Body><label>Support answer:</label>{msg.answer}</Accordion.Body>
<Accordion.Body><label>question status:</label>{msg.status}</Accordion.Body>
<Accordion.Body>{<HoverRating tech_id={msg.tech_id} status={msg.status} msg_id={msg.id}/>} </Accordion.Body>

</Accordion.Item>
</Accordion>
</div>
             )   
  };
  

 return (
    <>



  <Modal size="xl" show={show} onHide={handleClose}>
  <form action='http://localhost:5000/getMessageTech' method='post' name="id" >
  <Modal.Header closeButton>
    <Modal.Title><h3> My support tickets:</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div style={{'height': '600px', 'overflow':'scroll', 'display': 'block',}}>
   <Accordion>
 {ShowMsglist.map(ListMsg)} 
 </Accordion>
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
