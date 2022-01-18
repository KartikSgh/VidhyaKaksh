import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
const AssignmentComponenet = () => {
  const navigate = useNavigate();
  const assignmentId = useSelector((state) => state.assignmentId);
  const role = useSelector((state) => state.role);
  const email = useSelector((state) => state.email);
  const classCode = useSelector((state) => state.classCode);

  const [assignment, setAssignment] = useState({
    name: "",
    message: "",
    fileLocation: null,
    fileName: "",
    duetime: "",
  });

  const [submission, setSubmission] = useState({
    submissionFile: null,
    submissionLocation: null,
    submissionName: "",
    submissionDateAndTime: "",
  });

  const fetchAssignment = useCallback(() => {
    Axios.get("http://localhost:3001/assignment", {
      params: {
        assignmentId: assignmentId,
      },
    })
      .then((res) => {
        setAssignment(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }, [assignmentId]);

  const fetchSubmission = useCallback(() => {
    Axios.get("http://localhost:3001/assignment/submission", {
      params: {
        assignmentId: assignmentId,
        email: email,
        classId: classCode,
      },
    })
      .then((res) => {
        if (res.data.length === 1) {
          setSubmission(res.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }, [assignmentId, email, classCode]);

  useEffect(() => {
    if (assignmentId === -1) {
      navigate("/home");
    } else {
      fetchAssignment();
      fetchSubmission();
    }
  }, [navigate, assignmentId, fetchAssignment, fetchSubmission]);

  function renderAttachment() {
    if (assignment.fileLocation !== null) {
      return (
        <a href={assignment.fileLocation} target="_blank" rel="noreferrer">
          <div className="d-inline-flex m-3 bg-light p-2 border cursor-pointer">
            <span className="fs-5">{assignment.fileName}</span>
          </div>
        </a>
      );
    } else {
      return null;
    }
  }

  function renderSubmissionStatus() {
    if (submission.submissionDateAndTime === "") {
      var temp = new Date(assignment.duetime);
      const timediff = 330;
      const msInSec = 60000;
      var duetime = new Date(temp - timediff * msInSec);
      var current = new Date();
      if (current.getTime() > duetime.getTime()) {
        return <span className="fs-6 text-danger">Missing</span>;
      } else {
        return null;
      }
    } else {
      var datetime = new Date(assignment.duetime);
      var subtime = new Date(submission.submissionDateAndTime);
      if (subtime.getTime() > datetime.getTime()) {
        return <span className="fs-6 text-danger">Turned in late</span>;
      } else {
        return <span className="fs-6 text-primary">Turned in</span>;
      }
    }
  }

  function renderSubmissionFile() {
    if (submission.submissionName === "") {
      return (
        <div className="col btn m-2 p-2 border">
          <label
            htmlFor="submissionFile"
            className="cursor-pointer text-primary fw-bold"
          >
            Create Submission
          </label>
        </div>
      );
    } else {
      return (
        <div className="col border bg-light text-center fs-4 overflow-hidden">
          <a
            href={submission.submissionLocation}
            target="_blank"
            rel="noreferrer"
          >
            {submission.submissionName}
          </a>
        </div>
      );
    }
  }

  function handleSubmitAssignment() {
    const formData = new FormData();
    formData.append("file", submission.submissionFile);
    formData.append("fileName", submission.submissionName);
    formData.append("classId", classCode);
    formData.append("email", email);
    formData.append("assignmentId", assignmentId);

    Axios.post("http://localhost:3001/assignment/createSubmission", formData)
      .then(() => {
        fetchSubmission();
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }

  function renderSubmissionButtonMessage() {
    if (submission.submissionFile) {
      if (role === 0) {
        return (
          <div className="row my-2 p-2 ">
            <button className="col btn btn-primary text-white" disabled>
              Mark as Done
            </button>
          </div>
        );
      } else {
        return (
          <div className="row my-2 p-2 ">
            <button
              className="col btn btn-primary text-white"
              onClick={() => {
                handleSubmitAssignment();
              }}
            >
              Mark as Done
            </button>
          </div>
        );
      }
    } else {
      return (
        <div className="row my-2 p-2 ">
          <button className="col btn btn-primary text-white" disabled>
            Mark as Done
          </button>
        </div>
      );
    }
  }

  return (
    <>
      <HeaderComponent />
      <main className="container space-header">
        <section className="py-4 px-3 mb-5">
          <div className="row">
            <div
              className="
            col-11 col-lg-8
            bg-white
            align-items-center
            justify-content-between
            m-2
            shadow
            rounded
          "
            >
              <div className="row border-bottom mt-3">
                <div className="col-11 col-md-8 my-auto text-center">
                  <h2 className="flex-grow-1 text-success">
                    {assignment.name}
                  </h2>
                </div>
                <div className="col-11 col-md-3 text-center">
                  <time className="mx-2 my-auto">
                    <h5>
                      Due :{" "}
                      {assignment.duetime
                        .replace(".000Z", "")
                        .replace("T", " ")}
                    </h5>
                  </time>
                </div>
              </div>
              <div className="d-flex p-3 border-bottom">
                <span className="fs-4">{assignment.message}</span>
              </div>
              {renderAttachment()}
            </div>
            <div
              className="
            col-11 col-lg-3
            align-items-center
            justify-content-between
            m-2
            "
            >
              <div className="p-4 bg-white shadow rounded">
                <div className="row">
                  <div className="col my-auto">
                    <span className="fs-4">Your Work</span>
                  </div>
                  <div className="col my-auto text-end">
                    {renderSubmissionStatus()}
                  </div>
                </div>

                <div className="row my-3">{renderSubmissionFile()}</div>
                <div>{renderSubmissionButtonMessage()}</div>
              </div>
            </div>
          </div>
        </section>
        <input
          type="file"
          id="submissionFile"
          style={{ opacity: "0", position: "absolute", zIndex: "-1" }}
          onChange={(e) => {
            setSubmission({
              submissionFile: e.target.files[0],
              submissionLocation: null,
              submissionName: e.target.files[0].name,
              submissionDateAndTime: "",
            });
          }}
        />
      </main>
    </>
  );
};
export default AssignmentComponenet;
