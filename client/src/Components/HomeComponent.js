import { Link } from "react-router-dom";
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
const HomeComponent = () => {
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
        <Link to="/" className="logo me-3">
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
            <img
              className="popup__avatar cursor-pointer"
              src={personsvg}
              alt="Avatar"
            />
            <p className="popup__email">youremail@gmail.com</p>
            <a className="popup__link" href="edit.html" target="_blank">
              Manage your account
            </a>
            <div className="popup__logout mt-auto cursor-pointer">Log Out</div>

            <div className="popup__pseudo"></div>
          </div>
        </div>

        <div className="d-flex gap-3">
          <span className="flex-center text-nowrap d-none d-md-flex">
            Welcome student
          </span>
          <input className="form-control py-2" placeholder="Search for class" />
          <button
            className="btn btn-primary py-2"
            style={{ whiteSpace: "nowrap" }}
          >
            Search
          </button>
          <button
            className="btn btn-dark py-2"
            style={{ whiteSpace: "nowrap" }}
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
          Find class
        </button>

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
                    className="form-control py-3"
                    placeholder="Class code"
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
                    data-bs-dismiss="modal"
                  >
                    Find
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
                      className="form-control py-3"
                      placeholder="Class Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control py-3"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="mb-3">
                    <input className="form-control py-3" placeholder="Room" />
                  </div>
                  <div>
                    <p>Choose background</p>
                    <div className="backgrounds">
                      <div className="background h-100 cursor-pointer">
                        <img
                          className="img-cover rounded"
                          src={image1}
                          alt="Background"
                        />
                      </div>
                      <div className="background h-100 cursor-pointer">
                        <img
                          className="img-cover rounded"
                          src={image2}
                          alt="Background"
                        />
                      </div>
                      <div className="background h-100 cursor-pointer">
                        <img
                          className="img-cover rounded"
                          src={image3}
                          alt="Background"
                        />
                      </div>
                      <div className="background h-100 cursor-pointer">
                        <img
                          className="img-cover rounded"
                          src={image4}
                          alt="Background"
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
