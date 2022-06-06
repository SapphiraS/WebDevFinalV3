let submit_btn = document.getElementById('submit');
let guess_bar = document.getElementById('guessBar');
let guessButton = document.getElementById('guess');
let randomPokemon;
let correctAnswer = 0;

var types = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'];
var generations = ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi', 'generation-vii', 'generation-viii',];

let hint = document.getElementById("hintButton");
let hintType = [getGeneralHintOne, getGeneralHintTwo, generationHint, getFirstLetter, getSpriteHint];
let hintNum = 0; 

window.onload = function() {
	loadAllPokemon();

 var typesList = document.getElementById('allTypes');
	for(var item of types){
		var option = document.createElement('option');
		option.value = item;
		typesList.appendChild(option);
	};
	
	var generationsList = document.getElementById('allGenerations');
	for(var item of generations){
		var option = document.createElement('option');
		option.value = item;
		generationsList.appendChild(option);
	};
	
	document.getElementById("lightbox").onclick = function() {
    this.style.display = "none";
  }

};

function hintClicked() {
    /*if(hintNum < hintType.length) {
      hintType[hintNum]();
      hintNum++;
    } else {
      console.log("no hints left");
    }*/
	
 }; 
 

function loadAllPokemon() {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=1126')
    .then(response => response.json())
    .then(data => getRandomPokemon(data));
}

function getRandomPokemon(data) {
   let currentGuess = 0;
  let pokemonArray = [];
  Object.values(data.results).forEach(item => {
    pokemonArray.push(item.name);
    let eachLabelForText = document.createElement("option");
    eachLabelForText.for = "guessBar";
    eachLabelForText.value = item.name;
    //console.log(item);
    //document.getElementById("pokemon").appendChild(eachLabelForText);
  });
  
  let randomNumberForPokemon = Math.floor(Math.random() * (data.results.length + 1));
  randomPokemon = data.results[randomNumberForPokemon].name;
  
  if(randomPokemon.includes('-')){
	  location.reload();
	/*let x = randomPokemon.indexOf('-');
	 console.log(randomPokemon);
	randomPokemon = randomPokemon.substring(0,x);
	console.log(x);
	console.log(randomPokemon.length);*/
  }

  if(randomPokemon.includes('-')) {
    console.log(data);
  }

	
  console.log(randomPokemon);
  document.getElementById('quizPokemon').innerHTML = randomPokemon;

  function submitClicked() {

    if(pokemonArray.includes(guess_bar.value)) {
      if(guess_bar.value == randomPokemon) {
        guess_bar.placeholder = "Who is that Pokemon . . ."
        currentGuess++;
        showEndBox(currentGuess);
      } else {
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
    } else {
      guess_bar.placeholder = "Not a valid Pokemon!"
    }

    guess_bar.value = '';
  };
  
	
}//get random pokemon

function guessFetch1(){
	fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/" )
	.then(response => response.json())
    .then(data => guessHeight(data) 
    );
}
function guessFetch4(){
     fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/" )
	.then(response => response.json())
    .then(data => guessType(data) 
    );
}

function guessFetch3(){
	fetch("https://pokeapi.co/api/v2/pokemon-species/" + randomPokemon + "/" )
	.then(response => response.json())
    .then(data => guessGeneration(data) 
    );
}

function guessFetch2(){	
	fetch("https://pokeapi.co/api/v2/pokemon-species/" + randomPokemon + "/" )
	.then(response => response.json())
    .then(data => guessColor(data) 
    );
}	

function guessFetch5(){	
	fetch("https://pokeapi.co/api/v2/pokemon-species/" + randomPokemon + "/" )
	.then(response => response.json())
    .then(data => guessCapture(data) 
    );
}	

function guessHeight(data){
	var heightGuess = document.getElementById("Q1").value;
	let heightAnswer = data.height * 10;
	
	console.log(data);
	
	if(!isNaN(heightGuess)){
		if (heightGuess == heightAnswer){
			console.log("that is the correct height");
			document.getElementById("heightQuestion").innerHTML = "The height of a " + randomPokemon + " is " + heightAnswer + "!";
			document.getElementById("Q1").style.backgroundColor = "#92C8AB";
			correctAnswer++;
			winner();
		} else {
			if (heightGuess > heightAnswer){
			console.log("the height is shorter than " + heightGuess);
			document.getElementById("Q1").style.backgroundColor = "#e35b5b";
			document.getElementById("heightQuestion").innerHTML = "The height of a " + randomPokemon + " is shorter than " + heightGuess;
			
			} else {
				console.log("the height is taller than " + heightGuess);
				document.getElementById("Q1").style.backgroundColor = "#e35b5b";
				document.getElementById("heightQuestion").innerHTML = "The height of a " + randomPokemon + " is taller than " + heightGuess;
			}
		}
	} else {
		console.log("invalid");
		document.getElementById("heightQuestion").innerHTML = "Please enter a valid height";
	}
}

function guessColor(data){
	var colorGuess = document.getElementById("Q2").value;
	let colorAnswer = data.color.name;
	
	console.log(data);
	if(isNaN(colorGuess)){
		if (colorGuess == colorAnswer){
			console.log("that is the correct color");
			document.getElementById("colorQuestion").innerHTML = "The color of a " + randomPokemon + " is " + colorAnswer + "!";
			document.getElementById("Q2").style.backgroundColor = "#92C8AB";
			correctAnswer++;
			winner();
		}else {
		console.log("that is the wrong color");
		document.getElementById("colorQuestion").innerHTML = "The color is not " + colorGuess;
		document.getElementById("Q2").style.backgroundColor = "#e35b5b";
		}
	}else{
		console.log("invalid");
		document.getElementById("colorQuestion").innerHTML = "Please enter a valid color";
	}
}

function guessGeneration(data){
	var generationGuess = document.getElementById("Q3").value;
	let generationAnswer = data.generation.name;
	
	console.log(data);
	
	if(isNaN(generationGuess)){ // not working
		if (generationGuess == generationAnswer){
			console.log("that is the correct generation");
			document.getElementById("generationQuestion").innerHTML = "The generation of a " + randomPokemon + " is " + generationAnswer + "!";
			document.getElementById("Q3").style.backgroundColor = "#92C8AB";
			correctAnswer++;
			winner();
		} else {
		  console.log("that is the wrong generation");
		  document.getElementById("generationQuestion").innerHTML = "The generation is not " + generationGuess;
		  document.getElementById("Q3").style.backgroundColor = "#e35b5b";
		}
	}else {
		console.log("invalid");
		document.getElementById("generationQuestion").innerHTML = "Please enter a valid generation";
	}
}

function guessType(data){
	var typeGuess = document.getElementById("Q4").value;
	let typeAnswer = data.types[0].type.name;
	
	console.log(data);
	
	if(isNaN(typeGuess)){
		if (typeGuess == typeAnswer){
			console.log("that is the correct type");
			document.getElementById("typeQuestion").innerHTML = "The type of a " + randomPokemon + " is " + typeAnswer + "!";
			document.getElementById("Q4").style.backgroundColor = "#92C8AB";
			correctAnswer++;
			winner();
		} else {
		  console.log("that is the wrong type");
		  document.getElementById("typeQuestion").innerHTML = "The type is not " + typeGuess;
		  document.getElementById("Q4").style.backgroundColor = "#e35b5b";
		}
	}else{
		console.log("invalid");
		document.getElementById("typeQuestion").innerHTML = "Please enter a valid type";
	}
}

function guessCapture(data){
	var captureGuess = document.getElementById("Q5").value;
	let captureAnswer = data.capture_rate;
	
	console.log(data);
	
	if(!isNaN(captureGuess)){
		if (captureGuess == captureAnswer){
		   console.log("that is the correct capture rate");
		   document.getElementById("captureQuestion").innerHTML = "The capture rate of a " + randomPokemon + " is " + captureAnswer + "!";
		
			document.getElementById("Q5").style.backgroundColor = "#92C8AB";
			correctAnswer++;
			winner();
		} else {
			if (captureGuess > captureAnswer){
			console.log("the capture rate is smaller than " + captureGuess);
			document.getElementById("Q5").style.backgroundColor = "#e35b5b";
			document.getElementById("captureQuestion").innerHTML = "The capture rate of a " + randomPokemon + " is smaller than " + captureGuess;
			
			} else {
				console.log("the capture rate is larger than " + captureGuess);
				document.getElementById("Q5").style.backgroundColor = "#e35b5b";
				document.getElementById("captureQuestion").innerHTML = "The capture rate of a " + randomPokemon + " is larger than " + captureGuess;
			}
		}
	} else {
		console.log("invalid");
		document.getElementById("captureQuestion").innerHTML = "Please enter a valid capture rate";
		
	}
}

function winner(){
	console.log(correctAnswer);
	if (correctAnswer == 5){
		console.log("you win!");
		
		 document.getElementById("lightbox").style.display = "block";
         document.getElementById("message").style.display = "block"
         document.getElementById("message").innerHTML = "<p>Congratulations! You win!</p>"
	}
	
}



function showEndBox(currentGuess) {
  console.log(currentGuess);
}





//HINTS
function generationHint() {
  fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/")
    .then(response => response.json())
    .then(data => generation(data) 
         );
}

function getGeneralHintOne(){
  fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/")
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
  console.log(randomPokemon.charAt(0));
}

function getSprite(){
  console.log("g");
  // fetch(" https://pokeapi.co/api/v2/pokemon-form/" + randomPokemon + "/" )
  //   .then(response => response.json())
  //   .then(data => spriteHint(data) 
  //        );
}

function typeOne(data) {
  //a or an
  console.log(data.types[0].type.name);

}



function typeTwo(data) {
  try {
    console.log(data.types[1].type.name);
  } catch {
    console.log("single type");
  }
}

function generation(data) {
  console.log(data.species.name);
}


function getSpriteHint() {
  fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/" )
    .then(response => response.json())
    .then(data => spriteHint(data) 
         );
}


function spriteHint(data) {
  console.log(data.sprites.front_default);
}


/*

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

document.querySelector('#show').addEventListener('click', () => {
  const iconUrl = document.querySelector('select').selectedOptions[0].value;
  let imgElement = document.createElement('img');
  imgElement.src = iconUrl;
  document.querySelector('#container').appendChild(imgElement);
});

*/


