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
           .then(object => setUserList(object))
        },[]);
    const ListUsr = (lui) => {

      return (
        <tr>
        <td>{lui.id}</td>
        <td>{lui.username}</td>
        <td>{lui.usertype}</td>
      </tr>
             )   
  };
return (
    <>
  
    <Button variant="primary" onClick={handleShow}>User List</Button>
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
    </tr>
  </thead>
  <tbody>
 {ShowUserList.map(ListUsr)} 

  </tbody>
</Table>
</div>
   </Modal.Body>
    <Modal.Footer>
           User list:
    </Modal.Footer>
    </form>
  </Modal>
    </> 
   ); 
  }