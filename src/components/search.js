import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import filterXSS from "xss";

import "./css/login.css";


export const doStringFormatting = (str = "") => {
    const regex2 = new RegExp("\\[\\'", "gi");
    const regex3 = /']/gi;
    const regex4 = /"]/gi;
    const regex5 = new RegExp('\\[\\"', "gi");
    str = str.replace(regex2, "");
    str = str.replace(regex3, "");
    str = str.replace(regex4, "");
    str = str.replace(regex5, "");
    return str;
};

const addOverLay = (text, keyword) => {
    return keyword.reduce((sum, acc) => {
        let { term, url } = acc

        const regex2 = new RegExp(term, "gi");
        let sTerm = sum !== "" ? sum : text;

        sum = sTerm?.replace(regex2, `<span class="hovercard">$&</span>`)

        return sum;
    }, '')
}

export const formWikifierTerms = (text, searchText = '', keyword = []) => {
    let newText = text
    if (searchText) {
        const regex1 = new RegExp(searchText, "gi");
        newText = text?.replace(regex1, `<mark class="highlight">$&</mark>`);
    }

    newText = doStringFormatting(newText);
    newText = keyword.length > 0 ? addOverLay(newText, keyword) : newText;


    return <span dangerouslySetInnerHTML={{ __html: newText }} />;
};
export default () => {
    let [searchParams, setSearchParams] = useSearchParams();

    const [state, setState] = useState({
        userData: "",
        searchTerm: searchParams.get("search") || "",
        searchList: [],
        count: null,
        currentPageItems: [],
        active: 1,
        lastPageNum: 0,
        page: 1,
    })


    useEffect(() => {
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
                setState({ ...state, userData: data.data });
                window.localStorage.setItem("email", data.data.email);
                window.localStorage.setItem("lname", data.data.lname);
                window.localStorage.setItem("fname", data.data.fname);
                window.localStorage.setItem("phonenumber", data.data.phonenumber);
                window.localStorage.setItem("key", data.data.key);
            });
    }, [])

    // console.log({ searchTerm: state.searchTerm})

    useEffect(() => {
        searchElastic(state.searchTerm)
    }, [])

    const searchElastic = (sTerm) => {
        let searchTerm = sTerm || state?.searchTerm;

        searchTerm = filterXSS(searchTerm, {
            stripIgnoreTag: true
        })
        console.log({ searchTerm });

        setSearchParams({ search: searchTerm })

        fetch("http://localhost:5000/search?search=" + searchTerm, {
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
                setState({ ...state, searchList: data.results, count: data.count, page: 1 });
                window.localStorage.setItem("title", filterXSS(state?.searchTerm, {
                    stripIgnoreTag: true
                }));
            });
    }

    const pagination = (number) => {
        setState({
            ...state,
            active: number,
            page: number,
        });
    }

    const createPaginationBar = (etds, numOfETDSperPage) => {
        let paginationBar = [];
        let lastPageNum = Math.ceil(etds.length / numOfETDSperPage);
        var { page: pageNum } = state;

        // console.log({ pageNum, lastPageNum });

        if (pageNum != 1) {
            paginationBar.push(
                <Pagination.First
                    onClick={(e) => {
                        pagination(1);
                    }}
                />
            );
            paginationBar.push(
                <Pagination.Prev onClick={(e) => { pagination(pageNum - 1) }} />
            )
            if (pageNum != 2) {
                paginationBar.push(
                    <Pagination.Item
                        onClick={(e) => {
                            pagination(pageNum - 2);
                        }}>
                        {pageNum - 2}
                    </Pagination.Item>
                );
            }
            paginationBar.push(
                <Pagination.Item
                    onClick={(e) => {
                        pagination(pageNum - 1);
                    }}>
                    {pageNum - 1}
                </Pagination.Item>
            );
        }
        paginationBar.push(
            <Pagination.Item
                active
                onClick={(e) => {
                    pagination(pageNum);
                }}>
                {pageNum}
            </Pagination.Item>
        );
        if (pageNum != lastPageNum) {
            paginationBar.push(
                <Pagination.Item
                    onClick={(e) => {
                        pagination(pageNum + 1);
                    }}>
                    {pageNum + 1}
                </Pagination.Item>
            );
            if (pageNum != lastPageNum - 1) {
                paginationBar.push(
                    <Pagination.Item
                        onClick={(e) => {
                            pagination(pageNum + 2);
                        }}>
                        {pageNum + 2}
                    </Pagination.Item>
                );
            }
            paginationBar.push(
                <Pagination.Next onClick={(e) => { pagination(pageNum + 1) }} />
            )
            paginationBar.push(
                <Pagination.Last
                    onClick={(e) => {
                        pagination(lastPageNum);
                    }}
                />
            );
        }
        // console.log({ paginationBar });
        return paginationBar;
    }

    let { active } = state;

    let numOfETDSperPage = 10;
    let etds = state?.searchList;

    let currentPageItems = etds?.slice(
        (active - 1) * numOfETDSperPage,
        (active - 1) * numOfETDSperPage + numOfETDSperPage
    );

    var s_title = window.localStorage.getItem("title");
    return (
        <div class="container">
            <div class=" row">
                <div class="col-md-6 mx-auto">
                    <div class="myform col-md-12 mt-3">
                        <div class="logo mb-3">
                            <div class="text-center">
                                {state?.userData?.fname && (
                                    <h5>
                                        Welcome to Digital library {state?.userData?.fname}
                                    </h5>
                                )}
                            </div>
                        </div>
                        {/* <form> */}
                        <div class="fw-bold text-center">
                            <label for="exampleInputEmail1">Search Digital Library</label>
                        </div>

                        <div class="mb-3 align-items-end">
                            <div class="form-group col-md-12">
                                <input
                                    class="form-control"
                                    type="text"
                                    //placeholder="What are you looking for?"
                                    onChange={(e) => {
                                        setState({ ...state, searchTerm: e.target.value });
                                    }}
                                    onKeyUp={(e) => {
                                        if(e.key == 'Enter') searchElastic();
                                    }}
                                    autoComplete="on"
                                    tabIndex="0"
                                    value={state.searchTerm}
                                //value = {s_title}
                                />
                            </div>
                            <div class="text-center col-md-12">
                                {/* <button href="/homepage" class=" btn btn-block mybtn btn-primary tx-tfm">Search</button> */}
                                <p class="text-center mb-0 mt-2">
                                    <a
                                        onClick={() => searchElastic()}
                                        class=" btn btn-primary "
                                        tabIndex="0">
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
                                        tabIndex="0">
                                        Insert ETD
                                    </a>
                                    <p></p>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}

                        {/* </form> */}
                    </div>
                </div>
            </div>

            <div class="container  mt-3 mb-5">
                {state?.count ? (
                    <h3>
                        The total number of search items {state?.count} for {s_title}{" "}
                    </h3>
                ): ''}
                {/* <p class="fw-bold">The total number of search items {state?.count} for {s_title} </p> */}
                <ul class="list-group">
                    {currentPageItems?.map((etd) => (
                        <SearchItem etd={etd} searchTerm={s_title} />
                    ))}
                </ul>
            </div>
            <div class="container">
            {currentPageItems?.length > 0 && (
                <>
                    Showing {(active - 1) * numOfETDSperPage} -{" "}
                    {(active - 1) * numOfETDSperPage + numOfETDSperPage} of{" "}
                    {etds.length}
                    <Pagination className="justify-content-center">
                        {createPaginationBar(etds, numOfETDSperPage)}
                    </Pagination>
                </>
            )}
            </div>
        </div>
    );
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
    let { title, author, university, year, text, wikifier_terms: wikifierTerms } = etd._source;

    return (
        <div class="container">
            <li class="mb-3 list-group-item">
                <dl class="row">
                    <Link class="btn btn-link text-uppercase text-start" to={"/summary/"} state={{ searchres: etd._source }}>
                        {/* <a > */}
                        {formWikifierTerms(title, searchTerm)}
                        {/* </a> */}
                    </Link>

                    <dt class="col-sm-2"> Author(s) </dt>
                    <dd class="col-sm-10">
                        <p class="mb-1 text-left">{author}</p>
                    </dd>

                    <dt class="col-sm-2"> University </dt>
                    <dd class="col-sm-10 mb-1 text-left">{university}</dd>
                    <dt class="col-sm-2"> Year </dt>
                    <dd class="col-sm-10">
                        <p class=" mb-1 text-left">{year}</p>
                    </dd>

                    {text ? <><dt class="col-sm-2"> Abstract </dt>
                        <dd
                            class=" col-sm-10 mb-1 text-left"
                            style={truncate ? textStyle : null}>
                            {formWikifierTerms(text, searchTerm)}

                        </dd>
                        <a class="mb-1 text-left" onClick={toggleTruncate}>
                            {truncate ? "show more" : "show less"}
                        </a></> : ''}

                </dl>
            </li>
        </div>
    );
};
