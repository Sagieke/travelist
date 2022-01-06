import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BiMessageAdd } from 'react-icons/bi';
import { useHistory } from "react-router-dom";
import ImageSlider from '../Testing/ImageSlider';
import { SliderDataAboutUs } from './AboutUsPic';


export default function ImageSliderActivate2() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    let history = useHistory();

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
      