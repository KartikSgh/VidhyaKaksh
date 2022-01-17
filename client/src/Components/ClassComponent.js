import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index.js";
import "../CSS/main.css";
import "../CSS/reset.css";
import "../CSS/class.css";
import personsvg from "../images/person.svg";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import Axios from "axios";

const ClassComponent = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { changeAssignmentId } = bindActionCreators(actionCreators, dispatch);

  const email = useSelector((state) => state.email);
  const classCode = useSelector((state) => state.classCode);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [upcommingAssignments, setUpcommingAssignments] = useState([]);

  const updateAnnouncements = useCallback(() => {
    Axios.get("http://localhost:3001/class/announcements", {
      params: {
        classId: classCode,
      },
    })
      .then((res) => {
        setAnnouncements(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }, [classCode]);

  const updateComments = useCallback(() => {
    Axios.get("http://localhost:3001/class/comments", {
      params: {
        classId: classCode,
      },
    })
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }, [classCode]);

  const updateUpcommingAssignments = useCallback(() => {
    Axios.get("http://localhost:3001/class/upcommingAssignments", {
      params: {
        classId: classCode,
        email: email,
      },
    })
      .then((res) => {
        setUpcommingAssignments(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }, [classCode, email]);

  useEffect(() => {
    Axios.get("http://localhost:3001/class", {
      params: {
        classId: classCode,
      },
    })
      .then((res) => {
        setName(res.data.name);
        setSubject(res.data.subject);
        updateAnnouncements();
        updateComments();
        updateUpcommingAssignments();
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          if (err.response.status === 400) {
            navigate("/home");
          }
        }
      });
  }, [
    email,
    classCode,
    navigate,
    updateAnnouncements,
    updateComments,
    updateUpcommingAssignments,
  ]);

  function handleAnnouncementPost() {
    Axios.post("http://localhost:3001/class/postAnnouncement", {
      classId: classCode,
      email: email,
      message: announcement,
    })
      .then(() => {
        updateAnnouncements();
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }

  function handlePostComment(messageDate) {
    document.getElementById("comment").value = "";
    Axios.post("http://localhost:3001/class/postComment", {
      messageDate: messageDate,
      email: email,
      message: comment,
    })
      .then(() => {
        updateComments();
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }

  function handleDeletePost(time) {
    Axios.delete("http://localhost:3001/class/deletePost", {
      data: {
        time: time,
      },
    })
      .then(() => {
        updateAnnouncements();
        updateComments();
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }

  function handleDeleteComment(time) {
    Axios.delete("http://localhost:3001/class/deleteComment", {
      data: {
        time: time,
      },
    })
      .then(() => {
        updateComments();
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }

  function renderComments(messageDate) {
    var arr = [];
    for (var i = 0; i < comments.length; i++) {
      if (messageDate === comments[i].messageDate) {
        arr.push(comments[i]);
      }
    }
    if (arr.length === 0) {
      return null;
    } else {
      return (
        <>
          <div className="fw-bold text-decoration-underline mb-4">
            Comments:
          </div>
          {arr.map((comment) => {
            var name = comment.username;
            var time = comment.dateAndTime
              .replace(".000Z", "")
              .replace("T", " ");
            var text = comment.message;
            return (
              <ul key={time} className="mt-2 border-bottom">
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
                        <h3 className="fs-6">{name}</h3>
                        <time className="text-black-50">{time}</time>
                      </div>
                    </div>
                    <div
                      className="btn btn-dark text-white"
                      onClick={() => {
                        handleDeleteComment(time);
                      }}
                    >
                      &#x2716;
                    </div>
                  </div>
                  <p>{text}</p>
                </li>
              </ul>
            );
          })}
        </>
      );
    }
  }

  function renderAnnouncements() {
    return announcements.map((message) => {
      var username = message.username;
      var text = message.message;
      var dateAndTime = message.dateAndTime
        .replace(".000Z", "")
        .replace("T", " ");

      return (
        <ul key={dateAndTime}>
          <li className="bg-white px-3 py-4 rounded shadow">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center mb-3">
                <img className="avatar me-3" src={personsvg} alt="Avatar" />
                <div>
                  <h3 className="fs-5">{username}</h3>
                  <time className="text-black-50">{dateAndTime}</time>
                </div>
              </div>
              <div
                className="btn btn-dark text-white"
                onClick={() => {
                  handleDeletePost(dateAndTime);
                }}
              >
                &#x2716;
              </div>
            </div>

            <p className="border-bottom pb-3">{text}</p>

            {renderComments(message.dateAndTime)}

            <div className="d-flex align-items-center mt-4">
              <img className="avatar me-3" src={personsvg} alt="Avatar" />
              <input
                className="flex-grow-1 border me-2 p-2"
                id="comment"
                placeholder="Write your comment..."
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
                className="btn btn-primary"
                onClick={() => {
                  handlePostComment(dateAndTime);
                }}
              >
                Send
              </button>
            </div>
          </li>
        </ul>
      );
    });
  }

  function renderUpcommingAssignments() {
    if (upcommingAssignments.length === 0) {
      return "Woohoo, no work due soon!";
    } else {
      return (
        <ul>
          {upcommingAssignments.map((item) => {
            return (
              <li
                key={item.assignmentId}
                className="py-2 cursor-pointer text-primary"
                onClick={() => {
                  changeAssignmentId(item.assignmentId);
                  navigate("/class/classwork/assignment");
                }}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      );
    }
  }

  return (
    <>
      <HeaderComponent />

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
          <h1 className="banner__class">{name}</h1>
          <div className="fs-4">
            <span>Subject: </span>
            <span className="banner__subject">{subject}</span>
          </div>
          <div className="fs-4">
            <span>Room: </span>
            <span className="banner__room">{classCode}</span>
          </div>
        </section>

        {/* <!-- Content --> */}
        <section className="container mt-5">
          <div className="row">
            <div className="col col-lg-3 d-none d-lg-block">
              <div className="border pt-4 px-4 pb-5">
                <div className="mb-4">Upcoming</div>
                <div className="mb-5">{renderUpcommingAssignments()}</div>
                <Link
                  to="/class/classwork"
                  className="d-block text-success text-end"
                >
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
                          onChange={(e) => {
                            setAnnouncement(e.target.value);
                          }}
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
                        <label className="upload"></label>
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
                          onClick={handleAnnouncementPost}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {renderAnnouncements()}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default ClassComponent;
