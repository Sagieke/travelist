import React , { useState, useEffect}from "react";
import {Button,Modal,Table} from "react-bootstrap";
import { MdOutlineSettingsSuggest} from 'react-icons/md';

const ButtonStyle1={
    mergin:"10px",
    color:"black",
    height:"50px",
   borderColor:"black",
    backgroundColor:"Lightyellow",
    margin:"10px",
  }

  
 

  const DeleteSegStyleButton={
    borderColor:"black",
    width: '150px',
    height: '60px',
    backgroundColor:"red",
    color:"black",
  }
  
// Requirement number 210
export default function SuggestionsAdmin()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [ShowSuglist, setSugList] = useState([]);


     useEffect(() => {
        fetch('http://localhost:5000/getSuggestionsAdmin',{
            credentials: "include"
         })
          .then(response => response.json())
           .then(object => setSugList(object))
        },[]);
    const SugList = (sgs) => {

      return (
        <tr>
        <td>{sgs.id}</td>
        <td>{sgs.title}</td>
        <td>{sgs.description}</td>
        <td>{sgs.status}<form action="http://localhost:5000/ChangeSuggestionStatusAdmin" method="post"><Button name="id" value={sgs.id} type="submit" > change to "processed"</Button></form></td>
        <td><form action="http://localhost:5000/deleteSuggestion" method="post"  ><button style={DeleteSegStyleButton}name="id" value={sgs.id} type="submit" >Delete Suggestions</button></form></td>
        
     </tr>
             )   
  };
 return (
    <>


<Button style={ButtonStyle1} variant="primary" onClick={handleShow}>< MdOutlineSettingsSuggest/>Suggestion list </Button>
  <Modal size="lg" show={show} onHide={handleClose}>
  <form action='http://localhost:5000/ChangeBugStatusTech' method='post' >
  <Modal.Header closeButton>
    <Modal.Title><h3> Suggestion list:</h3></Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div style={{'height': '300px', 'overflow':'scroll', 'display': 'block',}}>
    <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th> id</th>
       <th>title</th>
       <th>description</th>
       <th>ststus</th>
       <td>delete</td>
    </tr>
  </thead>
  <tbody>
 {ShowSuglist.map(SugList)} 
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

 