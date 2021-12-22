import image1 from "../images/image1.png";
//import image2 from "../images/image2.jpg";
//import image3 from "../images/image3.jpg";
//import image4 from "../images/image4.jpg";
const ClassCardComponent = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-lg-3 mb-5">
              <div className="d-flex flex-column h-100">
                <img
                  src={image1}
                  className="img-cover h-50"
                  alt="Card background"
                />
                <div className="class-card__body my-2">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h5 className="class-card__classname">Fullstack</h5>
                    <div className="btn btn-dark fs-6">&#x2716;</div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="class-card__role fs-5">Teacher</span>
                    <div className="btn btn-dark">Edit</div>
                  </div>

                  <p className="class-card__subjects truncate">
                    HTML, CSS, JavaScriptHTML, CSS
                  </p>

                  <div className="class-card_code">
                    <span>Code: </span>
                    <span>123456</span>
                  </div>
                </div>
                <button className="btn btn-primary mt-auto py-2">
                  Go to Class
                </button>
              </div>
            </div>
            <div className="col-md-4 col-lg-3 mb-5">
              <div className="d-flex flex-column h-100">
                <img
                  src={image1}
                  className="img-cover h-50"
                  alt="Card background"
                />
                <div className="class-card__body my-2">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h5 className="class-card__classname">Fullstack</h5>
                    <div className="btn btn-dark fs-6">&#x2716;</div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="class-card__role fs-5">Teacher</span>
                    <div className="btn btn-dark">Edit</div>
                  </div>

                  <p className="class-card__subjects truncate">
                    HTML, CSS, JavaScript
                  </p>

                  <div className="class-card_code">
                    <span>Code: </span>
                    <span>123456</span>
                  </div>
                </div>
                <button className="btn btn-primary mt-auto py-2">
                  Go to Class
                </button>
              </div>
            </div>
            <div className="col-md-4 col-lg-3 mb-5">
              <div className="d-flex flex-column h-100">
                <img
                  src={image1}
                  className="img-cover h-50"
                  alt="Card background"
                />
                <div className="class-card__body my-2">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h5 className="class-card__classname">Fullstack</h5>
                    <div className="btn btn-dark fs-6">&#x2716;</div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="class-card__role fs-5">Teacher</span>
                    <div className="btn btn-dark">Edit</div>
                  </div>

                  <p className="class-card__subjects truncate">
                    HTML, CSS, JavaScript
                  </p>

                  <div className="class-card_code">
                    <span>Code: </span>
                    <span>123456</span>
                  </div>
                </div>
                <button className="btn btn-primary mt-auto py-2">
                  Go to Class
                </button>
              </div>
            </div>
            <div className="col-md-4 col-lg-3 mb-5">
              <div className="d-flex flex-column h-100">
                <img
                  src={image1}
                  className="img-cover h-50"
                  alt="Card background"
                />
                <div className="class-card__body my-2">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h5 className="class-card__classname">Fullstack</h5>
                    <div className="btn btn-dark fs-6">&#x2716;</div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="class-card__role fs-5">Teacher</span>
                    <div className="btn btn-dark">Edit</div>
                  </div>

                  <p className="class-card__subjects truncate">
                    HTML, CSS, JavaScript
                  </p>

                  <div className="class-card_code">
                    <span>Code: </span>
                    <span>123456</span>
                  </div>
                </div>
                <button className="btn btn-primary mt-auto py-2">
                  Go to Class
                </button>
              </div>
            </div>
            <div className="col-md-4 col-lg-3 mb-5">
              <div className="d-flex flex-column h-100">
                <img
                  src={image1}
                  className="img-cover h-50"
                  alt="Card background"
                />
                <div className="class-card__body my-2">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h5 className="class-card__classname">Fullstack</h5>
                    <div className="btn btn-dark fs-6">&#x2716;</div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="class-card__role fs-5">Teacher</span>
                    <div className="btn btn-dark">Edit</div>
                  </div>

                  <p className="class-card__subjects truncate">
                    HTML, CSS, JavaScript
                  </p>

                  <div className="class-card_code">
                    <span>Code: </span>
                    <span>123456</span>
                  </div>
                </div>
                <button className="btn btn-primary mt-auto py-2">
                  Go to Class
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ClassCardComponent;
