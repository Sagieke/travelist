import React , { useState, useEffect, }from "react";
import {Button,Modal,Table} from "react-bootstrap";
import { FiUsers } from 'react-icons/fi';
import AddNewJobAdmin from "./AddNewJobAdmin";



const ButtonStyle1={
  
  mergin:"10px",
  color:"black",
  height:"50px",
 borderColor:"black",
  backgroundColor:"purple",
  margin:"10px",
}



//Requirement number 209
export default function AddJobsAdmin()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [ShowUserList, setUserList] = useState([]);

     useEffect(() => {
        fetch('http://localhost:5000/getJobs',{
            credentials: "include"
         })
          .then(response => response.json())
           .then(object => setUserList(object))
        },[]);
    const ListUsr = (lui) => {

      return (
        <tr>
        <td>{lui.id}</td>
        <td>{lui.title}</td>
        <td>{lui.description}</td>
        <td>{lui.requirements}</td>
        <td><form action="http://localhost:5000/deleteJob" method="post"  ><button name="id" value={lui.id} type="submit" >Delete job</button></form></td>
       </tr>
             )   
  };
return (
    <>

    <Button style={ButtonStyle1} variant="primary" onClick={handleShow}><FiUsers/>View Jobs</Button>
    <Modal size="lg" show={show} onHide={handleClose}>
    <form action='http://localhost:5000/login' method='post' >
    <Modal.Header closeButton>
      <Modal.Title><h3> User list :</h3></Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div style={{'height': '300px', 'overflow':'scroll', 'display': 'block'}}>
    <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>#</th>
      <th>title</th>
      <th>description</th>
      <th>requirements</th>
     
     
    </tr>
  </thead>
  <tbody>
 {ShowUserList.map(ListUsr)} 
  </tbody>
</Table>
</div>
   </Modal.Body>
    <Modal.Footer>
   <AddNewJobAdmin/>
    </Modal.Footer>
    </form>
  </Modal>
    </> 
   ); 
  }