// object of key value pairs where key is the image file name and value is the img id
const imageNameObj = {
  "3x3": {
    1: "0-0",
    2: "0-1",
    3: "0-2",
    4: "1-0",
    5: "1-1",
    6: "1-2",
    7: "2-0",
    8: "2-1",
    9: "2-2",
  },
  "4x4": {
    1: "0-0",
    2: "0-1",
    3: "0-2",
    4: "0-3",
    5: "1-0",
    6: "1-1",
    7: "1-2",
    8: "1-3",
    9: "2-0",
    10: "2-1",
    11: "2-2",
    12: "2-3",
    13: "3-0",
    14: "3-1",
    15: "3-2",
    16: "3-3",
  },
};

const blankTileIdObj = {
  "3x3": {
    0: "0-2", // alien-3x3
    1: "0-2", // buzz-lightyear-3x3
    2: "0-2", // mr-potato-3x3
  },
  "4x4": {
    0: "0-0", // jessie-4x4
    1: "0-3", // woody-bullseye-4x4
    2: "0-0", // woody-lasso-4x4
  },
};

// variables for game
let blankTileId;
const timerCounterInt = 60;
let userTile;
let otherTile;
let userXPosition;
let userYPosition;
let otherXPosition;
let otherYPosition;
let turnCounter = 0;
let timerCounter = timerCounterInt;
let noOfTilesMatch = 0;

const correctNoOfTilesMatch = {
  "3x3": 9,
  "4x4": 16,
};

// variables for renderBoard()
let gameType = "3x3";
let row = 3;
let col = 3;
let imageFolder = "";
let imageName = "";
let imagePath = "";

// elements
const gameScreen = document.querySelector(".game");
const gameOverScreen = document.querySelector(".game-over-screen");
const youWinScreen = document.querySelector(".you-win");
const whiteBoxYouWin = document.querySelector(".white-box-you-win");
const finishedImageContainer = document.querySelector(
  ".finished-image-container"
);
const gameOver = document.querySelector(".game-over");
const tryAgainButton = document.querySelector(".try-again");
const turns = document.querySelector(".turns");
const timer = document.querySelector(".timer");
const game3x3 = document.querySelector(".game-3x3");
const level1 = document.querySelector(".level-1");

let finishedImage;

const finishedImageObj = {
  "3x3": {
    0: "alien.jpg",
    1: "buzz-lightyear.jpg",
    2: "mr-potato-head.jpg",
  },
  "4x4": {
    0: "jessie.jpg",
    1: "woody-bullseye.jpg",
    2: "woody-lasso.jpg",
  },
};

// define globally so can set to display: none since no 5x5 game
let nextLevelButton;

// randomly generate the imgOrder
// generate 9 num (from 1 to 9) that must be different for 3x3 game
// generate 16 num (from 1 to 16) that must be different for 3x3 game
let imgOrder = [];
const imgOrderLengthObj = {
  "3x3": 9,
  "4x4": 16,
};

const generateImageOrder = (gameType) => {
  let num;
  while (imgOrder.length < imgOrderLengthObj[gameType]) {
    num = Math.ceil(Math.random() * imgOrderLengthObj[gameType]);
    if (!imgOrder.includes(num)) {
      imgOrder.push(num);
    }
  }
};

// let computer choose random imageFolder
const randomImage = Math.floor(Math.random() * 3);

const getImagePath = (gameType) => {
  if (gameType === "3x3") {
    switch (randomImage) {
      case 0:
        imageFolder = "alien-3x3";
        break;
      case 1:
        imageFolder = "buzz-lightyear-3x3";
        break;
      case 2:
        imageFolder = "mr-potato-3x3";
        break;
    }
  } else if (gameType === "4x4") {
    switch (randomImage) {
      case 0:
        imageFolder = "jessie-4x4";
        break;
      case 1:
        imageFolder = "woody-bullseye-4x4";
        break;
      case 2:
        imageFolder = "woody-lasso-4x4";
        break;
    }
  }

  imagePath = `./assets/${gameType}/${imageFolder}/`;
};

blankTileId = blankTileIdObj[gameType][randomImage];

const renderBoard = (gameType) => {
  getImagePath(gameType);

  // drag functions
  const drag = (e) => {};
  const dragEnd = (e) => {};
  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragLeave = (e) => {};
  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragStart = (e) => {
    console.log("dragStart");
    userTile = e.target;
  };

  const drop = (e) => {
    console.log("drop");
    otherTile = e.target;

    const userTileParent = userTile.parentNode;
    const otherTileParent = otherTile.parentNode;

    if (
      otherTile.id === blankTileId &&
      (isAdjacentLeft(userTileParent.id, otherTileParent.id) ||
        isAdjacentRight(userTileParent.id, otherTileParent.id) ||
        isAdjacentTop(userTileParent.id, otherTileParent.id) ||
        isAdjacentBottom(userTileParent.id, otherTileParent.id))
    ) {
      userTileParent.replaceChild(otherTile, userTile);
      otherTileParent.appendChild(userTile);
      turnCounter += 1;
      turns.innerHTML = `Turns: ${turnCounter}`;
      youWin();
      noOfTilesMatch = 0;
    }
  };

  // create images
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const tileDiv = document.createElement("div");
      tileDiv.id = `div-${i}-${j}`;
      console.log(tileDiv.id);

      const tile = document.createElement("img");
      const imgName = imgOrder.shift();
      tile.src = imagePath + imgName + ".jpg";
      tile.id = `${imageNameObj[gameType][imgName]}`;
      tile.style.width = "100%";
      tile.style.border = "1px solid #53a6cc";
      tile.style.display = "block";

      game3x3.appendChild(tileDiv);
      tileDiv.appendChild(tile);

      // drag functionality
      tile.addEventListener("drag", drag);
      tile.addEventListener("dragend", dragEnd);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("drop", drop);
    }
  }
};

const getDivTilePosition = (tile, divId) => {
  const position = divId.split("-");

  if (tile === "user") {
    userXPosition = parseInt(position[1]);
    userYPosition = parseInt(position[2]);
  } else if (tile === "other") {
    otherXPosition = parseInt(position[1]);
    otherYPosition = parseInt(position[2]);
  }
};

const isAdjacentLeft = (divUserTileId, divOtherTileId) => {
  getDivTilePosition("user", divUserTileId);
  getDivTilePosition("other", divOtherTileId);

  if (userXPosition === otherXPosition && userYPosition === otherYPosition - 1)
    return true;
};

const isAdjacentRight = (divUserTileId, divOtherTileId) => {
  getDivTilePosition("user", divUserTileId);
  getDivTilePosition("other", divOtherTileId);

  if (userXPosition === otherXPosition && userYPosition === otherYPosition + 1)
    return true;
};

const isAdjacentTop = (divUserTileId, divOtherTileId) => {
  getDivTilePosition("user", divUserTileId);
  getDivTilePosition("other", divOtherTileId);

  if (userXPosition === otherXPosition - 1 && userYPosition === otherYPosition)
    return true;
};

const isAdjacentBottom = (divUserTileId, divOtherTileId) => {
  getDivTilePosition("user", divUserTileId);
  getDivTilePosition("other", divOtherTileId);

  if (userXPosition === otherXPosition + 1 && userYPosition === otherYPosition)
    return true;
};

const countdownLogic = () => {
  timerCounter--;
  timer.innerHTML = `Timer: ${timerCounter} s`;

  // game has ended
  if (timerCounter === 0) {
    clearInterval(countdown);
    youWin();
    if (noOfTilesMatch !== correctNoOfTilesMatch[gameType]) {
      // hide game screen and display game over screen
      gameScreen.style.display = "none";
      gameOverScreen.style.display = "block";

      // click to try again
      tryAgainButton.addEventListener("click", tryAgain);
    }
  }
};

let countdown = setInterval(countdownLogic, 1000);

const youWin = () => {
  for (const divTile of game3x3.children) {
    if (divTile.id.slice(4) === divTile.firstChild.id) {
      noOfTilesMatch++;
    }
  }

  // checks if user wins
  if (noOfTilesMatch === correctNoOfTilesMatch[gameType] && timerCounter >= 0) {
    clearInterval(countdown);

    // hide game screen and display you win screen
    gameScreen.style.display = "none";
    youWinScreen.style.display = "block";

    if (!finishedImage) {
      // create main menu anchor tag
      const mainMenu = document.createElement("a");
      mainMenu.href = "index.html";

      // create the main menu button
      const mainMenuButton = document.createElement("button");
      mainMenuButton.innerText = "<<< MAIN MENU";
      mainMenuButton.style.color = "#53a6cc";
      mainMenuButton.style.marginTop = "19.8%";
      mainMenuButton.style.marginLeft = "1%";
      mainMenuButton.classList.add("luckiest-guy-regular");
      mainMenu.appendChild(mainMenuButton);
      finishedImageContainer.appendChild(mainMenu);

      // get the imageName
      imageName = finishedImageObj[gameType][randomImage];
      // create and display the finished image
      finishedImage = document.createElement("img");
      finishedImage.src = `assets/finished-image/${imageName}`;
      finishedImage.style.width = "250px";
      finishedImage.style.border = "5px solid #53a6cc";
      finishedImage.style.margin = "auto";
      finishedImage.style.marginTop = "40px";
      finishedImageContainer.appendChild(finishedImage);

      // create next level button
      nextLevelButton = document.createElement("button");
      nextLevelButton.innerText = "NEXT LEVEL >>>";
      nextLevelButton.style.color = "#53a6cc";
      nextLevelButton.style.marginTop = "-3%";
      nextLevelButton.style.marginLeft = "50%";
      nextLevelButton.style.display = "block";
      nextLevelButton.classList.add("luckiest-guy-regular");
      whiteBoxYouWin.appendChild(nextLevelButton);
      nextLevelButton.addEventListener("click", nextLevel);
    }
  }
};

// lets user play the same image again with tiles reshuffled
const tryAgain = () => {
  removeAllChildNodes(game3x3); // remove the previous game div and img tiles
  generateImageOrder(gameType);
  renderBoard(gameType);
  gameOverScreen.style.display = "none";
  gameScreen.style.display = "block";
  resetGame();
};

const resetGame = () => {
  turnCounter = 0;
  timerCounter = timerCounterInt;
  noOfTilesMatch = 0;
  imgOrder = [];

  turns.innerHTML = `Turns: ${turnCounter}`;
  timer.innerHTML = `Timer: ${timerCounter} s`;
  clearInterval(countdown);
  countdown = setInterval(countdownLogic, 1000);
};

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const nextLevel = () => {
  console.log("next level clicked");
  level1.src = "./assets/toy-story-header/LEVEL-2.png";
  removeAllChildNodes(game3x3); // remove the previous game div and img tiles
  gameType = "4x4";
  generateImageOrder(gameType);
  row++;
  col++;

  renderBoard(gameType);
  youWinScreen.style.display = "none";
  gameScreen.style.display = "block";
  game3x3.style.gridTemplateColumns = "repeat(4, 1fr)";
  resetGame();
  blankTileId = blankTileIdObj[gameType][randomImage];

  // prepare for you-win screen
  imageName = finishedImageObj[gameType][randomImage];
  finishedImage.src = `assets/finished-image/${imageName}`;
  nextLevelButton.style.display = "none";
};

// call the functions to start playing the game
generateImageOrder(gameType);
renderBoard("3x3");
