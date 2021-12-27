import React , { useState, useEffect, }from "react";
import {Container,Row, Col,Button,Modal,ListGroup,Table} from "react-bootstrap";


export default function UserList()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [ShowUserList, setUserList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/getUserlist',{
            credentials: "include"
          })
            .then(response => response.json())
            .then(object => console.log(object))
        },[]);
  
return (
    <>
  
    <Button variant="primary" onClick={handleShow}>User List</Button>
    <Modal size="lg" show={show} onHide={handleClose}>
    <form action='http://localhost:5000/login' method='post' >
    <Modal.Header closeButton>
      <Modal.Title><h3> User list :</h3></Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Table striped bordered hover size="sm"> 
    <tbody style={{'height': '300px', 'overflow':'scroll', 'display': 'block'}}> 

    <thead>
<th>ID</th>
<th>Emal adress</th>
<th>Type</th>

    </thead>
    
    
    
    
    
    </tbody>
   </Table>
   </Modal.Body>
    <Modal.Footer>
           User list:
    </Modal.Footer>
    </form>
  </Modal>
    </> 
   ); 
  }