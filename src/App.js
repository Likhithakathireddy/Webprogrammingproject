import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Forgotpassword from "./components/forgotpassword";
import Editprofile from "./components/editprofile";
import Changepassword from "./components/changepassword";
import Header from "./components/header";
import Viewprofile from "./components/viewprofile";
import Homepage from "./components/homepage";
import Otp from "./components/otp";

function App() {
  return (
    <Router>
      <div className="App">

        <Header />
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotpassword" element={<Forgotpassword />} />
              <Route path="/editprofile" element={<Editprofile />} />
              <Route path="/changepassword" element={<Changepassword />} />
              <Route path="/viewprofile" element={<Viewprofile />} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/otp" element={<Otp />} />
            

            </Routes>
      </div>
    </Router>
  );
}
export default App;