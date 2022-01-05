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
    const[rating,setUserrating]=useState(0.0);






   function notEmpty(props,props2){
     if(props==="Treated"){
       if(rating===0.0){
     return(
      <td>
      <p1>Rate this answer:</p1>
      <form action="http://localhost:5000/RateTechSupport" method="post" > 
         <DropdownButton>
         <DropdownItem> <Button type="submit" onClick={()=>setUserrating(1)} style={{backgroundColor:"green",color:"black"}}>1</Button></DropdownItem>
         <DropdownItem> <Button type="submit" onClick={()=>setUserrating(2)} style={{backgroundColor:"lightgreen",color:"black"}}>2</Button></DropdownItem>
         <DropdownItem> <Button type="submit" onClick={()=>setUserrating(3)} style={{backgroundColor:"lightyellow",color:"black"}}> 3</Button></DropdownItem>
         <DropdownItem> <Button type="submit" onClick={()=>setUserrating(4)} style={{backgroundColor:"lightred",color:"black"}}> 4</Button></DropdownItem>
         <DropdownItem> <Button type="submit" onClick={()=>setUserrating(5)} style={{backgroundColor:"red",color:"black"}}> 5</Button></DropdownItem>
         </DropdownButton>
         <input value={rating} name="rating" hidden="true"></input>
         <input value={props2} name="id" hidden="true"></input>
         <button type="submit">submit</button>
         </form>
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
        <tr>
        <td>{msg.title}</td>
        <td>{msg.description}</td>
        <td>{msg.answer}</td>
        <td>{notEmpty(msg.status,msg.tech_id)}</td>
        

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
