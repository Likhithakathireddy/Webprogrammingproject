import React, { Component } from "react";
export default class viewprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-5 mx-auto">
            <div class="myform form ">
              <div class="logo mb-3">
                <div class="col-md-12 text-center">
                  <h1>User Profile</h1>
                </div>
              </div>

              <div class="form-group">
                <label>First Name</label>
                <h3>{this.state.userData.fname}</h3>
                <label>Last Name</label>
                <h3>{this.state.userData.lname}</h3>
                <label>Email address</label>
                <h3>{this.state.userData.email}</h3>
                <label>Phone Number</label>
                <h3>{this.state.userData.phonenumber}</h3>
                {/* <label>API Key</label>
                <h3>{this.state.userData.key}</h3> */}
              </div>
              <div class="col-md-12 text-center ">
                <a
                  href="/editprofile"
                  class=" btn btn-block mybtn btn-primary tx-tfm">
                  Edit Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
