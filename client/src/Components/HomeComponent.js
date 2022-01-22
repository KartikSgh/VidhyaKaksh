import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index.js";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ClassCardComponent from "./ClassCardComponent";
import "../CSS/common.css";
import "../CSS/reset.css";
import "../CSS/main.css";
import "../CSS/home.css";
import personsvg from "../images/person.svg";
import applesvg from "../images/apple.svg";
import image1 from "../images/image1.png";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const HomeComponent = () => {
  const email = useSelector((state) => state.email);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { addClassCard, changeEmail } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [className, setClassName] = useState("");
  const [classSubject, setClassSubject] = useState("");
  const [classCode, setClassCode] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("image1.png");

  useEffect(() => {
    Axios.defaults.withCredentials = true;
    login();
  });

  function login() {
    Axios.get("http://localhost:3001/login")
      .then((res) => {
        changeEmail(res.data.userEmail);
      })
      .catch(() => {
        navigate("/Login");
      });
  }

  function logout() {
    Axios.get("http://localhost:3001/logout")
      .then(() => {
        navigate("/Login");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(err);
        }
      });
  }

  //function calls when submit button of ADD CLASS modal is clicked
  function handleAddNewClass() {
    Axios.post("http://localhost:3001/home/addClass", {
      email: email,
      className: className,
      classSubject: classSubject,
      bgImage: backgroundImage,
    })
      .then((res) => {
        addClassCard({
          classId: res.data.classCode,
          name: className,
          subject: classSubject,
          bgImage: backgroundImage,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddExistingClass() {
    document.getElementById("errorInJoinClass").innerHTML = "";
    var reg = /^\d+$/;
    if (!reg.test(classCode)) {
      document.getElementById("errorInJoinClass").innerHTML =
        "Only number is allowed in code.";
      return;
    }

    Axios.post("http://localhost:3001/home/joinClass", {
      email: email,
      classCode: parseInt(classCode),
    })
      .then((res) => {
        addClassCard({
          classId: res.data.classId,
          name: res.data.name,
          subject: res.data.subject,
          bgImage: res.data.bgImage,
        });
      })
      .catch((err) => {
        if (err.response) {
          document.getElementById("errorInJoinClass").innerHTML =
            err.response.data;
        } else {
          console.log(err);
        }
      });
  }

  //function to highlight the image choosen
  function handleBackgroundImageChange(image) {
    document
      .getElementById("image1.png")
      .classList.remove("border", "border-4", "border-primary");
    document
      .getElementById("image2.jpg")
      .classList.remove("border", "border-4", "border-primary");
    document
      .getElementById("image3.jpg")
      .classList.remove("border", "border-4", "border-primary");
    document
      .getElementById("image4.jpg")
      .classList.remove("border", "border-4", "border-primary");
    document
      .getElementById(image)
      .classList.add("border", "border-4", "border-primary");
    setBackgroundImage(image);
  }

  return (
    <>
      {/* {header} */}

      <header
        className="
      fixed-top
      header
      shadow
      d-flex
      justify-content-between
      px-4
      py-3
      bg-white
    "
      >
        <Link to="/" className="logo ml-3">
          <img src={applesvg} alt="Logo" />
        </Link>

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
            <Link className="popup__link" to="#" target="_blank">
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

        <div className="d-flex gap-3">
          <span className="flex-center text-nowrap d-none d-md-flex">
            Welcome student
          </span>

          <button
            className="btn btn-dark py-2"
            style={{ whiteSpace: "nowrap" }}
            onClick={() => logout()}
          >
            Log Out
          </button>
        </div>
      </header>

      {/* {find class} */}

      <section className="container space-header mb-2">
        <button
          type="button"
          className="btn btn-dark"
          style={{ whiteSpace: "nowrap" }}
          data-bs-toggle="modal"
          data-bs-target="#modal-student"
        >
          Join class
        </button>

        <p className="text-danger mt-2" id="errorInJoinClass"></p>

        <div
          className="modal fade"
          id="modal-student"
          tabIndex="-1"
          style={{ display: "none" }}
          aria-hidden="true"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Class Code</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <form className="">
                <div className="mx-3 my-3">
                  <input
                    type="number"
                    className="form-control py-3"
                    placeholder="Class code"
                    onChange={(e) => setClassCode(e.target.value)}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary py-2"
                    style={{ whiteSpace: "nowrap" }}
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary py-2"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => handleAddExistingClass()}
                    data-bs-dismiss="modal"
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* {add class} */}

      <section className="container mb-2">
        <button
          type="button"
          className="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#modal-teacher"
        >
          Add new class
        </button>

        <div
          className="modal fade"
          id="modal-teacher"
          tabIndex="-1"
          style={{ display: "none" }}
          aria-hidden="true"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add new class</h5>
                <button
                  type="button"
                  className="btn-close btn-modal"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <form className="">
                <div className="mx-3 my-3">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control py-3"
                      placeholder="Class Name"
                      onChange={(e) => setClassName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control py-3"
                      placeholder="Subject"
                      onChange={(e) => setClassSubject(e.target.value)}
                    />
                  </div>
                  <div>
                    <p>Choose background</p>
                    <div className="backgrounds">
                      <div className="background h-100 cursor-pointer">
                        <img
                          className="img-cover rounded"
                          src={image1}
                          id="image1.png"
                          alt="Background"
                          onClick={() =>
                            handleBackgroundImageChange("image1.png")
                          }
                        />
                      </div>
                      <div className="background h-100 cursor-pointer">
                        <img
                          className="img-cover rounded"
                          src={image2}
                          id="image2.jpg"
                          alt="Background"
                          onClick={() =>
                            handleBackgroundImageChange("image2.jpg")
                          }
                        />
                      </div>
                      <div className="background h-100 cursor-pointer">
                        <img
                          className="img-cover rounded"
                          src={image3}
                          id="image3.jpg"
                          alt="Background"
                          onClick={() =>
                            handleBackgroundImageChange("image3.jpg")
                          }
                        />
                      </div>
                      <div className="background h-100 cursor-pointer">
                        <img
                          className="img-cover rounded"
                          src={image4}
                          id="image4.jpg"
                          alt="Background"
                          onClick={() =>
                            handleBackgroundImageChange("image4.jpg")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary btn-modal"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleAddNewClass()}
                    data-bs-dismiss="modal"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ClassCardComponent />
    </>
  );
};
export default HomeComponent;
