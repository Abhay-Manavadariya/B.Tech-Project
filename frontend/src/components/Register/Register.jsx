import React from "react";
import { useState } from "react";
import "./Register.css";
import logo from "../../images/logo2.png";
import { Alert } from "reactstrap";
import axiosApi from "../../Common/BaseUrl"; 

const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    warning: "",
    success: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleChanges = (differentParam) => (event) => {
    setValues({ ...values, [differentParam]: event.target.value });
  };

  var { warning, success } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = values;

    if (!name || !email || !password) {
      setValues({
        ...values,
        warning: "Please enter all the required field.",
        success: "",
      });
      return;
    } else {
      const passwordInputValue = values.password.trim();
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;
      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);
      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Password is empty";
      } else if (!uppercasePassword) {
        errMsg = "At least one Uppercase";
      } else if (!lowercasePassword) {
        errMsg = "At least one Lowercase";
      } else if (!digitsPassword) {
        errMsg = "At least one digit";
      } else if (!specialCharPassword) {
        errMsg = "At least one Special Characters";
      } else if (!minLengthPassword) {
        errMsg = "At least minumum 8 characters";
      } else {
        errMsg = "";
      }

      //  console.log("error message : ",errMsg);

      if (errMsg) {
        setValues({
          ...values,
          warning: errMsg,
          success: "",
          name: name,
          password: "",
          email: email,
        });
        return;
      } else {
        const user = { name, email, password };

        let success;
        let warning;
        await axiosApi
          .post("api/signup", user)
          .then((response) => {
            console.log("response :- ",response);
            if (response.status === 201) {
              success = "User signed up successfully. Please Login."
            } else {
              warning = "The task you trying to perform is temporarily unavailable"
            }
          });

        setValues({
          ...values,
          success: success,
          warning: warning,
          name: "",
          password: "",
          email: "",
        });
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (event) => {
    setShowPassword(event.target.checked);
  };

  return (
    <>
      <div className="Signin">
        <div className="Input_division">
          <div className="Website_logo_title_div">
            {/* <div classNameName="Website_logo_div">
              <img src={logo} alt="image" className="Website_logo" />
            </div> */}
            <div className="Website_title" style={{ letterSpacing: "0.1rem" }}>
              Signup
            </div>
          </div>

          <form>
            <div className="Input_option_division">
              <div className="col-lg-4 col-md-12 col-sm-12 offset-lg-4">
                {warning
                  ? warning && (
                      <Alert
                        color="primary"
                        style={{ color: "rgb(211 114 53)" }}
                      >
                        {warning}
                      </Alert>
                    )
                  : success && (
                      <Alert color="success" style={{ color: "#2ce7e5" }}>
                        {success}
                      </Alert>
                    )}
              </div>

              <div className="Input">
                <input
                  type="text"
                  className="form-control Input_option"
                  placeholder="Emailaddress"
                  aria-label="emailAddress"
                  aria-describedby="basic-addon1"
                  name="emailaddress"
                  value={values.email}
                  onChange={handleChanges("email")}
                  required
                />
              </div>

              <div className="Input">
                <input
                  type="text"
                  className="form-control Input_option"
                  placeholder="Name"
                  aria-label="name"
                  aria-describedby="basic-addon1"
                  onChange={handleChanges("name")}
                  name="name"
                  value={values.name}
                  required
                />
              </div>

              <div className="Input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control Input_option"
                  placeholder="Password"
                  aria-label="password"
                  aria-describedby="basic-addon1"
                  id="showpassword"
                  name="password"
                  value={values.password}
                  onChange={handleChanges("password")}
                  required
                />
              </div>

              <div className="input-group-text Check_password_div">
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  value=""
                  aria-label="Checkbox for following text input"
                  checked={showPassword}
                  onChange={handleShowPassword}
                />
                <span className="Check_password_text">Show Password</span>
              </div>

              <button
                className="Submit_button"
                name="signin"
                onClick={handleSubmit}
                style={{cursor:"pointer"}}
              >
                SignUp
              </button>
            </div>
          </form>

          <div className="Login_forget_password">
            <a href="/login" style={{ textDecoration: "none" }}>
              <div className="Login">Already have an account?</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
