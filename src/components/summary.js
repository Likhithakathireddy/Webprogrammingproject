import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useLocation, Link, useSearchParams } from "react-router-dom";

import Hovercard from "hovercard";

import { formWikifierTerms } from "./search";

const Summary = (props) => {
  const location = useLocation();

  let [searchParams, setSearchParams] = useSearchParams();

  const [state, setState] = useState();

  console.log("state?.searchres", state?.searchres);
  const title = window.localStorage.getItem("title");

  let { wikifier_terms: wikifierTerms } = state?.searchres || {}

  useEffect(() => {
    setState(location?.state)
    setSearchParams({ search: title})
  }, [title])

  useEffect(() =>{
    const cards = new Hovercard({
      lang: "en",
      getFetchEndpoint: (word) => {
        return `https://en.wikipedia.org/api/rest_v1/page/summary/${word.toLowerCase()}`
      },
      getHeading: (result) => result.title,
      template: (result) => (`<div class="hovercard-card ${result?.image ? "hover-has-image" : ""}">
        <h3 class="hovercard-title">
          <span class="mw-page-title-main">${result?.heading}</span>
        </h3>
        <a target="_blank" href="https://en.wikipedia.org/wiki/${result?.heading}">${result?.heading}</a>
        <p class="hovercard-description">${result?.body}</p>
        <div class="hovercard-image" style="background-image: url(${result?.image})"></div>
      </div>`)
    })
  }, [state])

  return (
    <>
      <div class="container">
        <div class="form-group col-md-3">
          {/* <button type="submit" href="/searchengine" class="btn btn-primary rounded-pill btn-block shadow-sm">Back to results</button> */}
          <Link to={`/?search=${title}`}>
            <a type="button" class="btn btn-primary mt-5">
              Back to Search
            </a>
          </Link>
          
        </div>
        <dl class="row">
          <dt class="mt-3 mb-3 text-left text-uppercase">{state?.searchres?.title}</dt>
          <dt class="col-sm-2">Author(s)</dt>
          <dd class="col-sm-10">
            <p class="mb-1 text-left"> {state?.searchres?.author}</p>
          </dd>
          <dt class="col-sm-2">University</dt>
          <dd class="col-sm-10">
            <p class="mb-1 text-left ">{state?.searchres?.university}</p>
          </dd>
          <dt class="col-sm-2">degree</dt>
          <dd class="col-sm-10">
            <p class="mb-1 text-left ">{state?.searchres?.degree}</p>
          </dd>
          <dt class="col-sm-2">Program</dt>
          <dd class="col-sm-10">
            <p class="mb-1 text-left ">{state?.searchres?.program}</p>
          </dd>
          <dt class="col-sm-2">Year Published</dt>
          <dd class="col-sm-10">
            <p class="mb-1 text-left ">{state?.searchres?.year}</p>
          </dd>

          <dt class="mb-3 btn-btn-link"><a href={`http://localhost:5000/fileInfo/${state?.searchres?.pdf}`} target="_blank" >View Document</a></dt>

          <dt class=" mb-1 text-left">Abstract</dt>
          <dd class="col-sm-2">
          </dd>
          {console.log(state?.searchres?.text, title, wikifierTerms)}
          <p class="mb-1 text-start">{formWikifierTerms(state?.searchres?.text, '', wikifierTerms)}</p>
        </dl>
      </div>
    </>
  );
};



export default Summary;