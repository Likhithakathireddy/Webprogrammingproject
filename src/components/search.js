import React, { Component } from "react";
import "./css/login.css";
export default class SearchE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      searchTerm: "",
    };
    this.searchElastic = this.searchElastic.bind(this);
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
        window.localStorage.setItem("email", data.data.email);
        window.localStorage.setItem("lname", data.data.lname);
        window.localStorage.setItem("fname", data.data.fname);
        window.localStorage.setItem("phonenumber", data.data.phonenumber);
      });
  }

  searchElastic() {
    console.log(this.state);

    fetch("http://localhost:5000/search?search=" + this.state.searchTerm, {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ searchList: data });
      });
  }

  render() {
    return (
      <div class="container">
        <div class="mb-5 row">
          <div class="col-md-9 mx-auto">
            <div class="myform col-md-12 mt-3">
              <div class="logo mb-3">
                <div class="text-center">
                  {this.state.userData.fname && (
                    <h5>Welcome {this.state.userData.fname}!!!</h5>
                  )}
                </div>
              </div>
              {/* <form> */}
              <label for="exampleInputEmail1">Search Digital Library</label>

              <div class="d-flex mb-3 align-items-end">
                <div class="form-group col-md-10">
                  <input
                    class="form-control"
                    type="text"
                    onChange={(e) => {
                      this.setState({ searchTerm: e.target.value });
                    }}
                    autoComplete="on"
                    tabIndex="0"
                  />
                </div>
                <div class="text-center ms-3 d-flex align-items-center col-md-2">
                  {/* <button href="/homepage" class=" btn btn-block mybtn btn-primary tx-tfm">Search</button> */}
                  <p class="text-center mb-0 mt-2">
                    <a
                      onClick={this.searchElastic}
                      class="btn btn-primary"
                      tabIndex="0"
                    >
                      Search
                    </a>
                  </p>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div class="text-center">
                  <a
                    href="/insert"
                    class="btn btn-primary"
                    type="button"
                    value="Cancel"
                    tabIndex="0"
                  >
                    Insert Enter
                  </a>
                  <p></p>
                </div>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
        <div class="container">
          <ul class="list-group ">
            {this.state.searchList?.map((etd) => {
              let { title,author, university, year,text } = etd._source;
              console.log(etd._source)
              return (
                <li class="list-group-item">
                  <p class="mb-1 text-start">Title: {title}</p>
                  <p class="mb-1 text-start">Author: {author}</p>
                  <p class="mb-1 text-start ">University: {university}</p>
                  <p class="mb-1 text-start">Year: {year}</p>
                  <p class="mb-1 text-start">Abstract: {text}</p>

                </li>
              );
            })}
          </ul>

          {this.state?.searchList?.length > 0 && (
            <nav aria-label="Page navigation example" className="mt-3">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>

                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    );
  }
}
