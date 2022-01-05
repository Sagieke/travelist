import React from "react";
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem ,NavDropdownItem} from 'react-bootstrap';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import logo from './logo.svg';
import ListPage from "./components/Pages/ListPage";
import MainPage from "./components/Pages/MainPage";
import UserPage from "./components/UserComponants/UserPage";
import LogOut from "./components/NavBarItems/LogOut";
import PlacePage from "./components/Pages/placepage";
import AdminPage from "./components/AdminComponants/AdminPage";
import techSupport from "./components/TechSupportComponant/TechSupport";
import ImageSliderAvtivate from "./components/Testing/ImageSliderActivate";
import UserFaq from "./components/UserComponants/UserFAQ";
import LoginErrorPage from "./components/Pages/LoginErrorPage";
import SignUpErrorPage from "./components/Pages/SignUpErrorPage";
import ForgotPasswordPage from "./components/UserComponants/ForgotPassword";
import JobListingsPage from "./components/Pages/JobListingsPage";
import JobPage from "./components/Pages/JobPage";
import SubmitBugReportUser from "./components/UserComponants/SubmitBugReportUser";
import LogOutGlobal from "./components/NavBarItems/LogOutGlobal";

import "./App.css";
import { Container } from "react-bootstrap";
function App() {
  return (
    <Router>
      <div className="App">
      <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand exact path="/">TraveList</Navbar.Brand>
    <Nav className="me-auto">
    <Nav.Link href="/userPage">login </Nav.Link>
    </Nav>
    </Container>
  </Navbar>
      <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">TraveList</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link exsact path="/userPage">Home page </Nav.Link>
      <Nav.Link href="/FAQ">FAQ</Nav.Link>
      <NavDropdown title="help" id="navbarSCrollingDropDown">
        <NavDropdown.Item>
          <button onClick={SubmitBugReportUser}>Bug report</button>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <button onClick={SubmitBugReportUser}>Submit a suggestion</button>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <button onClick={SubmitBugReportUser}>Create a support ticket </button>
        </NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="/FAQ">About us</Nav.Link>
      <Nav.Link href="/FAQ">Global messeges</Nav.Link>
      <Nav.Link href="/LogOut">Log-out</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
        <Switch>
        </Switch>
         
       
        <Switch>
              <Route exact path="/" component={ImageSliderAvtivate}/>
              <Route exact path="/userPage" component={UserPage}/>
              <Route exact path="/UserPage/places/place" component ={PlacePage}/>
              <Route exact path="/UserPage/" component ={ListPage}/>
              <Route exact path="/UserPage/places" component ={ListPage}/>
              <Route exact path="/adminpage" component={AdminPage}/>
              <Route exact path="/techsupport" component={techSupport}/>
              <Route exact path="/FAQ" component={UserFaq}/>
              <Route exact path="/loginerror" component={LoginErrorPage}/>
              <Route exact path="/signuperror" component={SignUpErrorPage}/>
              <Route exact path="/jobs" component={JobListingsPage}/>
              <Route exact path="/jobs/job" component={JobPage}/>
              <Route exact path="/Forgotpassword" component={ForgotPasswordPage}/>
              <Route exact path="/SubmitBugUser" component={SubmitBugReportUser}/>
              </Switch>
      
      </div>
    </Router>
    
  );
}

export default App;
