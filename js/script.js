"use strict";
const textNode = document.querySelector("#text");
const fieldNode = document.querySelector("#textfield");
const timerNode = document.querySelector("#timer");
let quoteNodeArray,
  timerInterval,
  count = 1;

const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function getNextQuote() {
  let quote = await getRandomQuote();
  let quoteArray = quote.split("");
  quoteArray.forEach((val) => {
    let span = document.createElement("span");
    span.innerText = val;
    textNode.append(span);
  });
  quoteNodeArray = textNode.querySelectorAll("span");
  setTimer();
}

function setTimer() {
  const startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
  function updateTimer() {
    let currentTime = new Date();
    let difference = (currentTime - startTime) / 1000;
    difference = Math.floor(difference);
    timerNode.innerText = difference;
  }
}

function clearTimer() {
  clearInterval(timerInterval);
  timerNode.innerText = 0;
}

function logTime() {
  let time = timerNode.innerText;
  let chars = quoteNodeArray.length;
  let speed = Math.round((chars / time + Number.EPSILON) * 100) / 100;
  console.log(
    `%c #${count++}`,
    "color:orange; font-size: 24px; background-color: blue; padding: 0 1rem;"
  );
  console.log(
    `%c Total time is ${time}s`,
    "color:orange; font-size: 24px; background-color: purple; padding: 0 1rem;"
  );
  console.log(
    `%c Characters: ${chars}.`,
    "color:orange; font-size: 24px; background-color: purple; padding: 0 1rem;"
  );
  console.log(
    `%c Speed: ${speed}char/s.`,
    "color:orange; font-size: 24px; background-color: purple; padding: 0 1rem;"
  );
}

function clearAll() {
  textNode.innerText = null;
  fieldNode.value = null;
  clearTimer();
}

clearAll();
getNextQuote();

fieldNode.addEventListener("input", () => {
  checkTyping();
});
function checkTyping() {
  let isCorrect = true;
  let userText = fieldNode.value;
  userText = [...userText];
  quoteNodeArray.forEach((val, index) => {
    let char = userText[index];
    val.classList.remove("_correct", "_incorrect");
    if (char !== undefined) {
      if (val.innerText == char) {
        val.classList.add("_correct");
      } else {
        val.classList.add("_incorrect");
        isCorrect = false;
      }
    } else {
      isCorrect = false;
    }
  });
  if (isCorrect) {
    logTime();
    clearAll();
    getNextQuote();
  }
}
