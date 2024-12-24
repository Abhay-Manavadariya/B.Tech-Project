import React, {useState} from "react";
import "./login.css";
import logo from '../../images/logo1.png';

const Login = () => {

  const initialvalues = {
    email: "",
    password: ""
  };

  const [values, setValues] = useState(initialvalues);

  const handleChanges = (differentParam) => (event) => {
    setValues({ ...values, [differentParam]: event.target.value });
  };

  var { email,password } = values;

  console.log(email);
  console.log(password);


  const handleSubmit = () => {

  }

  return (
    <>
      <div className="Signin">
        <div className="Input_division">
          <div className="Website_logo_title_div">
            <div className="Website_title">Signin</div>
            <div classNameName="Website_logo_div">
              <img src={logo} alt="image" className="Website_logo" />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="Input_option_division">
              <div className="Input">
                <input
                  type="text"
                  className="form-control Input_option"
                  placeholder="Emailaddress"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  name="emailaddress"
                  onChange={handleChanges("email")}
                />
              </div>

              <div className="Input">
                <input
                  type="password"
                  className="form-control Input_option"
                  placeholder="Password"
                  aria-label="password"
                  aria-describedby="basic-addon1"
                  id="showpassword"
                  name="password"
                  onChange={handleChanges("password")}
                />
              </div>

              <div className="input-group-text Check_password_div">
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  value=""
                  aria-label="Checkbox for following text input"
                  onclick="myFunction()"
                />
                <span className="Check_password_text">Show Password</span>
              </div>

              <button className="Submit_button" name="signin">
                Signin
              </button>
            </div>
          </form>

          <div className="Login_forget_password">
            <a href="/register" style={{ textDecoration: "none" }}>
              <div className="Login">Create account ?</div>
            </a>
            <a href="" style={{ textDecoration: "none" }}>
              <div className="forget_password">Forget Password?</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
