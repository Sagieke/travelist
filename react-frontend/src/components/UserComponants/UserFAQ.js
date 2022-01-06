import React , { useState, useEffect}from "react";
import {Row,Accordion,} from "react-bootstrap";


export default function UserFaq()  {
    const [ShowFaqlist, setFaqList] = useState([]);


     useEffect(() => {
        fetch('http://localhost:5000/getFAQ',{
            credentials: "include"
         })
          .then(response => response.json())
           .then(object => setFaqList(object))
        },[]);
    const ListFAQ = (lfq) => {

      return (
        <div className="auth-inner-FAQ2">
        <Accordion style={{overflow:"Auto"}} defaultActiveKey="0" flush>
       <Accordion.Item>
        <Accordion.Header>{lfq.question}</Accordion.Header>
        <Accordion.Body>{lfq.answer}</Accordion.Body>
        </Accordion.Item>
        </Accordion>
        </div>
             )   
  };
 return (
   
  <div className="auth-wrapper">
          <Row>
        <div className="auth-inner-FAQ">
          <h1>FAQ'S:</h1>
          <hr class="my-4"></hr>
          <Row style={{height: '298px', overflow:'auto'}}>
          {ShowFaqlist.map(ListFAQ)}
          </Row>
          <br />
          <Row>
          </Row>
          </div>
          <br />
          </Row>
        </div>

    );

}