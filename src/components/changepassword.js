import React, { Component } from 'react'
export default class changepassword extends Component{
   constructor(props){
      super(props);
      this.state={
         currentpassword:"",
         newpassword:"",
         confirmpassword:"",
         userData: "",
      };
       this.handleSubmit=this.handleSubmit.bind(this);
   }
  
 

   handleSubmit() {
      const { email,currentpassword, newpassword,confirmpassword } = this.state;
      console.log( email,currentpassword, newpassword,confirmpassword);
      if(currentpassword == newpassword){
         alert("Current and New password are same !!")
      }
      if(newpassword != confirmpassword){
         alert("New and Confirm Password Does not Match!!")
      }else{
         fetch("http://localhost:5000/changepassword", {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
             token: window.localStorage.getItem("token"),
             email: window.localStorage.getItem("email"),
             currentpassword,
             newpassword,
             confirmpassword,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data, "userRegister");
              if (data.status == "ok") {
               alert(""); 
               window.location.href = "./home"
              }else if (data.status == "error2"){
                alert("Current Password is wrong"); 
              }else{
               alert("Something is wrong !!");
              }
             });
      }


     
      }

    render(){
        return(
            <div class="container">
            <div class="row">
                <div class="col-md-5 mx-auto">
                    <div class="myform form ">
                         <div class="logo mb-3">
                             <div class="col-md-12 text-center">
                                <h1>Change Password</h1>
                             </div>
                        </div>
                       <form onSubmit={e=>e.preventDefault()}>
                               <div class="form-group">
                                  <label >Current Password</label>
                                  <input type="password" name="currentpassword"  class="form-control"  placeholder="Current Password"onChange={(e) => this.setState({ currentpassword: e.target.value })}/>
                               </div>
                               <div class="form-group">
                                  <label >New Password</label>
                                  <input type="password" name="newpassword"  class="form-control" placeholder="New Password"onChange={(e) => this.setState({ newpassword: e.target.value })}/>
                               </div>
                               <div class="form-group">
                                  <label >Confirm Password</label>
                                  <input type="password" name="confirmpassword"  class="form-control" placeholder="Confirm Password"onChange={(e) => this.setState({confirmpassword: e.target.value })}/>
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
