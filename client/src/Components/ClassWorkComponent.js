//import { Link } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import book from "../images/book.svg";
import "../CSS/main.css";
import "../CSS/reset.css";
import "../CSS/class.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const ClassWorkComponent = () => {
  const role = useSelector((state) => state.role);

  // eslint-disable-next-line
  const [assignments, updateAssignments] = useState([
    { name: "Javascript", dueTime: "Due 09:59, 11 th 11" },
    { name: "Javascript", dueTime: "Due 09:59, 11 th 11" },
  ]);

  function renderButton() {
    if (role === 1) {
      return (
        <div class="d-flex align-items-center">
          <span class="fs-6 text-primary">Your homework</span>
        </div>
      );
    } else {
      return (
        <div class="d-flex align-items-center">
          <button class="btn btn-primary text-white">Create</button>
        </div>
      );
    }
  }

  function renderAssignments() {
    if (assignments.length === 0) {
      return <div>Wow! No Assignments.</div>;
    } else {
      return assignments.map((assignment) => {
        var AssignmentName = assignment.name;
        var AssignmentDueTime = assignment.dueTime;

        return (
          <div class="d-flex align-items-center justify-content-between border py-3 px-3 my-4 cursor-pointer bg-light">
            <div class="d-flex align-items-center">
              <div class="square me-3">
                <img src={book} alt="Homework" />
              </div>
              <span class="fs-5">{AssignmentName}</span>
            </div>

            <time class="text-black-50"> {AssignmentDueTime} </time>
          </div>
        );
      });
    }
  }

  return (
    <>
      <HeaderComponent />
      <main class="container">
        {/* <!-- Options --> */}
        <section
          class="
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
        <section class="border py-4 px-3 bg-white mb-5">
          <div
            class="
            d-flex
            align-items-center
            justify-content-between
            border-bottom
            pb-3
            mb-4
          "
          >
            <h2 class="text-success">Assignments</h2>
          </div>
          {renderAssignments()}
        </section>
      </main>
    </>
  );
};

export default ClassWorkComponent;
