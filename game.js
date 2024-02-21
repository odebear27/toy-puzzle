const blankTile = "3.jpg";
let userTile;
let otherTile;
let xPosition;
let yPosition;

const game3x3 = document.querySelector(".game-3x3");

const gameType = "3x3";
const row = 3;
const col = 3;
let imageFolder = "";

const imgOrder = ["4", "1", "3", "2", "5", "6", "7", "8", "9"];

const renderBoard = () => {
  // let computer choose random 3x3 imageFolder
  const randomImage = Math.floor(Math.random() * 3);

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
  const dragLeave = (e) => {
    if (otherTile !== blankTile) return;
  };
  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragStart = (e) => {
    console.log("dragStart");
    userTile = e.target;
    console.log(userTile);
  };
  const drop = (e) => {
    console.log("drop");
    otherTile = e.target;
    console.log(otherTile);
    console.log(userTile.parentNode);
    const userTileParent = userTile.parentNode;
    const otherTileParent = otherTile.parentNode;
    userTileParent.replaceChild(otherTile, userTile);
    otherTileParent.appendChild(userTile);
  };

  // const getTilePosition = (id) => {
  //   const position = id.split("-");
  //   xPosition = position[0];
  //   yPosition = position[1];
  // };

  // create images
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const tileDiv = document.createElement("div");
      tileDiv.id = `div-${i}-${j}`;

      const tile = document.createElement("img");
      tile.src = imagePath + imgOrder.shift() + ".jpg";
      tile.id = `${i}-${j}`;
      tile.style.width = "80px";
      tile.style.border = "1px solid #53a6cc";
      tile.style.display = "block";

      game3x3.appendChild(tileDiv);
      tileDiv.appendChild(tile);
      console.log(tile.id);

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

renderBoard();
