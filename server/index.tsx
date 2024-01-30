require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3062;

app.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

// app.get("*", (_, res) => {
//   fs.readFile(indexPath, "utf8", async (_, htmlData: any) => {
//     htmlData = htmlData
//       .replace(
//         "__META_OG_TITLE__",
//         "DU10 Do Your Best - Make Everything Better"
//       )
//       .replace("__META_OG_URL__", "du10jp.com")
//       .replace("__META_OG_IMAGE__", "./images/logo_du10.svg");
//     return res.send(htmlData);
//   });
// });

app.listen(PORT, (error: string) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});
