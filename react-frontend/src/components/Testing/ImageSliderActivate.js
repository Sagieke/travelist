import ImageSlider from './ImageSlider';
import { SliderData } from '../Pages/SliderData';
import Login from '../NavBarItems/login.component';
import SignUp from '../NavBarItems/signup.component';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem ,NavDropdownItem, onClick,onSelect,use,Container} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

export default function LoginNavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
<Container>
<Navbar.Brand href="/UserPage">TraveList</Navbar.Brand>
<Nav className="me-auto">
<Nav.Link href="/login"> Login  </Nav.Link>
<Nav.Link href="/signup"> Sign up </Nav.Link>

</Nav>
</Container>
</Navbar>

   <ImageSlider slides={SliderData} />

 </div>   
   

  );

  }

