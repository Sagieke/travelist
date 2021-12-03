import AddList from "./addlist";
import React from "react";
import {Row,ListGroup} from "react-bootstrap";

import  GetRequestHooks from "./react-hook-get";
import PostRequestHooks from "./react-hook-post";

export default function  UserPage()  {



    return (
    
       
    


      <div className="auth-wrapper">
          <Row>
        <div className="auth-inner-left">
          <h1>my lists</h1>
          <hr class="my-4"></hr>
          <Row>

          <ListGroup defaultActiveKey="#link1" as="ol" numbered>
            

        </ListGroup>
          </Row>
          <br />
          <Row>
         <AddList/>
          </Row>
          </div>
          <br />
          <div className="auth-inner-right">
          <h1>most search places</h1>
          <hr class="my-4"></hr>
          <GetRequestHooks/>
          </div>
          </Row>
        </div>

    );

}