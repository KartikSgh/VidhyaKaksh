import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
const GradeComponent = () => {
  const classCode = useSelector((state) => state.classCode);

  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);

  const [people, setPeople] = useState([]);

  const fetchAssignments = useCallback(() => {
    Axios.get("http://localhost:3001/grade/assignments", {
      params: {
        classId: classCode,
      },
    })
      .then((res1) => {
        setAssignments(res1.data);
        Axios.get("http://localhost:3001/grade/peoples", {
          params: {
            classId: classCode,
          },
        })
          .then((res) => {
            var dict = {};
            for (var i = 0; i < res.data.length; i++) {
              if (!dict[res.data[i].email]) {
                dict[res.data[i].email] = {
                  name: res.data[i].email,
                  marks: [],
                };
                for (var k = 0; k < res1.data.length; k++) {
                  dict[res.data[i].email].marks.push({
                    mark: -1,
                    assignmentId: -1,
                  });
                }
              }
              for (var j = 0; j < res1.data.length; j++) {
                dict[res.data[i].email].marks[j].assignmentId =
                  res1.data[j].assignmentId;
                if (res1.data[j].assignmentId === res.data[i].assignmentId) {
                  dict[res.data[i].email].marks[j].mark = res.data[i].marks;
                  break;
                }
              }
            }

            var arr = [];
            for (var email in dict) {
              arr.push(dict[email]);
            }
            setPeople(arr);
          })
          .catch((err) => {
            console.log(err);
            if (err.response) {
              console.log(err.response.data);
            }
          });
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }, [classCode]);

  useEffect(() => {
    if (classCode === -1) {
      navigate("/home");
    } else {
      fetchAssignments();
    }
  }, [classCode, navigate, fetchAssignments]);

  function renderThead() {
    var i = -1;
    return assignments.map((assignment) => {
      return (
        <th scope="col" key={i--}>
          {assignment.name}
        </th>
      );
    });
  }

  function renderTable() {
    if (assignments.length === 0) {
      return <span className="fs-3 text-success">Add Assignments</span>;
    } else {
      return (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered text-center">
            <caption className="text-danger" id="error"></caption>
            <thead>
              <tr>
                <th scope="col">Grades</th>
                {renderThead()}
              </tr>
            </thead>
            <tbody>{renderTbody()}</tbody>
          </table>
        </div>
      );
    }
  }
  function updateMarks(email, assignmentId, val) {
    document.getElementById("error").innerHTML = "";
    if (val === "") {
      return;
    }
    var reg = /^\d+$/;
    if (!reg.test(val)) {
      document.getElementById("error").innerHTML =
        "Only number is allowed in marks.";
      return;
    }
    var mark = parseInt(val);
    if (mark < 0 || mark > 100) {
      document.getElementById("error").innerHTML =
        "Only marks in range 0-100 are allowed.";
      return;
    }

    Axios.post("http://localhost:3001/grade/updateMarks", {
      email: email,
      classId: classCode,
      assignmentId: assignmentId,
      marks: mark,
    }).catch((err) => {
      if (err.response) {
        document.getElementById("error").innerHTML = err.response.data;
      } else {
        console.log(err);
      }
    });
  }

  function renderTbody() {
    return people.map((user) => {
      var j = 0;
      return (
        <tr key={user.name}>
          <th scope="row">{user.name}</th>

          {user.marks.map((mark) => {
            if (mark === -1) {
              return <td key={new Date()}>-</td>;
            } else {
              return (
                <td key={j++}>
                  <input
                    type="text"
                    className="text-center bg-transparent border border-0"
                    name="yourname"
                    placeholder={mark.mark}
                    onChange={(e) => {
                      updateMarks(user.name, mark.assignmentId, e.target.value);
                    }}
                  />
                </td>
              );
            }
          })}
        </tr>
      );
    });
  }

  return (
    <>
      <HeaderComponent />
      <div className="container space-header">
        <div className="shadow rounded bg-white align-items-center justify-content-between p-3 fs-5">
          {renderTable()}
        </div>
      </div>
    </>
  );
};

export default GradeComponent;
