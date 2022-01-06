import React , { useState, useEffect, Componant}from "react";
import {Container,Row, Col,Button,Modal,ListGroup,Table,DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { BsBugFill } from 'react-icons/bs';


const ButtonStyle1={
    mergin:"10px",
    borderColor:"black",
    color:"black",
    height:"50px",
   borderColor:"black",
    backgroundColor:"Lightblue",
    margin:"10px",
  }

  const ButtonStyle2={
    mergin:"Auto",
    borderColor:"black",
    color:"white",
    width:"80px",
   borderColor:"black",
    backgroundColor:"Lightblue",
    
  }

  

export default function BugReport()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [priority, setPriority] = useState('');
    const [ShowBuglist, setBugList] = useState([]);


     useEffect(() => {
        fetch('http://localhost:5000/getBugsTech',{
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
        <td>
        <p1>Choose bug priority:</p1>
         <DropdownButton>
         <DropdownItem> <Button onClick={()=>setPriority('low priority')} style={{backgroundColor:"green",color:"black"}}>Low priotity</Button></DropdownItem>
         <DropdownItem> <Button onClick={()=>setPriority('medium priority')} style={{backgroundColor:"yellow",color:"black"}}>medium priotity</Button></DropdownItem>
         <DropdownItem> <Button onClick={()=>setPriority('high priority')} style={{backgroundColor:"red",color:"black"}}> high priotity</Button></DropdownItem>
         </DropdownButton>
        </td>
        <td ><form action="http://localhost:5000/ChangeBugStatusTech" method="post">
          <Button name="id" value={bug.id} type="submit" style={{backgroundColor:bug.statuscolor,color:"black"}}>[{bug.status}]-Change Status</Button>
          <input name="priority" value={priority} hidden="true"></input></form></td>
        <td><form action="http://localhost:5000/deleteBug" method="post"  ><button name="id" value={bug.id} type="submit" >Delete bug report</button></form></td>
        
     </tr>
             )   
  };
 return (
    <>


<Button style={ButtonStyle1} variant="primary" onClick={handleShow}><BsBugFill/>Bug reports</Button>
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
       <th>Status</th>
       <td>priority</td>
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

 