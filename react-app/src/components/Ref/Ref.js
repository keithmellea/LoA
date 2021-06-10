import React, { Component, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getScrolls, addScroll } from "../../store/scroll";

import Chat from "../Chat/Chat";

import Cat from "../Ref/images/cat.png"
import Door from "../Ref/images/door.png"
import Dungeon from "../Ref/images/dungeon.png";
import Explorer from "../Ref/images/explorer.png";
import Blob from "../Ref/images/blob.png";
import Treasure from "../Ref/images/treasure.png";
import Tiles from "../Ref/images/tiles.png";
import Bookshelf from "../Ref/images/bookshelf.png";
import Table from "../Ref/images/table.png";
import Textbox from "../Ref/images/textbox.png";
import Background from "../Ref/images/background.png";
import Backshelves from "../Ref/images/backshelves.png";
import Frontshelves from "../Ref/images/frontshelves.png";
import LightBeams from "../Ref/images/lightbeams.png";
import Pillars from "../Ref/images/pillars.png";

import AddScrollForm from "../addScrollForm/addScrollForm"
import EditScrollForm from "../EditScrollForm/EditScrollForm";
import ScrollList from "../ScrollList/ScrollList";
import DeleteList from "../DeleteList/DeleteList";

import * as PIXI from "pixi.js";

const MyComponent = () => {

  const dispatch = useDispatch();

  const scrolls = useSelector((state) => state.scroll.scrolls);
  const user = useSelector((state) => state.session.user.username);
  console.log("user", user);
  useEffect(() => {
    dispatch(getScrolls());
  }, [dispatch])

  let pixi_cnt = null;

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
    width: 480,
    height: 270,
    antialiasing: true,
    transparent: false,
    resolution: 3,
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

  const pixiLoader = () => {
    loader.add("door", Door)
    loader.add("explorer", Explorer)
    loader.add("blob", Blob)
    loader.add("dungeon", Dungeon)
    loader.add("tiles", Tiles)
    loader.add("bookshelf", Bookshelf)
    loader.add("table", Table)
    loader.add("textbox", Textbox)
    loader.add("background", Background)
    loader.add("backshelves", Backshelves)
    loader.add("frontshelves", Frontshelves)
    loader.add("lightbeams", LightBeams);
    loader.add("pillars", Pillars)
    .load(setup);
  };

  //Define variables that might be used in more
  //than one function

let state,
  explorer;

function setup() {
  //Make the game scene and add it to the stage
  let gameScene = new Container();
  const bodyContainer = new Container();
  const titleContainer = new Container();
  const deskContainer = new Container();
  app.stage.addChild(gameScene);

  //#Scroll Menu
  let scrollMenu = new Container();
  scrollMenu.x = 500;
  scrollMenu.y = 500;
  app.stage.addChild(scrollMenu);
  console.log(app.stage);

  //Create the `tileset` sprite from the texture
  let tiles = TextureCache["tiles"];

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

  //#Background
  let background = new Sprite(resources["background"].texture);

  let backshelves = new Sprite(resources["backshelves"].texture);

  let frontshelves = new Sprite(resources["frontshelves"].texture);
  
  let lightBeams = new Sprite(resources["lightbeams"].texture);

  let pillars = new Sprite(resources["pillars"].texture);

  //#Bookshelf
  let bookshelf = new Sprite(resources["bookshelf"].texture);
  let bookshelfX = 167;
  let bookshelfY = 32;
  bookshelf.interactive = true;
  bookshelf.buttonMode = true;
  bookshelf.position.set(bookshelfX, bookshelfY);
  bookshelf.on("pointerdown", onClickScrollX);

  //Populates Bookshelves along X-Axis
  for (let i = 0; i < 16; i++) {
    let bookshelf = new Sprite(resources["bookshelf"].texture);
    bookshelfX += 96;
    bookshelf.position.set(bookshelfX, bookshelfY);
    bookshelf.interactive = true;
    bookshelf.buttonMode = true;
    bookshelf.on("pointerdown", onClickScrollX);
    gameScene.addChild(bookshelf);
  }

  //Populates Bookshelves along Y-Axis
  for (let j = 0; j < 10; j++) {
    let bookshelf = new Sprite(resources["bookshelf"].texture);
    bookshelfX = 1780;
    bookshelfY += 92;
    bookshelf.position.set(bookshelfX, bookshelfY);
    bookshelf.interactive = true;
    bookshelf.buttonMode = true;
    bookshelf.on("pointerdown", onClickScrollY);

    gameScene.addChild(bookshelf);
  }

  //#Explorer
  explorer = new Sprite(resources["explorer"].texture);
  explorer.x = 68;
  explorer.y = 200;
  explorer.vx = 0;
  explorer.vy = 0;
  explorer.interactive = true;
  explorer.buttonMode = true;

  //#Textbox
  let textbox = new Sprite(resources["textbox"].texture);
  textbox.scale.x *= 3.5;
  textbox.scale.y *= 5;
  textbox.interactive = true;
  textbox.buttonMode = true;
  textbox.position.set(window.innerWidth / 8, window.innerHeight / 6);
  textbox.on("pointerdown", onClickMsg);   

  let deskTextbox = new Sprite(resources["textbox"].texture);
  deskTextbox.scale.x *= 0.7;
  deskTextbox.scale.y *= 2.8;
  deskTextbox.interactive = true;
  deskTextbox.buttonMode = true;
  deskTextbox.position.set(window.innerWidth / 2.47, window.innerHeight / 3.7);
  deskTextbox.on("pointerdown", onClickTable);

  let style1 = new TextStyle({
    fontFamily: "Futura",
    fontSize: 30,
    fill: "white",
    align: "center",
    whiteSpace: "normal",
    wordWrap: true,
    wordWrapWidth: 1220,
  });

    for (let i = 0; i < scrolls.length; i++) {
      let scroll = scrolls[i];
      let scrollName = new Text(scroll.title, style1);
      scrollName.x = window.innerWidth / 6.3;
      scrollName.y = i + 1 * 250;
      scrollName.y *= i + 0.5;
      scrollName.interactive = true;
      scrollName.buttonMode = true;
      scrollName.on("pointerdown", (e) => {

for (let j = 0; j < scrolls.length; j++) {
  let scroll = scrolls[j];
  let currentScroll;
  if (e.target._text === scroll.title) {
    currentScroll = scroll;
    bodyContainer.children.forEach((msg) => {
       msg.visible = false;
      if (currentScroll.body === msg._text) {
        titleContainer.visible = false;
        bodyContainer.visible = true;
        msg.visible = true;
      }
    });
  } // }
}
        
      });
      titleContainer.addChild(scrollName);

        let message = new Text(scroll.body, style1);
        message.x = window.innerWidth / 6.3;
        message.y = window.innerHeight / 4;
        message.visible = false;
        bodyContainer.addChild(message);

      console.log(bodyContainer.children);
    }

  let titleList = titleContainer;

  let message = new Text(
    titleContainer.children.text,
    // scrolls[0].body,
    style1
  );
  message.x = window.innerWidth / 6.3;
  message.y = window.innerHeight / 4;
  message.interactive = true;
  message.buttonMode = true;

  let chat = document.getElementById("top_level");
  let chatText = new Text("Chat", style1);
  chatText.x = window.innerWidth / 2.2;
  chatText.y = window.innerHeight / 3;
  chatText.interactive = true;
  chatText.buttonMode = true;
chatText.on("pointerdown", () => {
  deskTextbox.visible = false;
  textbox.visible = true;
  writeText.visible = false;
  editText.visible = false;
  deleteText.visible = false;
  chatText.visible = false;
  console.log(chat);
  chat.style.display = "inline-block";

});
  let writeInput = document.getElementById("add_scroll");
  let ScrollList = document.getElementById("scrolls");
  let DeleteList = document.getElementById("delete-scrolls");

    writeInput.style.display = "none";
  let writeText = new Text("Write", style1);
  writeText.x = window.innerWidth / 2.2;
  writeText.y = window.innerHeight / 2.4;
  writeText.interactive = true;
  writeText.buttonMode = true;
  writeText.on("pointerdown", () => {
  deskTextbox.visible = false;
  textbox.visible = true;
  writeText.visible = false;
  editText.visible = false;
  deleteText.visible = false;
  chatText.visible = false;
  // chat.style.display = "inline-block";

  writeInput.style.display = "flex"; 
  })

  let editText = new Text("Edit", style1);
  editText.x = window.innerWidth / 2.2;
  editText.y = window.innerHeight / 1.97;
  editText.interactive = true;
  editText.buttonMode = true;
  editText.on("pointerdown", () => {
    deskTextbox.visible = false;
    textbox.visible = true;
    writeText.visible = false;
    editText.visible = false;
    deleteText.visible = false;
    chatText.visible = false;
    ScrollList.style.display = "flex";                
    let listItems = document.querySelectorAll("li.scroll-items");
    listItems.forEach((item) => {
        item.style.display = "flex";
        })
    let editForm = document.querySelectorAll(".scroll-form"); 
    console.log("edit", editForm);
    editForm.forEach((item) => {   
        item.style.display = "none";
    });
    
  })

  let deleteText = new Text("Delete", style1);
  deleteText.x = window.innerWidth / 2.2;
  deleteText.y = window.innerHeight / 1.67;
  deleteText.interactive = true;
  deleteText.buttonMode = true;
  deleteText.on("pointerdown", () => {
      deskTextbox.visible = false;
    textbox.visible = true;
    writeText.visible = false;
    editText.visible = false;
    deleteText.visible = false;
    chatText.visible = false;
    DeleteList.style.display = "flex";   
  })

  //#Table
  let table = new Sprite(resources["table"].texture);
  table.position.set(468, 623);
  table.interactive = true;
  table.buttonMode = true;
  table.on("pointerdown", onClickTable);

  // --- RENDER ORDER ---
  titleList.visible = false;
  textbox.visible = false;
  deskTextbox.visible = false;
  writeText.visible = false;
  editText.visible = false;
  deleteText.visible = false;
  chatText.visible = false;
  gameScene.addChild(bookshelf);
  gameScene.addChild(table);
  gameScene.addChild(textbox);
  gameScene.addChild(deskTextbox);
  gameScene.addChild(bodyContainer);
  gameScene.addChild(titleList);
  gameScene.addChild(writeText);
  gameScene.addChild(editText);
  gameScene.addChild(deleteText);
  gameScene.addChild(chatText);
  gameScene.addChild(background);
  gameScene.addChild(backshelves);
  gameScene.addChild(frontshelves);
  gameScene.addChild(pillars);
  gameScene.addChild(explorer);
  gameScene.addChild(lightBeams);

  // gameScene.addChild(writeInput);
  // gameScene.addChild(editInput);

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

  //#onClickScrollX
  function onClickScrollX() {
    if (textbox.visible) {
      titleList.visible = false;
      message.visible = false;
      textbox.visible = false;
      bodyContainer.visible = false;
      titleContainer.visible = false;
      writeInput.style.display = "none";
      ScrollList.style.display = "none";
      // editInput.visible = false;
    } else if (explorer.position.x > 100 && explorer.position.y < 151) {
      titleList.visible = true;
      textbox.visible = true;
    }
  }

  //#onClickScrollY
  function onClickScrollY() {
    if (textbox.visible) {
      titleList.visible = false;
      textbox.visible = false;
      bodyContainer.visible = false;
      titleContainer.visible = false;
      writeInput.style.display = "none";
      ScrollList.style.display = "none";
      // editInput.visible = false;
    } else if (explorer.position.x > 1720 && explorer.position.y < 920 ) {
      console.log(explorer.position);
      titleList.visible = true;
      textbox.visible = true;
    }
  }

  //#onClickMsg
  function onClickMsg() {
    if (textbox.visible) {
      console.log(gameScene);
      message.visible = false;
      bodyContainer.visible = false;
      textbox.visible = false;
      titleList.visible = false;
      writeInput.style.display = "none";
      writeText.visible = false;
      editText.visible = false;
      deleteText.visible = false;
      chatText.visible = false;
      ScrollList.style.display = "none";
    DeleteList.style.display = "none"; 
  chat.style.display = "none";
    } else {
      titleList.visible = true;
      textbox.visible = true;
      bodyContainer.visible = false;
    }
  }

  //#onClickTable
  function onClickTable() {
    if (deskTextbox.visible) {
      titleList.visible = false;
      deskTextbox.visible = false;
      editText.visible = false;
      deleteText.visible = false;
      chatText.visible = false;
      writeText.visible = false;
      writeInput.style.display = "none";
      ScrollList.style.display = "none";
    DeleteList.style.display = "none";   
      // editInput.visible = false;
    } else if (explorer.position.x > 400 && explorer.position.y < 800 
      && explorer.position.x < 700 && explorer.position.y > 530) {
      console.log(explorer.position)
      deskTextbox.visible = true;
      editText.visible = true;
      deleteText.visible = true;
      chatText.visible = true;
      writeText.visible = true;
    }
  }

  

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
  };

  //The `upHandler`
  key.upHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
  };

  //Attach event listeners
  window.addEventListener("keydown", key.downHandler.bind(key), false);
  window.addEventListener("keyup", key.upHandler.bind(key), false);
  return key;
}

if (!scrolls) return null;

  return (
    <div>
      <AddScrollForm />
      <ScrollList />
      <DeleteList />
      <Chat />
      <div ref={updatePixiCnt} />
      
    </div>
  );
};

export default MyComponent;
