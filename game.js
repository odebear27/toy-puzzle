// object of key value pairs where key is the image file name and value is the img id
// 3.jpg is the blank tile
const imageNameObj = {
  1: "0-0",
  2: "0-1",
  3: "0-2",
  4: "1-0",
  5: "1-1",
  6: "1-2",
  7: "2-0",
  8: "2-1",
  9: "2-2",
};

// variables for game
const blankTileId = imageNameObj[3];
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
const correctNoOfTilesMatch = 9; // for 3x3game

// variables for renderBoard()
const gameType = "3x3";
const row = 3;
const col = 3;
let imageFolder = "";
let imageName = "";

// attributes
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

// randomly generate the imgOrder
// generate 9 num (from 1 to 9) that must be different
let imgOrder = [];
const imgOrderLength = 9;

const generateImageOrder = () => {
  let num;
  while (imgOrder.length < imgOrderLength) {
    num = Math.ceil(Math.random() * 9);
    if (!imgOrder.includes(num)) {
      imgOrder.push(num);
    }
  }
};

// let computer choose random 3x3 imageFolder
const randomImage = Math.floor(Math.random() * 3);

const renderBoard = () => {
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

  const imagePath = `./assets/${gameType}/${imageFolder}/`;

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

      const tile = document.createElement("img");
      const imgName = imgOrder.shift();
      tile.src = imagePath + imgName + ".jpg";
      tile.id = `${imageNameObj[imgName]}`;
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
    if (noOfTilesMatch !== correctNoOfTilesMatch) {
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
  if (noOfTilesMatch === correctNoOfTilesMatch && timerCounter >= 0) {
    clearInterval(countdown);

    // hide game screen and display you win screen
    gameScreen.style.display = "none";
    youWinScreen.style.display = "block";

    // create main menu button
    const mainMenu = document.createElement("a");
    mainMenu.href = "index.html";

    const mainMenuButton = document.createElement("button");
    mainMenuButton.innerText = "<<< MAIN MENU";
    mainMenuButton.style.color = "#53a6cc";
    mainMenuButton.style.marginTop = "19.8%";
    mainMenuButton.style.marginLeft = "1%";
    mainMenuButton.classList.add("luckiest-guy-regular");
    mainMenu.appendChild(mainMenuButton);
    finishedImageContainer.appendChild(mainMenu);

    // create and display the finished image
    switch (randomImage) {
      case 0:
        imageName = "alien.jpg";
        break;
      case 1:
        imageName = "buzz-lightyear.jpg";
        break;
      case 2:
        imageName = "mr-potato-head.jpg";
        break;
    }

    const finishedImage = document.createElement("img");
    finishedImage.src = `assets/finished-image/${imageName}`;
    finishedImage.style.width = "250px";
    finishedImage.style.border = "5px solid #53a6cc";
    finishedImage.style.margin = "auto";
    finishedImage.style.marginTop = "40px";

    finishedImageContainer.appendChild(finishedImage);

    // create next level button for future use
    const nextLevel = document.createElement("a");
    nextLevel.href = "";

    const nextLevelButton = document.createElement("button");
    nextLevelButton.innerText = "NEXT LEVEL >>>";
    nextLevelButton.style.color = "#53a6cc";
    nextLevelButton.style.marginTop = "-3%";
    nextLevelButton.style.marginLeft = "50%";

    // set display to none first since no next level game ready
    nextLevelButton.style.display = "none";
    nextLevelButton.classList.add("luckiest-guy-regular");
    nextLevel.appendChild(nextLevelButton);
    whiteBoxYouWin.appendChild(nextLevel);
  }
};

// lets user play the same image again with tiles reshuffled
const tryAgain = () => {
  removeAllChildNodes(game3x3); // remove the previous game div and img tiles
  generateImageOrder();
  renderBoard();
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

generateImageOrder();
renderBoard();
