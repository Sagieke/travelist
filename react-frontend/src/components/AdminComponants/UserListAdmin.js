import React , { useState, useEffect, }from "react";
import {Container,Row, Col,Button,Modal,ListGroup,Table,Dropdown,DropdownButton} from "react-bootstrap";
import ChangeRole from "./ChangeRoleAdmin";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { BsFillTrashFill } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';


const ButtonStyle2={
  width: '150px',
  mergin:"10px",
  borderColor:"black",
  color:"black",
 
 borderColor:"black",
  backgroundColor:"red",
  
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




export default function UserListAdmin()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [id, setid] = useState('');
    const [role, setRole] = useState('');
    const [ShowUserList, setUserList] = useState([]);

    function IfReported(name){
     if(name===true)
     {
       return <p>reported</p>
     }
     else{
       return <p>Not reported</p>
     }
    }




     useEffect(() => {
        fetch('http://localhost:5000/getUserlist',{
            credentials: "include"
         })
          .then(response => response.json())
           .then(object => setUserList(object))
        },[]);
    const ListUsr = (lui) => {

      return (
        <tr>
        <td>{lui.id}</td>
        <td>{lui.username}</td>
        <td>{lui.usertype}</td>
        <td><form action="http://localhost:5000/deleteUser" method="post" >
        <Button style={ButtonStyle2} name= "id" class="float-end" type="submit" value={lui.id} >Delete <BsFillTrashFill/></Button>
 </form></td>
       <td> <ChangeRole id={lui.id}/></td>
       <td>{IfReported(lui.reported)}</td>
      </tr>
             )   
  };
return (
    <>

    <Button style={ButtonStyle1} variant="primary" onClick={handleShow}><FiUsers/> User List  </Button>
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
      <th>email</th>
      <th>type</th>
      <th>Delete user</th>
      <th>Change role</th>
      <th>reported</th>
     
    </tr>
  </thead>
  <tbody>
 {ShowUserList.map(ListUsr)} 
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