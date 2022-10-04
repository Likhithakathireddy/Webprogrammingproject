import React ,{ Component } from 'react'
import "./css/login.css"

export default class Login extends Component {
   constructor(props){
      super(props);
      this.state={
         email:"",
         password:"",
      };
       this.handleSubmit=this.handleSubmit.bind(this);
   }
   
   handleSubmit(e) {
      e.preventDefault()
      const { email, password } = this.state;
      console.log(email, password);
      fetch("http://localhost:5000/login-user", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status == "ok") {
            alert("Enter OTP to login successfully");  
            window.localStorage.setItem("email", email);
            
            window.location.href = "./otp";
          }else{
            alert("User Not Found"); 
          }
         });
      }
    render(){
        return(
            
      <div class="container">
        <div class="row">
			<div class="col-md-5 mx-auto">
				<div class="myform ">
					 <div class="logo mb-3">
						 <div class="col-md-12 text-center">
							<h1>Login</h1>
						 </div>
					</div>
                   <form onSubmit={e=>{e.preventDefault();e.stopImmediatePropagation()}}>
                           <div class="form-group">
                              <label >Email address</label>
                              <input type="email" name="email"  class="form-control"  placeholder="Enter email" onChange={(e) => this.setState({ email: e.target.value })}/>
                           </div>
                           <div class="form-group">
                              <label >Password</label>
                              <input type="password" name="password" class="form-control"  placeholder="Enter Password" onChange={(e) => this.setState({ password: e.target.value })}/>
                              
                           </div>
                           <div class="col-md-12 text-center ">
                           <button type="submit" className="btn btn-block mybtn btn-primary tx-tfm" onClick={(e)=>this.handleSubmit(e)}>Login</button>
                           </div>
                           <div class="col-md-12 ">
                              <div class="login-or">
                                 <hr class="hr-or"/>
                                 <span class="span-or">or</span>
                              </div>
                           </div>
                           <div class="form-group">
                              <p class="text-center">Don't have account? <a href="/signup" >Sign up here</a></p>
                              <p class="text-center"><a href="/forgotpassword" >Forgotpassword</a></p>
                           </div>
                     </form>
                 
				</div>
			</div>
		        </div>
                </div>
        );
    }

}



