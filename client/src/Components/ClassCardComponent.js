import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index.js";
import Axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import image1 from "../images/image1.png";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import { useNavigate } from "react-router-dom";

const ClassCardComponent = () => {
  let navigate = useNavigate();
  const email = useSelector((state) => state.email);
  const classCards = useSelector((state) => state.classCards);

  const dispatch = useDispatch();

  const { updateClassCardList, changeClassCode, deleteClassCard, changeRole } =
    bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    Axios.get("http://localhost:3001/home", {
      params: {
        email: email,
      },
    })
      .then((res) => {
        updateClassCardList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email, updateClassCardList]);

  function handleCardDelete(code) {
    Axios.delete("http://localhost:3001/home/delete", {
      data: {
        email: email,
        classId: code,
      },
    })
      .then((res) => {
        console.log(res.data);
        deleteClassCard(code);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function renderClassCards() {
    return classCards.map((card) => {
      var classCode = card.classId;
      var className = card.name;
      var classSubject = card.subject;
      var role = card.role;
      var bgImage = "";
      if (card.bgImage === "image1.png") {
        bgImage = image1;
      } else if (card.bgImage === "image2.jpg") {
        bgImage = image2;
      } else if (card.bgImage === "image3.jpg") {
        bgImage = image3;
      } else {
        bgImage = image4;
      }

      return (
        <div key={classCode} className="col-md-4 col-lg-3 mb-5">
          <div className="d-flex flex-column h-100">
            <img
              src={bgImage}
              className="img-cover h-50"
              alt="Card background"
            />
            <div className="class-card__body my-2">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h5 className="class-card__classname">{className}</h5>
                <button
                  className="btn btn-dark fs-6"
                  onClick={() => {
                    handleCardDelete(classCode);
                  }}
                >
                  &#x2716;
                </button>
              </div>

              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="class-card__role fs-5">{classSubject}</span>
              </div>

              <div className="class-card_code">
                <span>Code: </span>
                <span>{classCode}</span>
              </div>
            </div>
            <button
              className="btn btn-primary mt-auto py-2"
              onClick={() => {
                changeClassCode(classCode);
                changeRole(role);
                navigate("/class");
              }}
            >
              Go to Class
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="row">{renderClassCards()}</div>
        </div>
      </section>
    </>
  );
};
export default ClassCardComponent;
