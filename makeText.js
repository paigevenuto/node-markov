/** Command-line tool to generate Markov text. */
const process = require("process");
const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require("./markov");
let sampleText;

async function makeText() {
  const sourceType = process.argv[2];
  const filePath = process.argv[3];

  if (sourceType === "file") {
    sampleText = fs.readFileSync(filePath, "utf8", function (err, data) {});
  } else if (sourceType === "url") {
    const response = await axios.get(filePath);
    console.log(filePath);
    sampleText = response.data;
  }
  let markovGen = new MarkovMachine(sampleText);
  markovGen.makeChains();
  markovGen.makeText();
}

makeText();
