import React, { Component } from "react";
import axios from "axios";
// import "./css/login.css"

export default class InsertETD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      password: "",
      selectedFile: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {
      title,
      sourceurl,
      author,
      abstract,
      publisher,
      subject,
      department,
      degree,
    } = this.state;
    console.log(
      title,
      sourceurl,
      author,
      abstract,
      publisher,
      subject,
      department,
      degree
    );

    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    formData.append("title", title);
    formData.append("author", author);

    formData.append("abstract", abstract);

    formData.append("publisher", publisher);
    formData.append("subject", subject);
    formData.append("department", department);
    formData.append("degree", degree);

    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("User Registered Successfully");
          window.location.href = "/";
        } else {
          alert("User failed Registered ");
        }
      });
  }

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  // when user uploads file this function should execute
  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    // console log uploaded file details
    console.log("formData", formData);
    // user send req to the server
    // axios.post("api/uploadfile", formData);
  };

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-5 mx-auto">
            <div id="first">
              <div class="myform form ">
                <div class="logo mb-3">
                  <div class="col-md-12">
                    <h1>Insert</h1>
                  </div>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.handleSubmit();
                  }}
                >
                  <div class="form-group">
                    <label>Title :</label>
                    <input
                      type="text"
                      name="fname"
                      className="form-control"
                      onChange={(e) => this.setState({ title: e.target.value })}
                      required
                    />
                  </div>
                  {/* <div class="form-group">
                    <label>SourceURL :</label>
                    <input
                      type="text"
                      name="url"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({ sourceurl: e.target.value })
                      }
                      required
                    />
                  </div> */}
                  <div class="form-group">
                    <label>Author :</label>
                    <input
                      type="text"
                      name="Author"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({ author: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>Abstract :</label>
                    <input
                      type="text"
                      name="abstract"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({ abstract: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>Publisher :</label>
                    <input
                      type="text"
                      name="publisher"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({ publisher: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>Subject :</label>
                    <input
                      type="text"
                      name="Subject"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({ subject: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>Department :</label>
                    <input
                      type="text"
                      name="Department"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({ department: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div class="form-group mb-3">
                    <label>Degree :</label>
                    <input
                      type="text"
                      name="Degree"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({ degree: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <h5>Upload your file Here</h5>
                    <input
                      required
                      type="file"
                      name="file"
                      onChange={this.onFileChange}
                    />
                  </div>

                  <div class="col-md-3 text-center mb-3 d-flex">
                    <button type="submit" className="btn btn-secondary">
                      Close
                    </button>

                    <button type="submit" className="btn btn-primary ms-3 ">
                      Insert
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
