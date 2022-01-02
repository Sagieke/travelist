import React ,{ useState }from "react";
import {Button,Modal,Form} from "react-bootstrap";

const ButtonStyle1={
  width:"700px",
  borderColor:"black",
  color:"black",
  height:"35px",
 borderColor:"black",
  backgroundColor:"lightblue",
  margin:"1px",
}

export default function  AddList()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ListName, setListName] = useState('');
    const [color, setcolor] = useState('');


    return (
      
        <>
      <Button style={ButtonStyle1} variant="primary" onClick={handleShow}>
      add list
      </Button>
      <Modal show={show} onHide={handleClose}>
        <form action='http://localhost:5000/addlist' method='post'>
        <Modal.Header closeButton>
          <Modal.Title><h3> add list</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>   <div className="form-group">
          <label>name of new list</label>
          <input
            name="list_name"
            className="form-control"
            placeholder="Enter name to your new list"
            onChange={event => setListName(event.target.value)}
          />
        </div>
        <label>pick color</label>
        <Form.Control
            name="color"
            type="color"
            size="lg"
            id="exampleColorInput"
            defaultValue="#0066aa"
            title="Choose your color"
            onChange={event => setcolor(event.target.value)}
        />
       </Modal.Body>
        <Modal.Footer>
        <Button type="submit" variant="primary" onClick={() => { handleClose(); console.log(color);console.log(ListName)}}>
          add list
         </Button>
        </Modal.Footer>
        </form>
      </Modal>
    </>   
    );
  
}
