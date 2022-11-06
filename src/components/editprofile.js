import React, { Component } from 'react'
export default class editprofile extends Component{

constructor(props){
      super(props);
      this.state={
         firstname:"",
         lastname:"",
         email:"",
         phonenumber:"",
         userData:"",
      };
       this.handleSubmit=this.handleSubmit.bind(this);
      
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
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userData");
          this.setState({ userData: data.data });
        });
    }
   handleSubmit() {
      const { fname, lname,phonenumber } = this.state;
      console.log( fname, lname,phonenumber);
      if(fname == ""){fname = window.localStorage.getItem("fname")}
      if(lname == ""){lname = window.localStorage.getItem("lname")}
      if(phonenumber == ""){phonenumber = window.localStorage.getItem("phonenumber")}
      fetch("http://localhost:5000/editprofile", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        
        body: JSON.stringify({
         email: window.localStorage.getItem("email"),
         fname,
         lname,
         phonenumber,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status == "ok") {
            alert("Updated Profile"); 
            window.location.href = "/viewprofile" 
          }else{
            alert("Something is wrong !!!"); 
          }
         });
      }

    render(){
      const fname = localStorage.getItem("fname");
      const lname = localStorage.getItem("lname");
      const phonenumber = localStorage.getItem("phonenumber");
      const email = localStorage.getItem("email");
        return(
            <div class="container">
            <div class="row">
                <div class="col-md-5 mx-auto">
                <div id="first">
                    <div class="myform form ">
                         <div class="logo mb-3">
                             <div class="col-md-12 text-center">
                                <h1>Edit Profile</h1>
                             </div>
                        </div>
                        <form onSubmit={e=>e.preventDefault()}>
                           <div class="form-group">
                              <label >First Name</label>
                              <input type="text"  name="firstname" class="form-control"  placeholder={fname} onChange={(e)=>this.setState({fname: e.target.value})}/>
                           </div>
                           <div class="form-group">
                              <label >Last Name</label>
                              <input type="text"  name="lastname" class="form-control" placeholder={lname} onChange={(e)=>this.setState({lname: e.target.value})}/>
                           </div>
                           <div class="form-group">
                              <label >Email address</label>
                              <input type="email" name="email"  class="form-control"  placeholder={email} onChange={(e)=>this.setState({email: e.target.value})} disabled/>
                           </div>
                           <div class="form-group">
                              <label>Phone Number</label>
                              <input type="text" name="phonenumber"  class="form-control" placeholder={phonenumber} onChange={(e)=>this.setState({phonenumber: e.target.value})}/>
                           </div>
                
                           <div class="col-md-12 text-center mb-3">
                              <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm"  onClick={this.handleSubmit}>Save Changes</button>
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
