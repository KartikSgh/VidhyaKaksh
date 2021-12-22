//import { useEffect } from "react";
//import Axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./Components/LoginComponent.js";
import HomeComponent from "./Components/HomeComponent.js";
import ClassComponent from "./Components/ClassComponent.js";
import PageNotFound from "./Components/PageNotFound.js";
import "./CSS/App.css";

function App() {
  /*
  useEffect(() => {
    Axios.defaults.withCredentials = true;
    Axios.get("http://localhost:3001/login").then((response) => {
      console.log(response);
    });
  });
  */
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="home" element={<HomeComponent />} />
        <Route path="class" element={<ClassComponent />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
