let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let startButton;

const resizeOps = () => {
  // document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
  document.documentElement.style.setProperty("--vw", window.innerWidth * 0.01 + "px");
};

resizeOps();
window.addEventListener("resize", resizeOps);

const moleCreate = setInterval(setMole, 1000); // 1000 miliseconds = 1 second, every 1 second call setMole
const plantCreate = setInterval(setPlant, 2000); // 2000 miliseconds = 2 seconds, every 2 second call setPla  

window.onload = function() {
  setGame();
}

function setGame() {
  // set up the grid for the game board in html
  for (let i = 0; i < 9; i++) {       //<div id="0-8"></div>    
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }
    
  // const moleCreate = setInterval(setMole, 1000); // 1000 miliseconds = 1 second, every 1 second call setMole
  // const plantCreate = setInterval(setPlant, 2000); // 2000 miliseconds = 2 seconds, every 2 second call setPla  

  startButton = document.createElement("button");
  startButton.id = "reStartButton";
  startButton.innerHTML = "Re-start";
  startButton.style.visibility = "hidden";
  startButton.addEventListener("click", reStartGame);
  document.getElementById("main").appendChild(startButton);
}

function getRandomTile() {
  //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMole() {

  if (currMoleTile) currMoleTile.innerHTML = "";
  
  let mole = document.createElement("img");
  mole.src = "./monty-mole.png";
  
  let num = getRandomTile();
  if (currPlantTile && currPlantTile.id == num) return;

  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
}

function setPlant() {

  if (currPlantTile) {
      currPlantTile.innerHTML = "";
  }
  let plant = document.createElement("img");
  plant.src = "./piranha-plant.png";

  let num = getRandomTile();
  if (currMoleTile && currMoleTile.id == num) return;

  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
}

function selectTile() {

  if (this == currMoleTile) {
      score += 10;
      document.getElementById("score").innerText = score.toString();  //update score html
  }
  else if (this == currPlantTile) {
      document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //update score html
      gameOver = true;
      
      startButton.style.visibility = "visible";
      clearInterval(moleCreate);
      clearInterval(plantCreate);
      // currMoleTile.innerHTML="";
      // currPlantTile.innerHTML=""
  }
}

function reStartGame() {
  window.location.reload();
}
