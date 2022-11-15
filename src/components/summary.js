import { render } from "@testing-library/react";
import React, { Component } from "react";
import { useLocation, Link  } from "react-router-dom";

const Summary = (props) => {
  const location = useLocation();
  const state = location.state;
  console.log(state.searchres);
  const title = window.localStorage.getItem("title");
  var etd_file_id = 1;

// class Summary extends Component{

//   Constructor(props){
//     super(props);
//     this.goBack=this.goBack.bind(this);
//   }

//   goBack(){
//     this.props.history.goBack();
//   }
// }
    
return(
  <>
    <div class="container">
<dl class="row">
  <dt class="mt-3 mb-3 text-left text-uppercase">{state.searchres.title}</dt>
  <dt class="col-sm-2">Author(s)</dt>
  <dd class="col-sm-10"> 
   <p class="mb-1 text-left"> {state.searchres.author}</p>
   </dd>
  <dt class="col-sm-2">University</dt>
  <dd class="col-sm-10">
  <p class="mb-1 text-left ">{state.searchres.university}</p>
  </dd>
  <dt class="col-sm-2">degree</dt>
  <dd class="col-sm-10">
  <p class="mb-1 text-left ">{state.searchres.degree}</p>
  </dd>
  <dt class="col-sm-2">Program</dt>
  <dd class="col-sm-10">
  <p class="mb-1 text-left ">{state.searchres.program}</p>
  </dd>
  <dt class="col-sm-2">Year Published</dt>
  <dd class="col-sm-10">
  <p class="mb-1 text-left ">{state.searchres.year}</p>
  </dd>
  <dt class=" mb-1 text-left">Abstract</dt>
  <dd class="col-sm-2">
  </dd>
  <p class="mb-1 text-start">{state.searchres.text}</p>
  <dt class="mb-3 btn-btn-link"><a href={`http://localhost:5000/fileInfo/${state.searchres.pdf}`} target="_blank" >View Document</a></dt>
  <div class="form-group col-md-3">
              {/* <button type="submit" href="/searchengine" class="btn btn-primary rounded-pill btn-block shadow-sm">Back to results</button> */}
              <Link to={"/"}>
                <a type="button" class="btn btn-primary">
                  Back 
                </a>
              </Link>
            </div>
</dl> 
    </div>
    {/* <div class="form-group col-md-3">
              {/* <button type="submit" href="/searchengine" class="btn btn-primary rounded-pill btn-block shadow-sm">Back to results</button> */}
              {/* <Link to={"/"}>
                <a type="button" class="btn btn-primary">
                  Back 
                </a>
              </Link>
            </div> */}
    </>


  );
};
    

  
  export default Summary;