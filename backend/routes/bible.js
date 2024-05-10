var express = require("express");
var router = express.Router();
const https = require("https");
const { JSDOM } = require("jsdom");

/* GET users listing. */
router.get("/bible", async function (req, res, next) {
  //bible.oremus.org/?version=NRSVAE&passage=Mark%201.1-11
  const response = await getBibleVerse(req.query.book, req.query.chapter);
  const doc = JSDOM.fragment(response);
  //const doc = dom.window.document;
  const title = doc.querySelector(".passageref").textContent;
  const bibleText = doc.querySelector(".bibletext").textContent;
  console.log(title);
  console.log({ bibleText });
  res.send({ title: title, bibleText: bibleText });
});

async function getBibleVerse(book, chapter) {
  let promise = new Promise(function (resolve, reject) {
    let optString =
      "https://bible.oremus.org/?version=NRSV&passage=" +
      book +
      "%20" +
      chapter;
    console.log(optString);
    https.get(optString, (resp) => {
      var data = "";

      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        // result = JSON.parse(data);
        console.log(data);
        resolve(data);
      });
    });
  });
  return promise;
}

module.exports = router;
