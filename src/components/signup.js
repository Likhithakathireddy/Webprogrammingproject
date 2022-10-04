import React, { Component } from 'react'
import "./css/login.css"


export default class signup extends Component{
   constructor(props){
      super(props);
      this.state={
         firstname:"",
         lastname:"",
         email:"",
         phonenumber:"",
         password:"",

      };
       this.handleSubmit=this.handleSubmit.bind(this);
   }

   handleSubmit(){
      const { fname, lname, email, phonenumber, password } = this.state;
      console.log( fname,lname, email, phonenumber, password );
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          phonenumber,
          password,
        })
      })
        .then((res) => res.json())
        .then((data) => {
         console.log(data, "userRegister");
         if (data.status ==="ok") {
            alert("User Registered Successfully");
            window.location.href = "/"
           
         }else{
            alert("User failed Registered ");
          }
        });
   
   }
    render(){
        return(
            <div class="container">
            <div class="row">
                <div class="col-md-5 mx-auto">
                <div id="first">
                    <div class="myform form ">
                         <div class="logo mb-3">
                             <div class="col-md-12 text-center">
                                <h1>Signup</h1>
                             </div>
                        </div>
                        <form  onSubmit={e=>e.preventDefault()}>
                           <div class="form-group">
                              <label >First Name</label>
                              <input type="text"  name="fname" className="form-control"  placeholder="Enter Firstname" onChange={(e) => this.setState({ fname: e.target.value })} required/>
                           </div>
                           <div class="form-group">
                              <label>Last Name</label>
                              <input type="text"  name="lname" className="form-control"  placeholder="Enter Lastname" onChange={(e) => this.setState({lname: e.target.value })} required/>
                           </div>
                           <div class="form-group">
                              <label>Email address</label>
                              <input type="email" name="email"  className="form-control" placeholder="Enter email" onChange={(e) => this.setState({email: e.target.value })} required/>
                           </div>
                           <div class="form-group">
                              <label>Phone Number</label>
                              <input type="text" name="phonenumber"  className="form-control"  placeholder="Enter Phonenumber" onChange={(e) => this.setState({phonenumber: e.target.value })} required/>
                           </div>
                           <div class="form-group">
                              <label >Password</label>
                              <input type="password" name="password" className="form-control" placeholder="Enter Password" onChange={(e) => this.setState({password: e.target.value })} required/>
                           </div>
                           <div class="col-md-12 text-center mb-3">
                              <button type="submit" className=" btn-primary" onClick={this.handleSubmit}>SignUp</button>
                           </div>
                           <div class="col-md-12 ">
                              <div class="form-group">
                                 <p class="text-center"><a href="/">Already have an account?</a></p>
                              </div>
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
