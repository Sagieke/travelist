import SignUp from "../NavBarItems/signup.component";
export default function SignUpErrorPage()  {

    return(
        <div className="auth-wrapper">
            <div className="auth-inner-center">
            <h1>Email already exists.</h1>
            <form action='http://localhost:5000/login' method='post' >
            <div className="form-group">
                <label>Email address</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
      
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label className="custom-control-label" htmlFor="customCheck1">
                    Remember me
                  </label>
                </div>
              </div>
              <a href="http://127.0.0.1:5000/test" target="_blank">forgot pass</a>
        <button type="submit" className="btn btn-primary btn-block" >
                log in
              </button>
        </form>
            or
            <SignUp/>
            </div>
        </div>
        
    );
}