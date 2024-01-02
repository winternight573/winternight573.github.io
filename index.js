/**
 * Name: Winnie Tsai
 * Date: Apr. 21, 2021
 * Section: CSE 154 AE
 * This JavaScript file defines the behavior for my index.html.
 * Basically, it gives behavior for all the buttons I have in my html.
 * Button types: tab, add, remove, play, pause, and clear.
 * It tells my page what to do when these buttons are clicked.
 */
"use strict";

(function() {
  /**
   * Add a function that will be called when the window is loaded.
   */
  window.addEventListener("load", init);

  /**
   * After the page loads, all the tab buttons, add, play, pause,
   * and clear button will have certain behavior when clicked.
   * Additionally, one of the tab buttons is clicked, to provide
   * a default open tab when page loads.
   */
  function init() {
    let tabButtons = qsa("#tab-bar button");
    for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].addEventListener("click", openTab);
    }
    tabButtons[0].click();

    let addButtons = qsa("#musics button, #sound-effects button");
    for (let i = 0; i < addButtons.length; i++) {
      addButtons[i].addEventListener("click", addToCurrent);
    }

    let playButton = id("play");
    playButton.addEventListener("click", playSongs);

    let pauseButton = id("pause");
    pauseButton.addEventListener("click", pauseSongs);

    let clearButton = id("clear");
    clearButton.addEventListener("click", clearAll);
  }

  /**
   * This even response function open the tab when its corresponding
   * tab button is clicked.
   */
  function openTab() {
    // Let every tab display return to default
    let tabButtons = qsa("#tab-bar button");
    for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].className = "";
    }
    let choices = qsa(".choices");
    for (let i = 0; i < choices.length; i++) {
      choices[i].className = "choices";
    }

    // Let the selected tab button and tab content be "active"
    let music = id("musics");
    let soundEffects = id("sound-effects");
    if (this.textContent === "Music") {
      music.classList.add("active");
    } else {
      soundEffects.classList.add("active");
    }
    this.classList.add("active");
  }

  /**
   * This fuction runs when the add button is clicked. It moves the whole
   * music choice to the Current Selection (#selected) section of the page.
   * Before it does so, it also stops playing that song (if it was being played.)
   * Also, the button change from an add button to a remove button.
   * It removes its adding function (the add button listener is removed,)
   * and adds a removing behavior.
   */
  function addToCurrent() {
    this.textContent = "Remove";
    this.previousElementSibling.load();
    this.removeEventListener("click", addToCurrent);
    this.addEventListener("click", resoreToChoices);
    id("selected").appendChild(this.parentElement);
  }

  /**
   * This function restores each music peice clicked to their original section
   * before they were added to the Current Selection section.
   * It stops playing and return to the beginning of the song (if it was playing.)
   * Also, it changes the buttons back to add, and removes its removing behavior,
   * while adding the adding bahaviors.
   */
  function resoreToChoices() {
    this.textContent = "Add";
    this.previousElementSibling.load();
    this.removeEventListener("click", resoreToChoices);
    this.addEventListener("click", addToCurrent);
    if (this.className === "music") {
      id("musics").appendChild(this.parentElement);
    } else {
      id("sound-effects").appendChild(this.parentElement);
    }
  }

  /**
   * This function plays all the audio in the Current Selection section.
   */
  function playSongs() {
    let songs = qsa("#selected audio");
    for (let i = 0; i < songs.length; i++) {
      songs[i].play();
    }
  }

  /**
   * This function pauses all the audio in the Current Selection section.
   */
  function pauseSongs() {
    let songs = qsa("#selected audio");
    for (let i = 0; i < songs.length; i++) {
      songs[i].pause();
    }
  }

  /**
   * This function clears all the songs in the Current Selection section
   * by clicking remove for all the buttons in this section.
   */
  function clearAll() {
    let removeButtons = qsa("#selected button");
    for (let i = 0; i < removeButtons.length; i++) {
      removeButtons[i].click();
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }
})();