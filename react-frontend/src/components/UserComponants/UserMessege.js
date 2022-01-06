import React , { useState, useEffect} from "react";
import {Modal} from "react-bootstrap";
import UserAddMessege from "./UserAddMessege";
import HoverRating from "../Testing/starRating";

//Requirement number 13
export default function UserMesseges()  {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const [ShowMsglist, setMsgList] = useState([]);
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
