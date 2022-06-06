let submit_btn = document.getElementById('submit');
let guess_bar = document.getElementById('guessBar');
let randomPokemon;
let hint = document.getElementById("hintButton");
let pokemonArray = [];
let hintType = [getGeneralHintOne, getGeneralHintTwo, generationHint, getFirstLetter, getSpriteHint];
let hintNum = 0;
let alreadyGuessed = [];
let load = 0;

window.onload = function() {
  setInterval(function() {
    load += 1;
    document.getElementById("loadst").innerText = Math.floor(load) + "%";
    
    if(load == 100) {
      document.getElementById("loadst").style.visibility = "hidden";
      document.getElementById("loading_page").style.visibility = "hidden";
    }
  }, 100)
  document.getElementById("lightbox").onclick = function() {
    this.style.display = "none";
  }
  document.getElementById("message").onclick = function() {
    this.style.display = "none";
  }
  
  let hint = document.getElementById("hintButton");
  hint.onclick = function() {
    if(hintNum < hintType.length) {
      hintType[hintNum]();
      hintNum++;
    } else {
      console.log("no hints left");
    }

  };
  loadAllPokemon();
};





function loadAllPokemon() {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=1126')
    .then(response => response.json())
    .then(data => getRandomPokemon(data));
}


function getRandomPokemon(data) {
  let currentGuess = 0;

  Object.values(data.results).forEach(item => {
    pokemonArray.push(item.name);
    let eachLabelForText = document.createElement("option");
    eachLabelForText.for = "guessBar";
    eachLabelForText.value = item.name;
    fetch("https://pokeapi.co/api/v2/pokemon/" + item.name)
      .then(res => res.json())
      .then(daata => getAllTypes(daata, eachLabelForText));


    document.getElementById("pokemon").appendChild(eachLabelForText);
  });

  let randomNumberForPokemon = Math.floor(Math.random() * (data.results.length + 1));

  randomPokemon = data.results[randomNumberForPokemon].name;


  fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon)
    .then(res => res.json())
    .then(d => getNonFormPokemon(d));
	
  let submit_btn = document.getElementById('submit');
  submit_btn.onclick = function() {
	
	let guess_bar = document.getElementById('guessBar');
    if(pokemonArray.includes(guess_bar.value)) {
      if(guess_bar.value == randomPokemon) {
        guess_bar.placeholder = "Who is that Pokemon . . ."
        currentGuess++;
        showEndBox(currentGuess);
		
		 document.getElementById("lightbox").style.display = "block";
         document.getElementById("message").style.display = "block"
         document.getElementById("message").innerHTML = "<p>Congratulations! You win!</p>"
		 
      } else {
        if(alreadyGuessed.includes(guess_bar.value)) {
          guess_bar.placeholder = "Already Guessed this pokemon."
        } else {
          alreadyGuessed.push(guess_bar.value);

          let guess_log = document.querySelector('.guess-log');
          currentGuess++;
          let eachGuess = document.createElement('div');
          eachGuess.classList.add('guess');
          eachGuess.style.marginBottom = '21px';
          guess_log.appendChild(eachGuess);
          let wrongX = document.createElement("span");
          wrongX.innerText = "X";
          wrongX.style.float = "right";
          wrongX.style.color = "red";
          wrongX.style.fontSize = "1.8rem";
          wrongX.style.transform = "translate(-20px, -37px)";
          wrongX.style.textTransform = "bold";

          let guess_text = document.createElement('p')
          guess_text.innerText = guess_bar.value;
          eachGuess.appendChild(guess_text);
          eachGuess.appendChild(wrongX);


          guess_bar.placeholder = "Who is that Pokemon . . ."
        }
      }
    } else {
      guess_bar.placeholder = "Not a valid Pokemon!"
    }

    guess_bar.value = '';
  };





}


function getNonFormPokemon(d) {
  randomPokemon = d.species.name;
  console.log(randomPokemon)
}





function showEndBox(currentGuess) {

  
}




function generationHint() {
  fetch("https://pokeapi.co/api/v2/pokemon-species/" + randomPokemon)
    .then(response => response.json())
    .then(data => generation(data) 
         );
}


function getGeneralHintOne(){
  fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/" )
    .then(response => response.json())
    .then(data => typeOne(data) 
         );
}

function getGeneralHintTwo(){
  fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/" )
    .then(response => response.json())
    .then(data => typeTwo(data) 
         );
}

function getFirstLetter(){
  document.getElementById("lightbox").style.display = "block";
  document.getElementById("message").style.display = "block";
  document.getElementById("message").innerHTML = "<p>This first letter of this Pokemon's name is: " + randomPokemon.charAt(0) + "</p>";
}


function typeOne(data) {
  //a or an
  document.getElementById("lightbox").style.display = "block";
  document.getElementById("message").style.display = "block";
  document.getElementById("message").innerHTML = "<p>This Pokemon is a " + data.types[0].type.name + " type</p>";

}

function typeTwo(data) {
  document.getElementById("lightbox").style.display = "block";
  document.getElementById("message").style.display = "block";



  try {
    document.getElementById("message").innerHTML = "<p>This Pokemon is a " + data.types[1].type.name + " type</p>"
    console.log(data.types[1].type.name);
  } catch {
    document.getElementById("message").innerHTML = "<p>This Pokemon only has a Single Type</p>"
  }
}

function generation(data) {
  document.getElementById("lightbox").style.display = "block";
  document.getElementById("message").style.display = "block"

  document.getElementById("message").innerHTML = "<p>This Pokemon is from " + data.generation.name + "</p>"
}


function getSpriteHint() {
  fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/" )
    .then(response => response.json())
    .then(data => spriteHint(data) 
         );
}


function spriteHint(data) {
  document.getElementById("lightbox").style.display = "block";
  document.getElementById("message").style.display = "block"

  document.getElementById("message").innerHTML = "<img id='pokemonImage' alt='pokemon sprite' src=" + data.sprites.front_default + ">"
  console.log(data.sprites.front_default);
}


function getAllTypes(daata, eachLabelForText) {
  eachLabelForText.innerText = daata.types[0].type.name;
  try {
    eachLabelForText.innerText += ", " + daata.types[1].type.name;
  } catch {
    return;
  }
}

