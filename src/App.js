import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import TopNav from "./Components/TopNav";
import Profile from "./Components/Profile";
import Contact from "./Components/Contact";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
