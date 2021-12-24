import Axios from "axios";
const logout = () => {
  Axios.get("http://localhost:3001/logout")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err);
      }
    });
};

export default logout;
