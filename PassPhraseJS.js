"use strict";
class PassPhraseJS {
  constructor(words, options) {
    // default options
    this.minLength = 10;
    this.minWords = 2;
    this.maxWords = 4;
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
    this.each(this.$$(selector), (input) => {
      input.value = val;
    });
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
    this.copyTo(el.closest("[passphrasejs-copyto"));
    this.renew(el.closest("[passphrasejs-renew"));
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
    let props = ["minLength", "minWords", "maxWords"];
    for (var i = 0; i < props.length; i++) {
      let prop = props[i];
      info.push(prop + ": " + this[prop]);
    }
    info.push("");
    info.push("--- Possible Passwords (minLength ignored)");
    info.push(
      this.possible({
        words: this.words.length,
        minWords: this.minWords,
        maxWords: this.maxWords,
      })
    );
    return info;
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
      var word = this.randomWord(exclude);
      words.push(word);
      exclude.push(this.lower(word));
    }
    let phrase = words.join("-");
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
    let numWords = settings.maxWords - settings.minWords + 1;
    let approx = Math.pow(words, numWords);
    if (approx < words) return "-- INVALID --";
    return approx;
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
   * @param {array} exclude
   * @returns string
   */
  randomWord(exclude) {
    let word = this.randomArrayElement(this.words);
    let lower = this.lower(word);
    let upper = this.upper(word);
    if (exclude.includes(lower)) return this.randomWord(exclude);
    return this.randomArrayElement([lower, upper]);
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
    if (target) target.innerText = this.passphrase();
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
      console.log("set option", prop, val);
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
