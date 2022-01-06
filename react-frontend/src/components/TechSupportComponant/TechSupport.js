
import React from "react";
import {Row,ListGroup} from "react-bootstrap";
import Faq from "../NavBarItems/FAQ";
import UserListTech from "./UserListTech";
import BugReportTech from "./BugReportsTech";
import SuggestionsTech from "./SuggestionsTech";
import TechMesseges from "./MassegesTech";


export default function techSupport()  {
 



    return (

      <div className="auth-wrapper">
          <Row>
        <div className="auth-inner-left">
          <h1>Tech support options:</h1>
          <hr class="my-4"></hr>
          <Row>

          <ListGroup defaultActiveKey="#link1" as="ol" numbered>
            
          
          
        </ListGroup>
          </Row>
          <br />
          <Row>
           <UserListTech/> 
        <Faq/>
        <BugReportTech/>
        <SuggestionsTech/>
        <TechMesseges/>
          </Row>
          </div>
          <br />
          </Row>
        </div>

    );

}