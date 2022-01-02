import React , { useState, useEffect, }from "react";
import {Container,Row, Col,Button,Modal,ListGroup,Table,Dropdown,DropdownButton} from "react-bootstrap";
import ChangeRoleTech from "./ChangeRoleTech";
import DropdownItem from "react-bootstrap/esm/DropdownItem";



const MakeAdminButtonStyle={
  mergin:"10px",
  borderColor:"black",
  width: '150px',
  height: '30px',
  backgroundColor:"purple",
  color:"white",
}

const MakeTechButtonStyle={
  mergin:"10px",
  borderColor:"black",
  width: '150px',
  height: '30px',
  backgroundColor:"grey",
  color:"white",
}

const DeleteButtonStyle={
  mergin:"10px",
  borderColor:"black",
  backgroundColor:"red",
  Color:"black",
  width:"300px",
  height: '30px'
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




export default function UserListTech()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [id, setid] = useState('');
    const [role, setRole] = useState('');
    const [ShowUserList, setUserList] = useState([]);

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
 <td><ChangeRoleTech id={lui.id}/></td>
      </tr>
             )   
  };
return (
    <>

    <Button style={ButtonStyle1} variant="primary" onClick={handleShow}>User List</Button>
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
      <th>change role</th>
     
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