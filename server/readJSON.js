const fs = require("fs");
const axios = require("axios");

fs.readFile("./result.json", "utf8", async (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }

  console.log("File data:", JSON.parse(jsonString).length);

  const jsonArr = JSON.parse(jsonString);

  for (const item of jsonArr) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    try {
      let esConfig = {
        method: "post",
        url: `http://localhost:9200/library/_doc/${item?.etd_file_id}`,
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios({
        ...esConfig,
        data: item,
      });
      console.log(item.etd_file_id);

      //   console.log({ esResponse });
    } catch (error) {
      console.log("esConfig", esConfig.url);
      console.error(error);
    }
  }
});
