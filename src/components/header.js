import React, { Component } from "react";
export default class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  signout() {
    localStorage.clear();
  }
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container">
            <a class="navbar-brand" href="/">
              Digital Library{" "}
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <div class="d-flex ms-auto">
                {console.log(localStorage.getItem("token"))}
                {!localStorage.getItem("token") ? (
                  <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    {console.log("singedout")}
                    <a class="nav-link" role="button" href="/login">
                      Login
                    </a>
                    <a class="nav-link" role="button" href="/signup">
                      SignUp
                    </a>
                  </ul>
                ) : (
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                      <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        My Account
                      </a>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <a class="dropdown-item" href="/">
                            Home
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="/viewprofile">
                            View Profile
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="/editprofile">
                            Edit Profile
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="/changepassword">
                            Change Password
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="/keygenerator">
                            API key Generator
                          </a>
                        </li>
                        <li>
                          <hr class="dropdown-divider" />
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="/"
                            onClick={this.signout}
                          >
                            Logout
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
