import { Link } from "react-router-dom";
import "../CSS/login.css";
const LoginComponent = () => {
  return (
    <div className="login">
      <Link to="/home" className="btn btn-primary">
        Login
      </Link>
    </div>
  );
};
export default LoginComponent;
