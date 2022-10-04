import React, { Component } from 'react'
export default class forgotpassword extends Component{
    constructor(props){
        super(props);
        this.state={
           email:"",
        };
         this.handleSubmit=this.handleSubmit.bind(this);
     }
     handleSubmit() {
        const { email } = this.state;
        console.log( email );
        fetch("http://localhost:5000/forgot-password", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
            if (data.status == "ok") {
                alert("Successfully Sent Email to Registered User!")   
            }else{
                alert("User Does Not Exists !!")  
            }
            
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
                                <h1>Forgot Password</h1>
                             </div>
                        </div>
                       <form onSubmit={e=>e.preventDefault()}>
                               <div class="form-group">
                                  <label for="exampleInputEmail1">Email address</label>
                                  <input type="email" name="email"  class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"onChange={(e) => this.setState({ email: e.target.value })}/>
                               </div>
                               <div class="col-md-12 text-center ">
                                  <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm" onClick={this.handleSubmit}>Submit</button>
                               </div>
                            </form>
                     
                    </div>
                </div>
                    </div>
                    </div>
        );
    }
}
