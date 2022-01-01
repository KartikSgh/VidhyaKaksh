import { Link, useNavigate } from "react-router-dom";
import "../CSS/main.css";
import "../CSS/reset.css";
import "../CSS/class.css";
import personsvg from "../images/person.svg";
import mailsvg from "../images/mail.svg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import Axios from "axios";

const PeopleComponent = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.role);
  const classCode = useSelector((state) => state.classCode);

  const [peopleList, updatePeopleList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/people", {
      params: {
        classId: classCode,
      },
    })
      .then((res) => {
        updatePeopleList(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 400) {
          navigate("/home");
        }
      });
  }, [updatePeopleList, classCode, navigate]);

  function renderAddPeople() {
    if (role === 0) {
      return (
        <form className="d-flex gap-2 mb-4 border-bottom pb-3">
          <div className="flex-grow-1">
            <input
              type="email"
              className="form-control py-2"
              placeholder="Add Teacher by Email"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      );
    } else {
      return null;
    }
  }

  function renderList(role) {
    return peopleList.map((item) => {
      var name = item.username;
      var Email = item.email;

      if (item.role === role) {
        return (
          <li
            key={Email}
            className="d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center">
              <div className="avatar me-3">
                <img src={personsvg} alt="Avatar" />
              </div>
              <span className="fs-5">{name}</span>
            </div>

            <div>
              <Link
                to="#"
                onClick={(e) => {
                  window.location = "mailto:" + Email;
                  e.preventDefault();
                }}
              >
                <div className="d-inline-flex btn btn-primary me-2">
                  <img src={mailsvg} alt="mail" />
                </div>
              </Link>
            </div>
          </li>
        );
      } else {
        return null;
      }
    });
  }

  return (
    <>
      {/* <!-- Header --> */}
      <HeaderComponent />

      {/* <!-- Teachers --> */}
      <section className="container border py-4 bg-white space-header">
        <div>
          <h2 className="text-success border-bottom pb-3 mb-4">Teachers</h2>
        </div>

        {renderAddPeople()}

        <ul className="d-flex flex-column gap-4">{renderList(0)}</ul>
      </section>

      {/* <!-- Students --> */}
      <section className="container mt-4 border py-4 bg-white">
        <div>
          <h2 className="text-success border-bottom pb-3 mb-4">Students</h2>
        </div>

        {renderAddPeople()}

        <ul className="d-flex flex-column gap-4">{renderList(1)}</ul>
      </section>
    </>
  );
};

export default PeopleComponent;
