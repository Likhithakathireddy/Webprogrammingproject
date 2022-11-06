import React, { Component } from "react";
import "./css/login.css";

export default class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, otp } = this.state;
    fetch("http://localhost:5000/login-otp", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        otp,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);

          window.location.href = "/";
        } else {
          alert("User Not exists");
        }
      });
  }
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-5 mx-auto">
            <div class="myform ">
              <div class="logo mb-3">
                <div class="col-md-12 text-center">
                  <h5>Enter OTP</h5>
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopImmediatePropagation();
                }}
              >
                <div class="form-group mb-3">
                  <label>OTP</label>
                  <input
                    type="text"
                    name="otp"
                    class="form-control"
                    placeholder="Enter OTP"
                    onChange={(e) => this.setState({ otp: e.target.value })}
                  />
                </div>

                <div class="col-md-12 text-center ">
                  <button
                    type="submit"
                    className="btn btn-block mybtn btn-primary tx-tfm"
                    onClick={(e) => this.handleSubmit(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
