import React,{Component}from "react";
import swal from "sweetalert";
export default class keygenerator extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userData: "",
          };
        this.handleSubmit = this.handleSubmit.bind(this);
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
          });
      }

handleSubmit(e) {
     e.preventDefault();

     fetch("http://localhost:5000/generate", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
      }),
    }).then((res) => res.json())
    .then((data) => {
        if (data.status == "ok") {
            swal({
              title: "API Key!",
              text: "Generated Successfully!",
              icon: "success",
            });
        }
        window.location.reload();
    });

    
}


render()
{
    return(
        <div class ="container">
            <p class="fs-3"> API Key Generator</p>
         <p> {this.state.userData.key}</p>
            <a
            //  on onClick={()=>}
            class ="btn btn-primary"
            onClick={(e) => this.handleSubmit(e)}>
                Generate
            </a>
        </div>
    )
}
}

