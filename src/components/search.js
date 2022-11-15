import React, { Component } from "react";
import { Pagination } from "react-bootstrap";
import {Link} from "react-router-dom";

import "./css/login.css";
export const _getText = (text, filterName) => (filterName ? _getTextWithHighlights(text, filterName) : text);

  export const doStringFormatting = (str = '') => {
  const regex2 = new RegExp("\\[\\'", 'gi');
  const regex3 = /']/gi;
  const regex4 = /"]/gi;
  const regex5 = new RegExp('\\[\\"', 'gi');
  str = str.replace(regex2, '');
  str = str.replace(regex3, '');
  str = str.replace(regex4, '');
  str = str.replace(regex5, '');
  return str;
}

export const _getTextWithHighlights = (text, searchText) => {
  const regex1 = new RegExp(searchText, 'gi');
  let newText = text?.replace(regex1, `<mark class="highlight">$&</mark>`);

  newText = doStringFormatting(newText)
  
  return <span dangerouslySetInnerHTML={{ __html: newText }} />;
};
export default class SearchE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      searchTerm: "",
      searchList: [],
      count: null,
      currentPageItems: [],
      active: 1,
    };
    this.searchElastic = this.searchElastic.bind(this);
    // this.handleCurrentPageItems = this.handleCurrentPageItems.bind(this);
    this.pagination = this.pagination.bind(this);
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
        window.localStorage.setItem("email", data.data.email);
        window.localStorage.setItem("lname", data.data.lname);
        window.localStorage.setItem("fname", data.data.fname);
        window.localStorage.setItem("phonenumber", data.data.phonenumber);
      });
      
      const title = window.localStorage.getItem("title");
      if(title){
          
    fetch("http://localhost:5000/search?search=" + title, {
      method: "GET",
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
        this.setState({ searchList: data.results, count: data.count });
        window.localStorage.setItem("title", this.state.searchTerm);

      });
  }
      }


  searchElastic() {
    console.log(this.state);

    fetch("http://localhost:5000/search?search=" + this.state.searchTerm, {
      method: "GET",
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
        this.setState({ searchList: data.results, count: data.count });
        window.localStorage.setItem("title", this.state.searchTerm);

      });
  }




  pagination(number) {
    this.setState({
      active: number,
    });

  }

  render() {
    let { active } = this.state;
    let pages = [];
    let numOfETDSperPage = 7;
    let etds = this.state?.searchList;
    let currentPageItems = etds.slice(
      (active - 1) * numOfETDSperPage,
      (active - 1) * numOfETDSperPage + numOfETDSperPage
    );

    // console.log({ etds, currentPageItems, active });
    for (let number = 1; number <= Math.ceil(etds.length / numOfETDSperPage); number++) {
      pages.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => this.pagination(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    var s_title = window.localStorage.getItem("title"); 
    return (
      <div class="container">
        <div class=" row">
          <div class="col-md-6 mx-auto">
            <div class="myform col-md-12 mt-3">
              <div class="logo mb-3">
                <div class="text-center">
                  {this.state.userData.fname && (
                    <h5>Welcome to Digital  library  {this.state.userData.fname}</h5>
                  )}
                </div>
              </div>
              {/* <form> */}
              <div class ="fw-bold"><label for="exampleInputEmail1">Search Digital Library</label></div>


              <div class="d-flex mb-3 align-items-end">
                <div class="form-group col-md-10">
                  <input
                    class="form-control"
                    type="text"
                    //placeholder="What are you looking for?"
                    onChange={(e) => {
                      this.setState({ searchTerm: e.target.value });
                    }}
                    autoComplete="on"
                    tabIndex="0"
                    //value = {s_title}
                  />
                </div>
                <div class="text-center ms-3 d-flex align-items-center col-md-2">
                  {/* <button href="/homepage" class=" btn btn-block mybtn btn-primary tx-tfm">Search</button> */}
                  <p class="text-center mb-0 mt-2">
                    <a
                      onClick= {this.searchElastic}
          
                      class=" btn btn-primary "
                      tabIndex="0"
                    >
                      Search
                    </a>
                  </p>
                </div>
              </div>
              {localStorage.getItem("token") ? (
              <div class="d-flex justify-content-center">
                <div class="text-center">
                  <a
                    href="/insert"
                    class=" btn btn-primary "
                    type="button"
                    value="Cancel"
                    tabIndex="0"
                  >
                    Insert ETD
                  </a>
                  <p></p>
                </div>
              </div>
              ):(
                <div></div>
              )}


              {/* </form> */}
            </div>
          </div>
        </div>
        
        <div class="container  mt-3 mb-5">
          
        <p class="fw-bold">The total number of search items {this.state.count} for {s_title} </p>
          <ul class="list-group">
            {currentPageItems?.map((etd) => (
              <SearchItem etd={etd} searchTerm={this.state.searchTerm} />
            ))}
          </ul>
        </div>
        {currentPageItems?.length > 0 && (
          <>
            Showing {(active - 1) * numOfETDSperPage} - {(active - 1) * numOfETDSperPage + numOfETDSperPage} of {etds.length}
            <Pagination size="sm">
              <Pagination.Prev />
              {pages}
              <Pagination.Next />
            </Pagination>
          </>
        )}
      </div>
    );
  }
}

const SearchItem = ({ etd, searchTerm }) => {
  // console.log(etd._source);

  const textStyle = {
    maxWidth: "100%",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const [truncate, setToggleTruncate] = React.useState(true);

  // This function toggles the state variable 'truncate', thereby expanding and truncating the text every time the user clicks the div.
  function toggleTruncate() {
    setToggleTruncate(!truncate);
  }
  let { title, author, university, year, text } = etd._source;
  <div>
    <p class="mb-1 text-start" onClick={SearchItem}>
      The Total number of search items are{" "}
    </p>
  </div>;
  return (
    <div class="container">
      <li class="mb-3 list-group-item">
    <dl class="row">
  

      <Link to={"/summary/"} state={{searchres:etd._source}} >
      <a class="btn btn-link  text-uppercase">{_getText(title, searchTerm)}</a>
      </Link>
     
      <dt class="col-sm-2"> Author(s) </dt>
      <dd class="col-sm-10">
      <p class= "mb-1 text-left">{author}</p>
      </dd>

      <dt class="col-sm-2"> University </dt>
      <dd class="col-sm-10 mb-1 text-left">{university}</dd>
      <dt class="col-sm-2"> Year </dt>
      <dd class="col-sm-10"><p class=" mb-1 text-left">{year}</p></dd>

      <dt class="col-sm-2"> Abstract </dt> 
      <dd class=" col-sm-10 mb-1 text-left" style={truncate ? textStyle : null}>
       {_getText(text, searchTerm)}
      </dd>
      <a class="mb-1 text-left" onClick={toggleTruncate}>
        {truncate ? "show more" : "show less"}
      </a>

    </dl>
    </li>
    </div>
    
  );
  
};
