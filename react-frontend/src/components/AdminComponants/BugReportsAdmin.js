import React , { useState, useEffect}from "react";
import {Button,Modal,Table} from "react-bootstrap";
import { BsBugFill } from 'react-icons/bs';

const ButtonStyle1={
    mergin:"10px",
    color:"black",
    height:"50px",
   borderColor:"black",
    backgroundColor:"Lightgreen",
    margin:"10px",
  }
  
//Requirement number 206
export default function BugReportAdmin()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [ShowBuglist, setBugList] = useState([]);


     useEffect(() => {
        fetch('http://localhost:5000/getBugsAdmin',{
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
        <td>{bug.priority}</td>
        <td > <form action="http://localhost:5000//ChangeBugStatusAdmin" method="post"><Button name="id" value={bug.id}  type="submit"  style={{backgroundColor:bug.statuscolor,color:"black"}}>[{bug.status}]-Change Status</Button></form></td>
        <td><form action="http://localhost:5000/deleteBug" method="post"  ><button name="id" value={bug.id} type="submit" >Delete bug report</button></form></td>
        
     </tr>
             )   
  };
 return (
    <>


<Button style={ButtonStyle1} variant="primary" onClick={handleShow}><BsBugFill/>Bug reports </Button>
  <Modal size="lg" show={show} onHide={handleClose}>
  <form action='http://localhost:5000/ChangeBugStatusTech' method='post' >
  <Modal.Header closeButton>
    <Modal.Title><h3> Bug reports:</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div style={{'height': '300px', 'overflow':'scroll', 'display': 'block',}}>
    <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th> id</th>
       <th>title</th>
       <th>description</th>
       <th>bug priority</th>
       <th>Status</th>
       <th>discard</th>
    </tr>
  </thead>
  <tbody>
 {ShowBuglist.map(BugList)} 
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

 