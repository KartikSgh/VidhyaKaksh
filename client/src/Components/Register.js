import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index.js";
import Axios from "axios";
import loginProfile from "../images/loginProfile.jpg";
import "../CSS/login.css";

const Register = () => {
  const [emailReg, setemailReg] = useState("");
  const [usernameReg, setusernameReg] = useState("");
  const [passwordReg, setpasswordReg] = useState("");
  const [confirmpasswordReg, setconfirmpasswordReg] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { changeEmail } = bindActionCreators(actionCreators, dispatch);

  const signUp = (e) => {
    e.preventDefault();
    if (passwordReg !== confirmpasswordReg) {
      document.getElementById("error").innerHTML = "password not matched";
      return;
    }
    Axios.post("http://localhost:3001/register", {
      email: emailReg,
      username: usernameReg,
      password: passwordReg,
      confirmpassword: confirmpasswordReg,
    })
      .then(() => {
        changeEmail(emailReg);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };

  return (
    <>
      <div className="container">
        <div className="row m-5 no-gutters shadow-lg">
          <div className="col-md-6 d-none d-md-block">
            <img src={loginProfile} className="img-cover" alt="study" />
          </div>
          <div className="col-md-6 bg-white p-5">
            <h3 className="pb-3">Register</h3>
            <form onSubmit={signUp}>
              <div className="form-style">
                <div className="form-group pb-3">
                  <input
                    type="email"
                    onChange={(e) => {
                      setemailReg(e.target.value);
                    }}
                    placeholder="Email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    required
                  />
                </div>
                <div className="form-group pb-3">
                  <input
                    type="text"
                    onChange={(e) => {
                      setusernameReg(e.target.value);
                    }}
                    placeholder="Username"
                    className="form-control"
                    aria-describedby="emailHelp"
                    required
                  />
                </div>
                <div className="form-group pb-3">
                  <input
                    type="password"
                    onChange={(e) => {
                      setpasswordReg(e.target.value);
                    }}
                    placeholder="Password"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group pb-3">
                  <input
                    type="password"
                    onChange={(e) => {
                      setconfirmpasswordReg(e.target.value);
                    }}
                    placeholder="Confirm-Password"
                    className="form-control"
                    required
                  />
                </div>

                <div className="pb-2 text-center">
                  <button
                    type="submit"
                    className="btn btn-dark w-100 font-weight-bold mt-2"
                  >
                    Register
                  </button>
                  <span className="text-danger" id="error"></span>
                </div>

                <div className="pt-4 text-center">
                  Already have an account
                  <Link to="/Login"> Login </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
