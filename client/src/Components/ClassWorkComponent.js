//import { Link } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index.js";
import work from "../images/work.svg";
import "../CSS/main.css";
import "../CSS/reset.css";
import "../CSS/class.css";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const ClassWorkComponent = () => {
  const navigate = useNavigate();

  const role = useSelector((state) => state.role);
  const classCode = useSelector((state) => state.classCode);

  const dispatch = useDispatch();
  const { changeAssignmentId } = bindActionCreators(actionCreators, dispatch);

  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const [assignments, updateAssignments] = useState([]);

  const fetchAssignments = useCallback(() => {
    Axios.get("http://localhost:3001/classwork/assignments", {
      params: {
        classId: classCode,
      },
    })
      .then((res) => {
        updateAssignments(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }, [classCode]);

  useEffect(() => {
    fetchAssignments();
  }, [role, classCode, fetchAssignments]);

  function handleAssignment(assignmentId) {
    changeAssignmentId(assignmentId);
    navigate("/class/classwork/assignment");
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  function handleCreateAssignment() {
    if (
      assignmentTitle === "" ||
      assignmentDescription === "" ||
      dateAndTime === ""
    ) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("classId", classCode);
    formData.append("name", assignmentTitle);
    formData.append("message", assignmentDescription);
    formData.append("duetime", dateAndTime);

    Axios.post("http://localhost:3001/classwork/create", formData)
      .then(() => {
        fetchAssignments();
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }

  function renderButton() {
    if (role === 1) {
      return (
        <div className="d-flex align-items-center">
          <span className="fs-6 text-primary">Your homework</span>
        </div>
      );
    } else {
      return (
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="btn btn-primary "
            style={{ whiteSpace: "nowrap" }}
            data-bs-toggle="modal"
            data-bs-target="#modal-assignment"
          >
            Create Assignment
          </button>

          <p className="text-danger mx-3" id="errorInCreateAssignment"></p>

          <div
            className="modal fade"
            id="modal-assignment"
            tabIndex="-1"
            style={{ display: "none" }}
            aria-hidden="true"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">New Assignment</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <form>
                  <div className="mx-3 my-3">
                    <div className="mb-3">
                      <input
                        className="form-control py-3"
                        placeholder="Title"
                        onChange={(e) => {
                          setAssignmentTitle(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="form-control py-3"
                        placeholder="Discription"
                        rows="5"
                        onChange={(e) => {
                          setAssignmentDescription(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="dueTime">Due Time</label>
                      <input
                        id="dueTime"
                        type="datetime-local"
                        placeholder="Date and Time"
                        className="form-control py-3"
                        onChange={(e) => {
                          setDateAndTime(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="attachments">Attachments</label>
                      <input
                        id="attachments"
                        type="file"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          handleFileChange(e);
                        }}
                      />
                    </div>
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
                      onClick={() => {
                        handleCreateAssignment();
                      }}
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  function renderAssignments() {
    if (assignments.length === 0) {
      return <div>Wow! No Assignments.</div>;
    } else {
      return assignments.map((assignment) => {
        var AssignmentId = assignment.assignmentId;
        var AssignmentName = assignment.name;
        var AssignmentDueTime = assignment.duetime
          .replace(".000Z", "")
          .replace("T", " ");

        return (
          <div
            key={AssignmentId}
            className="d-flex align-items-center justify-content-between border py-3 px-3 my-4 cursor-pointer bg-light"
            onClick={() => {
              handleAssignment(AssignmentId);
            }}
          >
            <div className="d-flex align-items-center">
              <div className="square me-3">
                <img src={work} alt="Homework" />
              </div>
              <span className="fs-5">{AssignmentName}</span>
            </div>

            <time className="text-black-50"> {AssignmentDueTime} </time>
          </div>
        );
      });
    }
  }

  return (
    <>
      <HeaderComponent />
      <main className="container">
        {/* <!-- Options --> */}
        <section
          className="
          d-flex
          justify-content-between
          align-items-center
          mb-5
          space-header
        "
        >
          {renderButton()}
        </section>

        {/* <!-- Storage --> */}
        <section className="border py-4 px-3 bg-white mb-5">
          <div
            className="
            d-flex
            align-items-center
            justify-content-between
            border-bottom
            pb-3
            mb-4
          "
          >
            <h2 className="text-success">Assignments</h2>
          </div>
          {renderAssignments()}
        </section>
      </main>
    </>
  );
};

export default ClassWorkComponent;
