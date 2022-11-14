import React, { Component } from "react";
// import axios from "axios";
// import "./css/login.css"

export default class InsertETD extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  // handleSubmit() {
  //   const {
  //     title,
  //     sourceurl,
  //     author,
  //     abstract,
  //     publisher,
  //     subject,
  //     department,
  //     degree,
  //   } = this.state;
  //   console.log(
  //     title,
  //     sourceurl,
  //     author,
  //     abstract,
  //     publisher,
  //     subject,
  //     department,
  //     degree
  //   );

  //   const formData = new FormData();
  //   formData.append(
  //     "myFile",
  //     this.state.selectedFile,
  //     this.state.selectedFile.name
  //   );
  //   formData.append("title", title);
  //   formData.append("author", author);

  //   formData.append("abstract", abstract);

  //   formData.append("publisher", publisher);
  //   formData.append("subject", subject);
  //   formData.append("department", department);
  //   formData.append("degree", degree);

  //   fetch("http://localhost:5000/upload", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data, "userRegister");
  //       if (data.status === "ok") {
  //         <div class ="alert-alert-success" role="alert">
  //           <h4 class="alert-heading">Well done!</h4>
  //           <hr>
  //           <p class="mb-0">Uploaded file  Successfully !
  //             </p>
  //             </hr>
  //         </div>
  //         window.location.href = "/";
  //       } else {
  //         <div class ="alert-alert-success" role="alert">
  //           <h4 class="alert-heading">Error!</h4>
  //           <hr>
  //           <p class="mb-0">Unable to upload file,try again after some time
  //             </p>
  //             </hr>
  //         </div>
  //       }
  //     });
  // } 
  handleClick(event) {
    event.preventDefault();
    const { advisor, author, degree, program, title, university, year, text, file } = this.state;
    const count = window.localStorage.getItem('count');
    const etd_file_id= (parseInt(count) +1);
    const pdf = file.name;
    console.log( etd_file_id, advisor, author, degree, program, title, university, year, text, pdf );
    const formData = new FormData();
    formData.append("file",file);
    
   
    fetch("http://localhost:5000/upload", {
      method: "POST",
      body : formData,
    }).then((res) => {
      console.log(formData)
       console.log(res);})


    fetch("http://localhost:5000/insert", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        etd_file_id, 
        advisor, 
        author, 
        degree, 
        program, 
        title, 
        university, 
        year, 
        text,
        pdf
      }),
    }).then((res) => {
    console.log(res);
    if (res.status === 200) {
      alert("Inserted Successfully") ;
      window.localStorage.setItem("count",etd_file_id);
      window.open("./")
      }else{
        alert("Inserted Failed") 
      }});
    }

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
                <form>
                     <div class="form-group">
                    <label>Advisor :</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({ advisor: e.target.value })
                      }
                      
                    />
                  </div>
                  <div class="form-group">
                    <label>Author :</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({ author: e.target.value })
                      }
                      
                    />
                  </div>
                  <div class="form-group">
                    <label>Degree:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({ degree: e.target.value })
                      }
                      
                    />
                  </div>
                  <div class="form-group">
                    <label>Program:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({ program: e.target.value })
                      }
                      
                    />
                  </div>
                  <div class="form-group">
                    <label>Title :</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => this.setState({ title: e.target.value })}
                      
                    />
                  </div>
                  <div class="form-group">
                    <label>University:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => this.setState({  university: e.target.value })}
                      
                    />
                  </div>
                  <div class="form-group">
                    <label>Year Published:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => this.setState({ year: e.target.value })}
                      
                    />
                  </div>
                  <div class="form-group">
                    <label>Abstract :</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({ abstract: e.target.value })
                      }
                      
                    />
                  </div>
                  <div class="mb-3">
                    <h5>Upload your file Here</h5>
                    <input
                      required
                      type="file"
                      name="file"
                      onChange={(e) => this.setState({ file: e.target.files[0] })}
                      // onChange={this.onFileChange}
                    />
                  </div>

                  <div class="col-md-3 text-center mb-3 d-flex">
                    <a href="/" type="submit" class="btn btn-secondary">
                      Close
                    </a>
                    <a type="button" class="btn btn-primary ms-3" onClick={this.handleClick}>
                      Insert
                    </a>
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
