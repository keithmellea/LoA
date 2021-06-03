import React, { Component } from "react";
import Cat from "../Ref/images/cat.png"
//import treasureHunter from "../Ref/images/treasureHunter.json"
import Door from "../Ref/images/door.png"
import Dungeon from "../Ref/images/dungeon.png";
import Explorer from "../Ref/images/explorer.png";
import Blob from "../Ref/images/blob.png";
import Treasure from "../Ref/images/treasure.png";
import Tiles from "../Ref/images/tiles.png";
import Bookshelf from "../Ref/images/bookshelf.png";
import Table from "../Ref/images/table.png";
import { InteractionManager } from '@pixi/interaction'

import * as PIXI from "pixi.js";
//import "../Ref/EZGUI.js";

//Renderer.registerPlugin("interaction", InteractionManager);

const MyComponent = () => {
  let pixi_cnt = null;

  // let app = new PIXI.Application({
  //   width: 600,
  //   height: 600,
  //   transparent: false,
  // });

  let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Graphics = PIXI.Graphics,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    Rectangle = PIXI.Rectangle;

  let app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialiasing: true,
    transparent: false,
    resolution: 1,
  });

  const updatePixiCnt = (element) => {
    // the element is the DOM object that we will use as container to add pixi stage(canvas)
    pixi_cnt = element;
    //now we are adding the application to the DOM element which we got from the Ref.
    if (pixi_cnt && pixi_cnt.children.length <= 0) {
      pixi_cnt.appendChild(app.view);
      //The setup function is a custom function that we created to add the sprites. We will this below
      pixiLoader();
    }
  };

  // const setup = () => {
  //   PIXI.loader.add("cat", Cat).load(initialize);
  // };

  // const initialize = () => {
  //   let Stage = app.stage;
  //   //We will create a sprite and then add it to stage and (0,0) position
  //   let avatar = new PIXI.Sprite(PIXI.loader.resources["cat"].texture);
  //   Stage.addChild(avatar);
  // };
  //Aliases

  //Create a Pixi Application


  const pixiLoader = () => {
    //loader.add("treasureHunter", treasureHunter)
    loader.add("door", Door)
    loader.add("explorer", Explorer)
    loader.add("blob", Blob)
    loader.add("treasure", Treasure)
    loader.add("dungeon", Dungeon)
    loader.add("tiles", Tiles)
    loader.add("bookshelf", Bookshelf)
    loader.add("table", Table)
    .load(setup);
  };

  //Define variables that might be used in more
  //than one function

let state,
  explorer,
  treasure,
  blobs,
  chimes,
  exit,
  player,
  dungeon,
  door,
  healthBar,
  message,
  gameScene,
  gameOverScene,
  enemies,
  id;

function setup() {
  //Make the game scene and add it to the stage
  gameScene = new Container();
  app.stage.addChild(gameScene);

  //Create the `tileset` sprite from the texture
  let tiles = TextureCache["tiles"];

  console.log(window.innerWidth);
  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  let rectangle = new Rectangle(2, 0, 46, 48);

  //Tell the texture to use that rectangular section
  tiles.frame = rectangle;

  //Create the sprite from the texture
  let tile = new Sprite(tiles);

  //Position the rocket sprite on the canvas
  tile.x = 32;
  tile.y = 32;

  gameScene.addChild(tile);

  let x = 32;
  let y = 32;

  //Nested loop to tile the ground
  for (let j = 0; j < 20; j++) {
    for (let i = 0; i < 40; i++) {
      let tile = new Sprite(tiles);
      tile.x = x;
      tile.y = y;

      gameScene.addChild(tile);
      x += 46;
    }
    x = 32;
    y += 48;
  }

  //Dungeon
  // dungeon = new Sprite(resources["dungeon"].texture);
  // gameScene.addChild(dungeon);

  //#Bookshelf
  let bookshelf = new Sprite(resources["bookshelf"].texture);
  let bookshelfX = 167;
  let bookshelfY = 32;
  bookshelf.position.set(bookshelfX, bookshelfY);
  gameScene.addChild(bookshelf);

  //Populates Bookshelves along X-Axis
  for (let i = 0; i < 16; i++) {
    let bookshelf = new Sprite(resources["bookshelf"].texture);
    bookshelfX += 96;
    bookshelf.position.set(bookshelfX, bookshelfY);
    gameScene.addChild(bookshelf); 
  }
  
  //Populates Bookshelves along Y-Axis
  for (let j = 0; j < 10; j++) {
    let bookshelf = new Sprite(resources["bookshelf"].texture);
    bookshelfX = 1780;
    bookshelfY += 92;
    bookshelf.position.set(bookshelfX, bookshelfY);
    gameScene.addChild(bookshelf);
  }

  //#Table
  let table = new Sprite(resources["table"].texture);
  table.position.set(468, 623);
  table.interactive = true;
  table.buttonMode = true;
  table.onTap = table.onTap.bind(table);
  table.on('pointertap', table.onTap);
  gameScene.addChild(table);

  //#Door
  door = new Sprite(resources["door"].texture);
  door.position.set(32, 0);
  gameScene.addChild(door);

  //#Explorer
  explorer = new Sprite(resources["explorer"].texture);
  explorer.x = 68;
  explorer.y = gameScene.height / 2 - explorer.height / 2;
  explorer.vx = 0;
  explorer.vy = 0;
  gameScene.addChild(explorer);

  //Treasure
  treasure = new Sprite(resources["treasure"].texture);
  treasure.x = gameScene.width - treasure.width - 48;
  treasure.y = gameScene.height / 2 - treasure.height / 2;
  gameScene.addChild(treasure);

  //Make the blobs
  let numberOfBlobs = 20,
    spacing = 100,
    xOffset = 150,
    speed = 2,
    direction = 1;

  //An array to store all the blob monsters
  blobs = [];

  // //Make as many blobs as there are `numberOfBlobs`
  // for (let i = 0; i < numberOfBlobs; i++) {
  //   //Make a blob
  //   let blob = new Sprite(resources["blob"].texture);

  //   //Space each blob horizontally according to the `spacing` value.
  //   //`xOffset` determines the point from the left of the screen
  //   //at which the first blob should be added
  //   let x = spacing * i + xOffset;

  //   //Give the blob a random y position
  //   let y = randomInt(1, app.stage.height - blob.height);

  //   //Set the blob's position
  //   blob.x = 200;
  //   blob.y = y;
  //   blob.x += 20;
  //   //Set the blob's vertical velocity. `direction` will be either `1` or
  //   //`-1`. `1` means the enemy will move down and `-1` means the blob will
  //   //move up. Multiplying `direction` by `speed` determines the blob's
  //   //vertical direction
  //   blob.vy = speed * direction;

  //   //Reverse the direction for the next blob
  //   direction *= -1;

  //   //Push the blob into the `blobs` array
  //   blobs.push(blob);

  //   //Add the blob to the `gameScene`
  //   gameScene.addChild(blob);
  // }

  //Create the health bar
  healthBar = new Container();
  healthBar.position.set(app.stage.width - 170, 4);
  gameScene.addChild(healthBar);

  //Create the black background rectangle
  let innerBar = new Graphics();
  innerBar.beginFill(0x000000);
  innerBar.drawRect(0, 0, 128, 8);
  innerBar.endFill();
  healthBar.addChild(innerBar);

  //Create the front red rectangle
  let outerBar = new Graphics();
  outerBar.beginFill(0xff3300);
  outerBar.drawRect(0, 0, 128, 8);
  outerBar.endFill();
  healthBar.addChild(outerBar);

  healthBar.outer = outerBar;

  //Create the `gameOver` scene
  gameOverScene = new Container();
  app.stage.addChild(gameOverScene);

  //Make the `gameOver` scene invisible when the game first starts
  gameOverScene.visible = false;

  //Create the text sprite and add it to the `gameOver` scene
  let style = new TextStyle({
    fontFamily: "Futura",
    fontSize: 64,
    fill: "white",
  });
  message = new Text("The End!", style);
  message.x = 120;
  message.y = app.stage.height / 2 - 32;
  gameOverScene.addChild(message);

  //Capture the keyboard arrow keys
  let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

  //Left arrow key `press` method
  left.press = function () {
    //Change the explorer's velocity when the key is pressed
    explorer.vx = -5;
    explorer.vy = 0;
  };

  //Left arrow key `release` method
  left.release = function () {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the explorer isn't moving vertically:
    //Stop the explorer
    if (!right.isDown && explorer.vy === 0) {
      explorer.vx = 0;
    }
  };

  //Up
  up.press = function () {
    explorer.vy = -5;
    explorer.vx = 0;
  };
  up.release = function () {
    if (!down.isDown && explorer.vx === 0) {
      explorer.vy = 0;
    }
  };

  //Right
  right.press = function () {
    explorer.vx = 5;
    explorer.vy = 0;
  };
  right.release = function () {
    if (!left.isDown && explorer.vy === 0) {
      explorer.vx = 0;
    }
  };

  //Down
  down.press = function () {
    explorer.vy = 5;
    explorer.vx = 0;
  };
  down.release = function () {
    if (!up.isDown && explorer.vx === 0) {
      explorer.vy = 0;
    }
  };

  //Set the game state
  state = play;

  //Start the game loop
  app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta) {
  //Update the current game state:
  state(delta);
}

function play(delta) {
  //use the explorer's velocity to make it move
  explorer.x += explorer.vx;
  explorer.y += explorer.vy;

  //Contain the explorer inside the area of the dungeon
  contain(explorer, { x: 28, y: 10, width: window.innerWidth, height: window.innerWidth });
  //contain(explorer, stage);

  //Set `explorerHit` to `false` before checking for a collision
  let explorerHit = false;

  //Loop through all the sprites in the `enemies` array
  blobs.forEach(function (blob) {
    //Move the blob
    blob.y += blob.vy;

    //Check the blob's screen boundaries
    let blobHitsWall = contain(blob, { x: 28, y: 10, width: 488, height: 480 });

    //If the blob hits the top or bottom of the stage, reverse
    //its direction
    if (blobHitsWall === "top" || blobHitsWall === "bottom") {
      blob.vy *= -1;
    }

    //Test for a collision. If any of the enemies are touching
    //the explorer, set `explorerHit` to `true`
    if (hitTestRectangle(explorer, blob)) {
      explorerHit = true;
    }
  });

  //If the explorer is hit...
  if (explorerHit) {
    //Make the explorer semi-transparent
    explorer.alpha = 0.5;

    //Reduce the width of the health bar's inner rectangle by 1 pixel
    healthBar.outer.width -= 1;
  } else {
    //Make the explorer fully opaque (non-transparent) if it hasn't been hit
    explorer.alpha = 1;
  }

  //Check for a collision between the explorer and the treasure
  if (hitTestRectangle(explorer, treasure)) {
    //If the treasure is touching the explorer, center it over the explorer
    treasure.x = explorer.x + 8;
    treasure.y = explorer.y + 8;
  }

  //Does the explorer have enough health? If the width of the `innerBar`
  //is less than zero, end the game and display "You lost!"
  if (healthBar.outer.width < 0) {
    state = end;
    message.text = "You lost!";
  }

  //If the explorer has brought the treasure to the exit,
  //end the game and display "You won!"
  if (hitTestRectangle(treasure, door)) {
    state = end;
    message.text = "You won!";
  }
}

function end() {
  gameScene.visible = false;
  gameOverScene.visible = true;
}

/* Helper functions */

function contain(sprite, container) {
  let collision = undefined;

  //Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }

  //Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }

  //Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = "right";
  }

  //Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = "bottom";
  }

  //Return the `collision` value
  return collision;
}

//The `hitTestRectangle` function
function hitTestRectangle(r1, r2) {
  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {
    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {
      //There's definitely a collision happening
      hit = true;
    } else {
      //There's no collision on the y axis
      hit = false;
    }
  } else {
    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
}

//The `randomInt` helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//The `keyboard` helper function
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener("keydown", key.downHandler.bind(key), false);
  window.addEventListener("keyup", key.upHandler.bind(key), false);
  return key;
}
  return (
      <div ref={updatePixiCnt} />
  );
};

export default MyComponent;
