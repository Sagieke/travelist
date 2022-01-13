import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ListPage from "./components/Pages/ListPage";
import UserPage from "./components/UserComponants/UserPage";
import LogOut from "./components/NavBarItems/LogOut";
import PlacePage from "./components/Pages/placepage";
import AdminPage from "./components/AdminComponants/AdminPage";
import techSupport from "./components/TechSupportComponant/TechSupport";
import UserFaq from "./components/UserComponants/UserFAQ";
import LoginErrorPage from "./components/Pages/LoginErrorPage";
import SignUpErrorPage from "./components/Pages/SignUpErrorPage";
import ForgotPasswordPage from "./components/UserComponants/ForgotPassword";
import JobListingsPage from "./components/Pages/JobListingsPage";
import JobPage from "./components/Pages/JobPage";
import SubmitBugReportUser from "./components/UserComponants/SubmitBugReportUser";
import Suggestions from "./components/UserComponants/Suggestions";
import UserAdminMesseges from "./components/UserComponants/UserAdminMassege";
import ImageSliderActivate2 from "./components/NavBarItems/ImageSliderAboutUs";
import UserMesseges from "./components/UserComponants/UserMessege";
import InsideUserNavbar from "./components/NavBarItems/NavBarInsideUser";
import LoginNavBar from "./components/Testing/ImageSliderActivate";
import PageNotFound from "./components/UserComponants/PageNotFound";
import ChangePassword from "./components/UserComponants/changepassword";
import Login from "./components/NavBarItems/login.component";
import SignUp from "./components/NavBarItems/signup.component";
import "./App.css";


function App() {
  return(

    <Router>
    
    <div className="App">
    
      
        <Switch>
        <Route exact path="/" component={LoginNavBar}/>
        <Route exact path="/signup" component={LoginNavBar}/>
        <Route exact path="/login" component={LoginNavBar}/>
        <Route exact path="/loginerror" component={LoginErrorPage}/>
        <Route exact path="/signuperror" component={SignUpErrorPage}/>
        <Route path="/" component={InsideUserNavbar}/>
        </Switch>
        <Switch>
              
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
              <Route exact path="/LogIn" component={Login}/>
              <Route exact path="/Logout" component={LogOut}/>
              <Route exact path="/Usermesseges" component={UserMesseges}/>
              <Route exact path="/Suggestions" component={Suggestions}/>
              <Route exact path="/Aboutus" component={ImageSliderActivate2}/>
              <Route exact path="/UserAdminMessege" component={UserAdminMesseges}/>
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/changePassword" component={ChangePassword}/>  
              <Route exact path="/" /> 
              <Route path="/" component={PageNotFound}/> 
              </Switch>
      
      </div>
    </Router>
    

  );
}

export default App;
