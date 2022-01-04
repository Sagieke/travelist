import React , { useState, useEffect, Componant}from "react";
import {Container,Row, Col,Button,Modal,ListGroup,Table,Dropdown,DropdownButton,} from "react-bootstrap";
import { FiTrash } from 'react-icons/fi';
import AddFAQ from "../AddingComponants/AddFaq";
import EditFAQ from "../Pages/EditFAQ";




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


export default function Faq()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [ShowFaqlist, setFaqList] = useState([]);


     useEffect(() => {
        fetch('http://localhost:5000/getFAQ',{
            credentials: "include"
         })
          .then(response => response.json())
           .then(object => setFaqList(object))
        },[]);
    const ListFAQ = (lfq) => {

      return (
        <tr>
        <td>{lfq.id}</td>
        <td>{lfq.question}</td>
        <td>{lfq.answer}</td>
        <td>
       <form action="http://localhost:5000/deleteFAQ" method="post" >  <Button style={DeleteFaqStyleButton} name= "id" type="submit" value={lfq.id}><FiTrash/>Delete </Button></form>
        </td>
        <td><EditFAQ id={lfq.id} question={lfq.question} answer={lfq.answer}/></td>

     </tr>
             )   
  };
 return (
    <>


<Button style={ButtonStyle2}variant="primary" onClick={handleShow}>FAQ</Button>
  <Modal size="lg" show={show} onHide={handleClose}>
  <form action='http://localhost:5000/addFAQ' method='post' >
  <Modal.Header closeButton>
    <Modal.Title><h3> Question list</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div style={{'height': '300px', 'overflow':'scroll', 'display': 'block',}}>
    <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th> #</th>
       <th>Question</th>
       <th>Answer</th>
       <th>Delete FAQ</th>
       <th>Edit FAQ</th>
    </tr>
  </thead>
  <tbody>
 {ShowFaqlist.map(ListFAQ)} 
  </tbody>
</Table>
</div>
   </Modal.Body>
    <Modal.Footer>
    <AddFAQ/>         
    </Modal.Footer>
    </form>
  </Modal>
    </> 
   ); 
 }
