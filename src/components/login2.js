import React ,{ Component } from 'react'
import "./css/login.css"
// import{ReactComponent as Logo}  from "./images/logo.png"

export default class Login extends Component {
   // console.logo(logo);
   // function header(){
   // return<img src={Logo} alt="logo"/>;
   // }
 
    render(){
        return(
            
      <div class="container">
        <div class="row">
			<div class="col-md-5 mx-auto">
				<div class="myform form ">
					 <div class="logo mb-3">
						 <div class="col-md-12 text-center">
							<h1>LOGIN asdjkhas</h1>
						 </div>
					</div>
                   <form  onSubmit={e=>e.preventDefault()}>
                           <div class="form-group">
                              {/* <label for="exampleInputEmail1">Email address</label> */}
                              <input type="email" name="email"  class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                           </div>
                           
                           <div class="form-group">
                              {/* <label for="exampleInputEmail1">Password</label> */}
                              <input type="password" name="password" id="password"  class="form-control" aria-describedby="emailHelp" placeholder="Enter Password"/>
                           </div>
                  
                           <div class="form-group">                             
                           <p class="from-right-end float-end text-primary"><a href="/forgotpassword" >Forgotpassword ?</a></p>
                           </div>
                           <br/>
                           <br/>
                           <div class="col-md-12 text-center ">
                              <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm" onClick={this.handleSubmit}>Login</button>
                           </div>
                           <div class="col-md-12 ">
                              <div class="login-or">
                                 <hr class="hr-or"/>
                                 <span class="span-or">or</span>
                              </div>
                           </div>
                           <div class="form-group">
                              <p class="float-end text-primary"> Don't have account? <a href="/signup" >Sign up here !</a></p>
                           </div>
                        </form>
				</div>
			</div>
		        </div>
                </div>
        );
    }

}



