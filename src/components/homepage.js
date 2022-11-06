import React, { Component } from "react";
import "./css/login.css";
export default class homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      searchTerm: "",
      searchList: [],
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
        <div class="row">
          <div class="col-md-5 mx-auto">
            <div class="myform form ">
              {/* <form> */}
              <div class="form-group">
                <label for="exampleInputEmail1">Search Digital Library</label>
                <input
                  class="form-control"
                  type="text"
                  onChange={(e) => {
                    this.setState({ searchTerm: e.target.value });
                  }}
                ></input>
              </div>
              <div class="logo mb-3">
                <div class="col-md-12 text-center">
                  <h3>Welcome {this.state.userData.fname}</h3>
                </div>
              </div>
              <div class="col-md-12 text-center ">
                <button
                  onClick={this.searchElastic}
                  class=" btn btn-block mybtn btn-primary tx-tfm"
                >
                  Search
                </button>
              </div>

              {/* </form> */}
            </div>
          </div>
        </div>
        
        <div class="container">
          {this.state.searchList?.map((etd) => {
            let {author, university, year} = etd._source;
            return (
              <div class="row">
                <div class="Col">Author: {author}</div>
                <div class="Col">University: {university}</div>
                <div class="Col">Year: {year}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
