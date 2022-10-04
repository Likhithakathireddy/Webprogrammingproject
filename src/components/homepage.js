import React, { Component } from 'react'
export default class homepage extends Component{
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
            window.localStorage.setItem("email",data.data.email);
            window.localStorage.setItem("lname",data.data.lname);
            window.localStorage.setItem("fname",data.data.fname);
            window.localStorage.setItem("phonenumber",data.data.phonenumber);
          });
      }

    render(){
        return(
            <div class="container">
            <div class="row">
                <div class="col-md-5 mx-auto">
                    <div class="myform form ">
                         <div class="logo mb-3">
                             <div class="col-md-12 text-center">
                                <h1>Welcome {this.state.userData.fname}!!!</h1>
                             </div>
                        </div>
                        <form>
                        <div class="form-group">
                                  <label for="exampleInputEmail1">Search Digital Library</label>
                                  <input class="form-control" type="text"></input>
                                 
                               </div>
                               <div class="col-md-12 text-center ">
                                  <button href="/editprofile" class=" btn btn-block mybtn btn-primary tx-tfm">Search</button>
                               </div>
                         
                        </form>
                       
                             
                     
                    </div>
                </div>
                    </div>
                    </div>
        );
    }
}
