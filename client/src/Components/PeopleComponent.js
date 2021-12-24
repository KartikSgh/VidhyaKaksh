import { Link } from "react-router-dom";
import "../CSS/common.css";
import "../CSS/main.css";
import "../CSS/reset.css";
import "../CSS/class.css";
import personsvg from "../images/person.svg";
import applesvg from "../images/apple.svg";
import mailsvg from "../images/mail.svg";

const PeopleComponent = () => {
  return (
    <>
      {/* <!-- Header --> */}
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
        <Link to="#" className="logo mr-3">
          <img src={applesvg} alt="Logo" />
        </Link>

        <nav className="d-flex align-items-center gap-3">
          <Link
            className="d-flex align-items-center text-secondary"
            to="/class"
          >
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
            <img
              className="popup__avatar cursor-pointer"
              src={personsvg}
              alt="Avatar"
            />
            <p className="popup__email">youremail@gmail.com</p>
            <Link className="popup__link" to="edit.html" target="_blank">
              Manage your account
            </Link>
            <div className="popup__logout mt-auto cursor-pointer">Log Out</div>

            <div className="popup__pseudo"></div>
          </div>
        </div>
      </header>

      {/* <!-- Teachers --> */}
      <section className="container border py-4 bg-white space-header">
        <div>
          <h2 className="text-success border-bottom pb-3 mb-4">Teachers</h2>
        </div>

        <form className="d-flex gap-2 mb-4 border-bottom pb-3">
          <div className="flex-grow-1">
            <input
              type="email"
              className="form-control py-2"
              placeholder="Add Teacher by Email"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Find
          </button>
        </form>

        <ul className="d-flex flex-column gap-4">
          <li className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="avatar me-3">
                <img src={personsvg} alt="Avatar" />
              </div>
              <span className="fs-5">Teacher 1</span>
            </div>

            <div>
              <div className="d-inline-flex btn btn-primary me-2">
                <img src={mailsvg} alt="mail" />
              </div>
            </div>
          </li>
          <li className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="avatar me-3">
                <img src={personsvg} alt="Avatar" />
              </div>
              <span className="fs-5">Teacher 1</span>
            </div>

            <div>
              <div className="d-inline-flex btn btn-primary me-2">
                <img src={mailsvg} alt="mail" />
              </div>
            </div>
          </li>
        </ul>
      </section>

      {/* <!-- Students --> */}
      <section className="container mt-4 border py-4 bg-white">
        <div>
          <h2 className="text-success border-bottom pb-3 mb-4">Students</h2>
        </div>

        <form className="d-flex gap-2 mb-4 border-bottom pb-3">
          <div className="flex-grow-1">
            <input
              type="email"
              className="form-control py-2"
              placeholder="Add Student by Email"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Find
          </button>
        </form>

        <ul className="d-flex flex-column gap-4">
          <li className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="avatar me-3">
                <img src={personsvg} alt="Avatar" />
              </div>
              <span className="fs-5">Student 1</span>
            </div>

            <div>
              <div className="d-inline-flex btn btn-primary me-2">
                <img src={mailsvg} alt="mail" />
              </div>
            </div>
          </li>
          <li className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="avatar me-3">
                <img src={personsvg} alt="Avatar" />
              </div>
              <span className="fs-5">Student 1</span>
            </div>

            <div>
              <div className="d-inline-flex btn btn-primary me-2">
                <img src={mailsvg} alt="mail" />
              </div>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
};

export default PeopleComponent;
