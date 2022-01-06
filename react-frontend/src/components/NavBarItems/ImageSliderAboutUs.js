import React, { useState } from "react";
import { Modal } from "react-bootstrap";
export default function ImageSliderActivate2() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <>
        <Modal size="xl" show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div>
          <img 
        src="https://i.postimg.cc/gjpBx4HX/2.png"
         />
      </div>
       </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
        </> 
       ); 
      }
      