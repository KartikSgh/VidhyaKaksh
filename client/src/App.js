import { useEffect } from "react";
import Axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./Components/LoginComponent.js";
import HomeComponent from "./Components/HomeComponent.js";
import ClassComponent from "./Components/ClassComponent.js";
import PeopleComponent from "./Components/PeopleComponent.js";
import ClassWorkComponent from "./Components/ClassWorkComponent.js";
import GradeComponent from "./Components/GradeComponent.js";
import PageNotFound from "./Components/PageNotFound.js";
import MaterialComponent from "./Components/MaterialComponent.js";
import "./CSS/App.css";

function App() {
  useEffect(() => {
    Axios.defaults.withCredentials = true;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="home" element={<HomeComponent />} />
        <Route path="class" element={<ClassComponent />} />
        <Route path="class/classwork" element={<ClassWorkComponent />} />
        <Route path="class/people" element={<PeopleComponent />} />
        <Route path="class/grade" element={<GradeComponent />} />
        <Route path="class/material" element={<MaterialComponent />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
