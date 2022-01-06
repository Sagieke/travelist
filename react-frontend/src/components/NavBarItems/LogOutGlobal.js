import React from "react";
import {Button} from "react-bootstrap";
import BackButton from "./BackButton";

const ButtonStyle1={
    position: 'absolute',
    bottom:0,
    left:"200px",
    top:"35px",
    width:"80px",
    borderColor:"black",
    color:"black",
    height:"35px",
   borderColor:"black",
    backgroundColor:"lightgrey",
    margin:"1px",
  }
export default function LogOutGlobal(){
return(
<div className="container">
<div className="App-LogOut"> 
 <form action="http://localhost:5000/logout" method="post">
 <Button style={ButtonStyle1}className="float-end" type="submit">LogOut</Button>
 </form>
 <BackButton/>
 </div>
 </div>
 )
}













