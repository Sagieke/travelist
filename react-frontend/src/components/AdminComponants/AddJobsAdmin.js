import React , { useState, useEffect, }from "react";
import {Container,Row, Col,Button,Modal,ListGroup,Table,Dropdown,DropdownButton} from "react-bootstrap";
import ChangeRole from "./ChangeRoleAdmin";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { BsFillTrashFill } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import AddNewJobAdmin from "./AddNewJobAdmin";

const MakeAdminButtonStyle={
  mergin:"10px",
  borderColor:"black",
  width: '150px',
  height: '30px',
  backgroundColor:"purple",
  color:"white",
}
const ButtonStyle2={
  width: '150px',
  mergin:"10px",
  borderColor:"black",
  color:"black",
 
 borderColor:"black",
  backgroundColor:"red",
  
}
const DeleteButtonStyle={
  width: '150px',
  mergin:"Auto",
  borderColor:"light black",
  backgroundColor:"red",
  Color:"black",
  
}

const ButtonStyle1={
  
  mergin:"10px",
  borderColor:"black",
  color:"black",
  height:"50px",
 borderColor:"black",
  backgroundColor:"Lightblue",
  margin:"10px",
}




export default function AddJobsAdmin()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [id, setid] = useState('');
    const [role, setRole] = useState('');
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

    <Button style={ButtonStyle1} variant="primary" onClick={handleShow}>View Jobs<FiUsers/></Button>
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