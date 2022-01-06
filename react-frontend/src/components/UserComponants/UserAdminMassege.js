import React , { useState, useEffect}from "react";
import {Modal,Table} from "react-bootstrap";

//requirement number 10
export default function UserAdminMesseges()  {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const [ShowMsglist, setMsgList] = useState([]);

     useEffect(() => {
        fetch('http://localhost:5000/getMessageAdmin',{
            credentials: "include"
         })
          .then(response => response.json())
           .then(object => setMsgList(object))
        },[]);
    const ListMsg = (msg) => {

      return (
        <tr>
        <td>{msg.id}</td>
        <td>{msg.title}</td>
        <td>{msg.description}</td>
        
        

     </tr>
             )   
  };
 return (
    <>



  <Modal size="lg" show={show} onHide={handleClose}>
  <form action='http://localhost:5000/getMessageAdmin' method='post' name="id" >
  <Modal.Header closeButton>
    <Modal.Title><h3>Admin Messege list:</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div style={{'height': '300px', 'overflow':'scroll', 'display': 'block',}}>
    <Table striped bordered hover size="sm">
  <thead>
    <tr>
      
      <th> id</th>
       <th>massege title</th>
       <th>massege description</th>
      
    </tr>
  </thead>
  <tbody>
 {ShowMsglist.map(ListMsg)} 
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
