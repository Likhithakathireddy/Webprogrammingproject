import React, { Component } from "react";
import { Pagination } from "react-bootstrap";

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
      });
  }

  // handleCurrentPageItems(currentPageItems) {
  //   this.setState({
  //     currentPageItems,
  //   });

  //   this.setState((prev) => ({ ...prev, activePage: pageNumber }));
  // }

  pagination(number) {
    this.setState({
      active: number,
    });
    // axios
    //   .get(
    //     "https://rickandmortyapi.com/api/episode/" +
    //       totalEpis.slice(indOfFirstEpi, indOfLastEpi)
    //   )
    //   .then(data => {
    //     setEpi(data.data);
    //   });
  }

  render() {
    let { active } = this.state;
    let pages = [];
    let numOfETDSperPage = 5;
    let etds = this.state?.searchList;
    let currentPageItems = etds.slice(
      (active - 1) * numOfETDSperPage,
      (active - 1) * numOfETDSperPage + numOfETDSperPage
    );

    console.log({ etds, currentPageItems, active });
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

    return (
      <div class="container">
        <div class="mb-5 row">
          <div class="col-md-9 mx-auto">
            <div class="myform col-md-12 mt-3">
              <div class="logo mb-3">
                <div class="text-center">
                  {this.state.userData.fname && (
                    <h5>Welcome {this.state.userData.fname}!!!</h5>
                  )}
                </div>
              </div>
              {/* <form> */}
              <label for="exampleInputEmail1">Search Digital Library</label>

              <div class="d-flex mb-3 align-items-end">
                <div class="form-group col-md-10">
                  <input
                    class="form-control"
                    type="text"
                    onChange={(e) => {
                      this.setState({ searchTerm: e.target.value });
                    }}
                    autoComplete="on"
                    tabIndex="0"
                  />
                </div>
                <div class="text-center ms-3 d-flex align-items-center col-md-2">
                  {/* <button href="/homepage" class=" btn btn-block mybtn btn-primary tx-tfm">Search</button> */}
                  <p class="text-center mb-0 mt-2">
                    <a
                      onClick={this.searchElastic}
                      class="btn btn-primary"
                      tabIndex="0"
                    >
                      Search
                    </a>
                  </p>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div class="text-center">
                  <a
                    href="/insert"
                    class="btn btn-primary"
                    type="button"
                    value="Cancel"
                    tabIndex="0"
                  >
                    Insert Enter
                  </a>
                  <p></p>
                </div>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
        <p>Total no of etds :- {this.state.count} </p>
        <div class="container">
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
      The Total number of search iteams are{" "}
    </p>
  </div>;
  return (
    <li class="list-group-item">
      <p class="mb-1 text-star">Title: {_getText(title, searchTerm)}</p>
      <p class="mb-1 text-start">Author: {author}</p>
      <p class="mb-1 text-start">University: {university}</p>
      <p class="mb-1 text-start">Year: {year}</p>
      <p class="mb-1 text-start" style={truncate ? textStyle : null}>
        Abstract: {_getText(text, searchTerm)}
      </p>
      <a class="mb-1 text-start" onClick={toggleTruncate}>
        {truncate ? "show more" : "show less"}
      </a>
    </li>
  );
  
};
