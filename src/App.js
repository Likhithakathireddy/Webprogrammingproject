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
import SearchE from "./components/search";
import Insert from "./components/insert";
import Summary from "./components/summary";
import Footer from"./components/footer";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          <Route exact path="/" element={<SearchE />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/editprofile" element={<Editprofile />} />
          <Route path="/changepassword" element={<Changepassword />} />
          <Route path="/viewprofile" element={<Viewprofile />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/insert" element={<Insert />} />
          <Route path="/summary"element={<Summary/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}
export default App;
