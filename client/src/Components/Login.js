import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index.js";
import Axios from "axios";
import loginProfile from "../images/loginProfile.jpg";
import "../CSS/login.css";

const Login = () => {
  const [emailReg, setemailReg] = useState("");
  const [passwordReg, setpasswordReg] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { changeEmail } = bindActionCreators(actionCreators, dispatch);

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      email: emailReg,
      password: passwordReg,
    })
      .then(() => {
        changeEmail(emailReg);
        navigate("/home");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          document.getElementById("error").innerHTML = err.response.data;
        }
        console.log(err);
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
            <h3 className="pb-3">Login</h3>
            <form onSubmit={login}>
              <div className="form-style">
                <div className="form-group pb-3">
                  <input
                    type="email"
                    onChange={(e) => {
                      setemailReg(e.target.value);
                    }}
                    placeholder="Email"
                    className="form-control"
                    id="exampleInputEmail1"
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
                    id="exampleInputPassword1"
                    required
                  />
                </div>

                <div className="pb-2 text-center">
                  <button
                    type="submit"
                    className="btn btn-dark w-100 font-weight-bold mt-2"
                  >
                    Login
                  </button>
                  <span className="text-danger" id="error"></span>
                </div>

                <div className="pt-4 text-center">
                  Don't have an account
                  <Link to="/Register"> Register </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
