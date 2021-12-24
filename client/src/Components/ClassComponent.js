import { Link } from "react-router-dom";
import "../CSS/common.css";
import "../CSS/main.css";
import "../CSS/reset.css";
import "../CSS/class.css";
import personsvg from "../images/person.svg";
import applesvg from "../images/apple.svg";
import uploadsvg from "../images/upload.svg";

const ClassComponent = () => {
  return (
    <>
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
            <Link className="popup__link" to="/" target="_blank">
              Manage your account
            </Link>
            <div className="popup__logout mt-auto cursor-pointer">Log Out</div>

            <div className="popup__pseudo"></div>
          </div>
        </div>
      </header>

      <main className="container">
        {/* <!-- Banner --> */}
        <section
          className="
          d-flex
          flex-column
          gap-2
          space-header
          banner
          text-white
          bg-secondary
          px-3
          py-4
          rounded
        "
        >
          <h1 className="banner__class">Front end class</h1>
          <div className="fs-4">
            <span>Teacher: </span>
            <span className="banner__teacher">Teacher name</span>
          </div>
          <div className="fs-4">
            <span>Subject: </span>
            <span className="banner__subject">HTML, CSS, JavaScript</span>
          </div>
          <div className="fs-4">
            <span>Room: </span>
            <span className="banner__room">1234</span>
          </div>
        </section>

        {/* <!-- Content --> */}
        <section className="container mt-5">
          <div className="row">
            <div className="col col-lg-3 d-none d-lg-block">
              <div className="border pt-4 px-4 pb-5">
                <div className="mb-4">Upcoming</div>
                <p className="mb-5">Woohoo, no work due soon!</p>
                <Link to="/class" className="d-block text-success text-end">
                  View All
                </Link>
              </div>
            </div>

            <div className="col col-lg-9">
              {/* <!-- Click to show input area --> */}
              <button
                className="
                d-flex
                align-items-center
                shadow
                rounded
                px-3
                py-4
                bg-success
                text-primary
                cursor-pointer
                w-100
                mb-4
              "
                data-bs-toggle="modal"
                data-bs-target="#modal-input"
              >
                <div className="avatar me-3">
                  <img src={personsvg} alt="Avatar" />
                </div>
                <span className="text-white">
                  Announce something to your class
                </span>
              </button>

              <div
                className="modal fade"
                id="modal-input"
                tabIndex="-1"
                style={{ display: "none" }}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header mb-3">
                      <div className="d-flex align-items-center">
                        <img
                          className="avatar me-3"
                          src={personsvg}
                          alt="Avatar"
                        />
                        <div className="text-success">
                          Write your announcement
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div className="px-3 mb-3">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a comment here"
                          id="floatingTextarea2"
                          style={{ height: "100px" }}
                        ></textarea>
                        <label
                          htmlFor="floatingTextarea2"
                          className="text-black-50"
                        >
                          Announcement
                        </label>
                      </div>
                    </div>

                    <div className="modal-footer d-flex justify-content-between">
                      <div>
                        <label
                          className="upload cursor-pointer"
                          htmlFor="upload"
                        >
                          <img
                            className="img-cover"
                            src={uploadsvg}
                            alt="Upload"
                          />
                        </label>
                        <input id="upload" type="file" />
                      </div>
                      <div className="d-flex">
                        <button
                          type="button"
                          className="btn btn-secondary py-2 me-2"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary py-2"
                          data-bs-dismiss="modal"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ul>
                <li className="bg-white px-3 py-4 rounded shadow">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        className="avatar me-3"
                        src={personsvg}
                        alt="Avatar"
                      />
                      <h3 className="fs-5">Teacher</h3>
                    </div>
                    <div className="btn btn-dark text-white">&#x2716;</div>
                  </div>

                  <p className="border-bottom pb-3">Hi all my students!!</p>

                  <div className="fw-bold text-decoration-underline mb-4">
                    Comments:
                  </div>

                  <ul className="mt-2 border-bottom">
                    <li>
                      <div
                        className="
                        d-flex
                        align-items-center
                        justify-content-between
                        mb-3
                      "
                      >
                        <div className="d-flex align-items-center">
                          <img
                            className="avatar me-3"
                            src={personsvg}
                            alt="Avatar"
                          />
                          <div>
                            <h3 className="fs-6">Student</h3>
                            <time className="text-black-50">10 th 11</time>
                          </div>
                        </div>
                        <div className="btn btn-dark text-white">&#x2716;</div>
                      </div>
                      <p>Hi there!</p>
                    </li>
                  </ul>

                  <form className="d-flex align-items-center mt-4">
                    <img className="avatar me-3" src={personsvg} alt="Avatar" />
                    <input
                      className="flex-grow-1 border me-2 p-2"
                      placeholder="Write your comment..."
                    />
                    <button type="submit" className="btn btn-primary">
                      Send
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default ClassComponent;
