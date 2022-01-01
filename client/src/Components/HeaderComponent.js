import { Link } from "react-router-dom";
import logout from "./utility/logout.js";
import personsvg from "../images/person.svg";
import applesvg from "../images/apple.svg";
import { useSelector } from "react-redux";
import "../CSS/common.css";

const HeaderComponent = () => {
  const email = useSelector((state) => state.email);
  const role = useSelector((state) => state.role);

  function renderGradeNav() {
    if (role === 0) {
      return (
        <Link
          className="d-flex align-items-center text-secondary"
          to="/class/grade"
        >
          Grade
        </Link>
      );
    } else {
      return null;
    }
  }

  return (
    <header
      className="
        fixed-top
        header
        shadow
        d-flex
        align-content-center
        gap-5
        px-4
        py-3
        bg-white
      "
    >
      <Link to="/" className="logo mr-3">
        <img src={applesvg} alt="Logo" />
      </Link>

      <nav className="d-flex align-items-center gap-3">
        <Link className="d-flex align-items-center text-secondary" to="/class">
          Stream
        </Link>
        <Link
          className="d-flex align-items-center text-secondary"
          to="/class/classwork"
        >
          Classwork
        </Link>
        <Link
          className="d-flex align-items-center text-secondary"
          to="/class/people"
        >
          People
        </Link>
        <Link
          className="d-flex align-items-center text-secondary"
          to="/class/material"
        >
          Material
        </Link>
        {renderGradeNav()}
      </nav>

      <div className="popup ms-auto">
        <div className="avatar me-3 cursor-pointer">
          <img src={personsvg} alt="Avatar" />
        </div>

        <div
          className="
            popup__content
            d-flex
            flex-column
            align-items-center
            shadow
            rounded-3
            bg-white
          "
        >
          <img className="popup__avatar" src={personsvg} alt="Avatar" />
          <p className="popup__email">{email}</p>
          <Link className="popup__link" to="/" target="_blank">
            Manage your account
          </Link>
          <div
            className="popup__logout mt-auto cursor-pointer"
            onClick={() => logout()}
          >
            Log Out
          </div>

          <div className="popup__pseudo"></div>
        </div>
      </div>
    </header>
  );
};
export default HeaderComponent;
