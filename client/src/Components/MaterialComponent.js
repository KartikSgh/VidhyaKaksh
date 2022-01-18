//import { Link } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import book from "../images/book.svg";
import "../CSS/main.css";
import "../CSS/reset.css";
import "../CSS/class.css";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";

const MaterialComponent = () => {
  const role = useSelector((state) => state.role);
  const classCode = useSelector((state) => state.classCode);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [materials, updateMaterials] = useState([]);

  const fetchMaterials = useCallback(() => {
    Axios.get("http://localhost:3001/material", {
      params: {
        classId: classCode,
      },
    })
      .then((res) => {
        updateMaterials(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }, [classCode]);

  useEffect(() => {
    fetchMaterials();
  }, [classCode, fetchMaterials, role]);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  function handleFileUpload() {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("classId", classCode);
    Axios.post("http://localhost:3001/material/upload", formData)
      .then(() => {
        fetchMaterials();
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          document.getElementById("errorInAddMaterial").innerHTML =
            err.response.data;
        }
      });
  }

  function renderButton() {
    if (role === 1) {
      return (
        <div className="d-flex align-items-center">
          <span className="fs-6 text-primary">Your materials</span>
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
            data-bs-target="#modal-material"
          >
            Add Material
          </button>

          <p className="text-danger mx-3" id="errorInAddMaterial"></p>

          <div
            className="modal fade"
            id="modal-material"
            tabIndex="-1"
            style={{ display: "none" }}
            aria-hidden="true"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">New Material</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <form>
                  <div className="mx-3 my-3">
                    <input
                      type="file"
                      className="form-control form-control-lg"
                      onChange={(e) => {
                        handleFileChange(e);
                      }}
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
                      onClick={() => {
                        handleFileUpload();
                      }}
                    >
                      Upload
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

  function renderMaterials() {
    if (materials.length === 0) {
      return <div>No Materials</div>;
    } else {
      return materials.map((material) => {
        var MaterialName = material.name;
        var time = material.dateAndTime.replace(".000Z", "").replace("T", " ");
        var location = material.location;

        return (
          <a
            key={time}
            href={location}
            rel="noopener noreferrer"
            target="_blank"
            className="d-flex align-items-center justify-content-between border py-3 px-3 my-4 cursor-pointer bg-light"
          >
            <div className="d-flex align-items-center">
              <div className="square me-3">
                <img src={book} alt="Homework" />
              </div>
              <span className="fs-5">{MaterialName}</span>
            </div>
            <time className="text-black-50"> {time} </time>
          </a>
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
            <h2 className="text-success">Materials</h2>
          </div>
          {renderMaterials()}
        </section>
      </main>
    </>
  );
};

export default MaterialComponent;
