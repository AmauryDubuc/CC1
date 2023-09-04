"use strict";


const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

function launchGame(_evt) {
  secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;
  maxGuesses = Math.ceil(Math.log($maxUsr.value)) + 1;
  $output.innerHTML = "";
  $output.innerHTML = "La partie commence, vous avez "+ maxGuesses +" coups maximum : <br>";
  $guessBtn.disabled = false;

  $guessBtn.addEventListener("click", function() {
    let User_val = parseInt($numUsr.value);
    if (nbGuesses > maxGuesses) {
      $output.innerHTML += "Dommage vous n'avez pas trouvé en " + nbGuesses + " coups";
      $guessBtn.disabled = true;
    } else {
      if (User_val > $maxUsr.value) {
        $output.innerHTML += User_val + " est au-dessus du nombre max<br>"; // Si le nombre dépasse le nombre max
      } else if (User_val < 0) {
        $output.innerHTML += User_val + " est au-dessous de 0<br>"; // Si le nombre est au-dessous de 0
      } else if (User_val > secretNumber) {
        $output.innerHTML += User_val + " est trop haut<br>";
        nbGuesses++;
      } else if (User_val < secretNumber){
        $output.innerHTML += User_val + " est trop bas<br>";
        nbGuesses++;
      } else {
        $output.innerHTML += "Bravo vous avez trouvé en " + nbGuesses + " coups";
        nbGuesses++;
        $guessBtn.disabled = true;
      }
    }
  })
  $numUsr.addEventListener("keypress", function(e) {  // Pour éviter de lancer en cliquant
    if (e.key === "Enter") {
      $guessBtn.click();
    }
  })
}

$startBtn.addEventListener("click", launchGame);


const container = document.createElement("div");
container.id = "image-vache";

function addCow(evt) {
  console.debug(evt.x, evt.y);
  const vache = document.createElement("img");
  vache.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";
  vache.classList.add("cow");
  vache.style.left = evt.x + window.scrollX + "px";
  vache.style.top = evt.y + window.scrollY + "px";
  const rotate = Math.random() * 360;
  vache.style.transform = `rotate(${rotate}deg)`;
  document.querySelector("body").appendChild(container);
  document.querySelector("#image-vache").appendChild(vache);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);