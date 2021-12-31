import pdf from "../materials/amcat-report.pdf";
import { Link } from "react-router-dom";
const PeopleComponent = () => {
  return (
    <div>
      <object data={pdf} type="application/pdf">
        <p>
          Alternative text - include a link{" "}
          <Link to={pdf} target="_blank">
            this is pdf
          </Link>
        </p>
      </object>
    </div>
  );
};

export default PeopleComponent;
