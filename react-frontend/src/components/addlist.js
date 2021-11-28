import React ,{ useState }from "react";
import {Container,Row, Col,Button,Modal,Form} from "react-bootstrap";
export default function  AddList()  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ListName, setListName] = useState('');
    const [color, setcolor] = useState('');
    return (
        <>
      <Button variant="primary" onClick={handleShow}>
      add list
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h3> add list</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>   <div className="form-group">
          <label>name of new list</label>
          <input
            className="form-control"
            placeholder="Enter name to your new list"
            onChange={event => setListName(event.target.value)}
          />
        </div>
        <label>pick color</label>
        <Form.Control
            
            type="color"
            size="lg"
            id="exampleColorInput"
            defaultValue="#563d7c"
            title="Choose your color"
            onChange={event => setcolor(event.target.value)}
        />
       </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={() => { handleClose(); console.log(color);console.log(ListName)}}>
          add list
         </Button>
        </Modal.Footer>
      </Modal>
    </>   
    );
  
}
