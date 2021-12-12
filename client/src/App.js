import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./Components/LoginComponent.js";
import HomeComponent from "./Components/HomeComponent.js";
import ClassComponent from "./Components/ClassComponent.js";
import PageNotFound from "./Components/PageNotFound.js";
import "./CSS/App.css";

function App() {
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
