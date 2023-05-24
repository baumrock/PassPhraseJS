"use strict";
class PassPhraseJS {
  constructor(words, options) {
    // default options
    this.minLength = 10;
    this.minWords = 2;
    this.maxWords = 4;
    this.separators = "+-*:.!?,";
    // user settings
    this.words = words || [];
    this.setOptions(options);
    this.init();
  }

  /**
   * Initialise all PassPhrase elements and listeners
   */
  init() {
    document.addEventListener("click", this.handleClick.bind(this));
    this.each(this.$$("[passphrasejs]"), (el) => {
      el.innerText = this.passphrase();
    });
    let info = this.$("[passphrasejs-info]");
    if (info) info.innerText = this.info().join("\n");
  }

  /**
   * Get a single matching dom element
   * @param {string} selector
   */
  $(selector) {
    return document.querySelector(selector);
  }

  /**
   * Get a list of matching dom elements
   * @param {string} selector
   */
  $$(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Copy passphrase to target elements
   * @param {HTMLElement} el
   * @returns void
   */
  copyTo(el) {
    if (!el) return;
    let selector = el.getAttribute("passphrasejs-copyto");
    let val = el.innerText;

    // copy to clipboard
    if (!navigator.clipboard) {
      const textArea = document.createElement("textarea");
      textArea.value = val;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Unable to copy to clipboard", err);
      }
      document.body.removeChild(textArea);
    } else navigator.clipboard.writeText(val);

    // trigger change event on the inputfields
    let event = new Event("change", { bubbles: true });
    this.each(this.$$(selector), (input) => {
      input.value = val;
      input.dispatchEvent(event);
    });
    return true;
  }

  /**
   * Execute callback for every item of the array
   * @param {array} array
   * @param {function} callback
   */
  each(array, callback) {
    for (var i = 0; i < array.length; i++) {
      callback(array[i]);
    }
  }

  /**
   * Handle click events
   * @param {PointerEvent} e
   */
  handleClick(e) {
    let el = e.target;
    if (this.copyTo(el.closest("[passphrasejs-copyto"))) e.preventDefault();
    if (this.renew(el.closest("[passphrasejs-renew"))) e.preventDefault();
  }

  /**
   * Get info array
   * @returns array
   */
  info() {
    let info = [
      "Words in the dictionary: " + this.words.length,
      "[" + this.words.join(", ") + "]",
      "",
      "--- Settings for random passphrase",
    ];
    let props = ["separators", "minLength", "minWords", "maxWords"];
    for (var i = 0; i < props.length; i++) {
      let prop = props[i];
      info.push(prop + ': "' + this[prop] + '"');
    }
    info.push("");
    info.push("--- Possible Passwords (minLength ignored)");
    info.push(
      this.possible({
        words: this.words.length,
        minWords: this.minWords,
        maxWords: this.maxWords,
        separators: this.separators,
      }).toLocaleString()
    );
    return info;
  }

  /**
   * Join words with random separator
   * @param {array} words
   * @param {string} separators
   * @returns string
   */
  join(words, separators) {
    let sep = "";
    let result = "";
    for (var i = 0; i < words.length; i++) {
      result = result + sep + words[i];
      sep = this.separator(separators);
    }
    return result;
  }

  /**
   * Get lowercase version of word
   * @param {string} word
   * @returns string
   */
  lower(word) {
    return word.toLowerCase();
  }

  /**
   * Generate a new random passphrase
   * @returns string
   */
  passphrase() {
    let numwords = this.rand(this.minWords, this.maxWords);
    let words = [];
    let exclude = [];
    for (var i = 0; i < numwords; i++) {
      var word = this.randomWord();
      words.push(word);
      exclude.push(this.lower(word));
    }
    let phrase = this.join(words);
    if (phrase.length < this.minLength) return this.passphrase();
    return phrase;
  }

  /**
   * Calculate approximate number of possible passwords for given settings
   * @param {object} settings
   */
  possible(settings) {
    if (settings.words < 1) return "-- INVALID --";
    let words = settings.words * 2; // upper + lowercase
    let dimensions = this.possibleDimensions(settings);
    let total = 0;

    this.each(dimensions, (dim) => {
      let dimPlain = Math.pow(words, dim);
      let numSeps = settings.separators.length; // +-* = 3
      let wordSeps = dim - 1; // dim=3 --> foo-bar-baz --> 2 seps
      let sepCombinations = Math.pow(numSeps, wordSeps);
      let dimTotal = dimPlain * sepCombinations;
      total += dimTotal;
    });

    return total;
  }

  /**
   * Get an array of possible dimensions (for calculator)
   * minWords = 2, maxWords = 4 --> [2, 3, 4]
   * @param {object} settings
   * @returns array
   */
  possibleDimensions(settings) {
    let dimensions = [];
    let max = settings.maxWords;
    while (max >= settings.minWords) {
      dimensions.push(max * 1);
      max--;
    }
    return dimensions;
  }

  /**
   * Return a random integer between min and max
   * @param {int} min
   * @param {int} max
   * @returns int
   */
  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Return a random single word
   * @returns string
   */
  randomWord() {
    let word = this.randomArrayElement(this.words);
    return this.randomArrayElement([this.lower(word), this.upper(word)]);
  }

  /**
   * Get random array element
   * @param {array} array
   * @returns string
   */
  randomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   *
   * @param {HTMLElement} el
   */
  renew(el) {
    if (!el) return;
    let selector = el.getAttribute("passphrasejs-renew");
    let target = this.$(selector);
    if (!target) return;
    target.innerText = this.passphrase();
    return true;
  }

  /**
   * Get a random separator
   * @returns string
   */
  separator(separators) {
    separators = separators || this.separators;
    return separators[Math.floor(Math.random() * separators.length)];
  }

  /**
   * Set options
   * @param {object} options
   * @param {bool} logInfo
   */
  setOptions(options, logInfo) {
    options = options || {};
    for (var prop in options) {
      let val = options[prop];
      this[prop] = val;
    }
    if (logInfo) console.log(this.info());
  }

  /**
   * Get word with first letter uppercase
   * @param {string} word
   * @returns string
   */
  upper(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
