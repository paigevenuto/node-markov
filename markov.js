/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1];
      if (nextWord == undefined) {
        nextWord = null;
      }
      if (chains[word]) {
        chains[word].push(nextWord);
      } else {
        chains[word] = [];
        chains[word].push(nextWord);
      }
    }
    this.chains = chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let text = "";
    let count = 0;
    let newStart = this.words[Math.floor(Math.random() * this.words.length)];
    while (
      newStart[0] != newStart.toUpperCase()[0] &&
      newStart[newStart.length - 1] != "."
    ) {
      newStart = this.words[Math.floor(Math.random() * this.words.length)];
    }
    let lastWord = newStart;
    text += newStart;
    while (count < numWords) {
      let newWord = this.chains[lastWord][
        Math.floor(Math.random() * this.chains[lastWord].length)
      ];
      while (newWord == undefined) {
        while (
          newWord[0] != newWord.toUpperCase()[0] &&
          newWord[newWord.length - 1] != "."
        ) {
          newWord = this.words[Math.floor(Math.random() * this.words.length)];
        }
      }
      text += " " + newWord;
      lastWord = newWord;
      count++;
    }
    console.log(text);
  }
}

module.exports = { MarkovMachine };
