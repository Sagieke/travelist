import React , { useState, useEffect, Componant}from "react";
import {Container,Row, Col,Button,Modal,ListGroup,Table,Dropdown,DropdownButton,} from "react-bootstrap";
import AddFAQ from "../AddingComponants/AddFaq";

const ButtonStyle1={
    mergin:"10px",
    borderColor:"black",
    color:"black",
    height:"50px",
   borderColor:"black",
    backgroundColor:"Lightblue",
    margin:"10px",
  }



export default function BugReport()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [ShowBuglist, setBugList] = useState([]);


     useEffect(() => {
        fetch('http://localhost:5000/getBug',{
            credentials: "include"
         })
          .then(response => response.json())
           .then(object => setBugList(object))
        },[]);
    const BugList = (bug) => {

      return (
        <tr>
        <td>{bug.id}</td>
        <td>{bug.title}</td>
        <td>{bug.description}</td>
        <td>{bug.InTreatment}</td>
        <td>
       <form action="http://localhost:5000/submitBug" method="post" >  <Button  name= "id" className="float-end" type="submit"  >Add bugRerport </Button></form>
        </td>

     </tr>
             )   
  };
 return (
    <>


<Button style={ButtonStyle1} variant="primary" onClick={handleShow}>Bug reports</Button>
  <Modal size="lg" show={show} onHide={handleClose}>
  <form action='http://localhost:5000//submitBug' method='post' >
  <Modal.Header closeButton>
    <Modal.Title><h3> Question list</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div style={{'height': '300px', 'overflow':'scroll', 'display': 'block',}}>
    <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th> id</th>
       <th>title</th>
       <th>description</th>
       <th>InTreatment</th>
    </tr>
  </thead>
  <tbody>
 {ShowBuglist.map(BugList)} 
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

 