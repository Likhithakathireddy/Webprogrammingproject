const CSVToJSON = require("csvtojson");
const fs = require("fs");

const ES_CONFIG = {
  userKey: "ylfmarzslsckbfvmptantcimnvriyt",
  pageRankSqThreshold: "0.8",
  applyPageRankSqThreshold: "true",
  nTopDfValuesToIgnore: "200",
  nWordsToIgnoreFromList: "200",
  wikiDataClasses: "true",
  wikiDataClassIds: "false",
  support: "true",
  ranges: "false",
  minLinkFrequency: "2",
  includeCosines: "false",
  maxMentionEntropy: "3",
  lang: "en",
};

const wikifier_config = {
  method: "post",
  url: "http://www.wikifier.org/annotate-article",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

CSVToJSON()
  .fromFile("metadata_abstract.csv")
  .then(async (etds) => {
    const axios = require("axios");
    const qs = require("qs");

    try {
      const doETDs = async () => {
        let results = [];

        for (const item of etds) {
          const data = qs.stringify({
            ...ES_CONFIG,
            text: item.text,
          });

          let response = await axios({
            ...wikifier_config,
            data,
          });
          let { annotations } = response.data;

          let filteredAnnotations = annotations.map((annotation) => ({
            term: annotation.title,
            url: annotation.url,
          }));

          const json = {
            ...item,
            wikifier_terms: filteredAnnotations,
          };

          results.push(json);
        }

        return results;
      };

      console.time("test");

      // console.log(">>>>1");
      const results = await doETDs();
      // console.log(">>>>2");
      

      console.log({ results });

      console.timeEnd("test");
      fs.writeFile(
        "result.json",
        JSON.stringify(results),
        "utf8",
        function (err) {
          if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
          }

          console.log("JSON file has been saved.");
        }
      );
    } catch (error) {
      console.log("writefile>>>", error);
    }
  })
  .catch((err) => {
    // log error if any
    console.log("err>>", err);
  });
