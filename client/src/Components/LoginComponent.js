import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index.js";
import "../CSS/login.css";

const LoginComponent = () => {
  let navigate = useNavigate();
  //useSelect is used for accessing the states
  const value = useSelector((state) => state.value);

  //dispatch is used for updating the states
  const dispatch = useDispatch();
  //bindActionCreators is used for binding actionCreators and dispatch function so that we can use it easily
  //An example is given below what we would had to write if we do not use bindActionCreators
  const { testAdd, testSubtract } = bindActionCreators(
    actionCreators,
    dispatch
  );
  function fun() {
    //force redirect
    navigate("/class");
  }
  //Link is used for make href type component and redirect to another page

  return (
    <div className="login">
      <div>
        <Link to="/home" className="btn btn-primary mx-2">
          Login
        </Link>
        <Button className="btn btn-danger mx-2" onClick={fun}>
          classes
        </Button>
      </div>
      <div>Redux Example</div>
      <div>
        <h1>{value}</h1>
      </div>
      <div>
        {/*
          without using bindActionCreators
  <Button
          className="btn btn-success mx-2"
          onClick={() => {
            dispatch(actionCreators.testAdd(1));
          }}
        >
  */}
        <Button
          className="btn btn-success mx-2"
          onClick={() => {
            testAdd(1);
          }}
        >
          +
        </Button>
        <Button
          className="btn btn-success mx-2"
          onClick={() => {
            testSubtract(1);
          }}
        >
          -
        </Button>
      </div>
    </div>
  );
};
export default LoginComponent;
