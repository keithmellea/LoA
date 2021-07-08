import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Howl, Howler } from "howler";

import { getScrolls } from "../../store/scroll";

import Chat from "../Chat/Chat";

import Explorer from "../Ref/images/explorer.png";
import Textbox from "../Ref/images/textbox.png";
import Background from "../Ref/images/background.png";
import Backshelves from "../Ref/images/backshelves.png";
import Frontshelves from "../Ref/images/frontshelves.png";
import LightBeams from "../Ref/images/lightbeams.png";
import Pillars from "../Ref/images/pillars.png";
import Librarian from "../Ref/images/librarian.png";
import Scribe from "../Ref/images/scribe.png";
import Armor from "../Ref/images/armor.png";
import Urns from "../Ref/images/urns.png";
import Screen from "../Ref/images/screen.png";
import Darker from "../Ref/images/darker.png";
import Transparent from "../Ref/images/transparent.png";

import AddScrollForm from "../addScrollForm/addScrollForm"
import ScrollList from "../ScrollList/ScrollList";
import DeleteList from "../DeleteList/DeleteList";
import TitleList from "../TitleList/TitleList";

import * as PIXI from "pixi.js";

const MyComponent = () => {

  const dispatch = useDispatch();

  const scrolls = useSelector((state) => Object.values(state.scroll.scrolls));

  let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = new PIXI.Loader(),
    resources = PIXI.Loader.resources,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;
    
let app = new PIXI.Renderer({
  width: 480,
  height: 270,
  antialiasing: true,
  transparent: false,
  resolution: 3,
});

document.body.appendChild(app.view);
let stage = new PIXI.Container();


function removeCanvas() {
  
  let canvases = document.querySelectorAll("canvas");
  let canvasOne = canvases[0];
  let canvasTwo = canvases[1];
  canvasOne.remove();  
  canvasTwo.remove();
  console.log(canvasTwo);
}

  useEffect(() => {
    dispatch(getScrolls())
    removeCanvas(); 
  }, [dispatch])
  

  let pixi_cnt = null;

console.log("hello");

  console.log(document.querySelectorAll("canvas"));


  const updatePixiCnt = (element) => {
    // the element is the DOM object that we will use as container to add pixi stage(canvas)
    pixi_cnt = element;
  let scene = new Container();
    //now we are adding the application to the DOM element which we got from the Ref.
    if (pixi_cnt && pixi_cnt.children.length <= 0) {
      pixi_cnt.appendChild(app.view);
      //The setup function is a custom function that we created to add the sprites. We will this below
      pixiLoader();
    }
  };

  const pixiLoader = () => {
    loader.add("explorer", Explorer)
    loader.add("textbox", Textbox)
    loader.add("background", Background)
    loader.add("backshelves", Backshelves)
    loader.add("frontshelves", Frontshelves)
    loader.add("lightbeams", LightBeams);
    loader.add("pillars", Pillars);
    loader.add("librarian", Librarian);
    loader.add("scribe", Scribe);
    loader.add("transparent", Transparent);
    loader.add("armor", Armor);
    loader.add("urns", Urns);
    loader.add("screen", Screen);
    loader.add("darker", Darker)
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
  stage.addChild(gameScene);

  //#Scroll Menu
  let scrollMenu = new Container();
  scrollMenu.x = 500;
  scrollMenu.y = 500;
  stage.addChild(scrollMenu);

  //#Background
  let background = Sprite.from("background");

  let backshelves = Sprite.from("backshelves");

  let frontshelves = Sprite.from("frontshelves");

  let lightBeams = Sprite.from("lightbeams");
  lightBeams.blendMode = PIXI.BLEND_MODES.SOFT_LIGHT;   
  let pillars = Sprite.from("pillars");

  let librarian = Sprite.from("librarian");
  librarian.position.set(100, 170);
  librarian.interactive = true;
  librarian.buttonMode = true;
  librarian.on("pointerdown", onClickMsg);

  let scribe = Sprite.from("scribe");
  // scribe.interactive = true;
  // scribe.buttonMode = true;
  // scribe.on("pointerdown", onClickTable);
  
  let scribeClickArea = Sprite.from("transparent");
  scribeClickArea.position.set(200, 90);
  scribeClickArea.interactive = true;
  scribeClickArea.buttonMode = true;
  scribeClickArea.on("pointerdown", onClickTable);
  

  let armor = Sprite.from("armor");
  let urns = Sprite.from("urns");
  let screen = Sprite.from("screen");    
  screen.blendMode = PIXI.BLEND_MODES.ADD;
  let darker = Sprite.from("darker");
  darker.blendMode = PIXI.BLEND_MODES.ADD;    
  darker.blendMode = PIXI.BLEND_MODES.SUBTRACT = 2;   
  darker.alpha = 0.6;
  screen.alpha = 0.2;


  //#Explorer
  explorer = Sprite.from("explorer");
  explorer.x = 68;
  explorer.y = 200;
  explorer.vx = 0;
  explorer.vy = 0;
  explorer.interactive = true;
  explorer.buttonMode = true;

  //#Textbox
  let textbox = Sprite.from("textbox");
  textbox.scale.x *= 1;
  textbox.scale.y *= 1.5;
  textbox.interactive = true;
  textbox.buttonMode = true;
  textbox.position.set(30, 50);
  textbox.on("pointerdown", onClickMsg);   

  let deskTextbox = Sprite.from("textbox");
  deskTextbox.position.set(200, 100);
  deskTextbox.scale.x *= 0.17;
  deskTextbox.scale.y *= 0.7;

  let style1 = new TextStyle({
    fontFamily: "Futura",
    fontSize: 10,
    fill: "white",
    align: "center",
    whiteSpace: "normal",
    wordWrap: true,
    wordWrapWidth: 1220,
  });

    for (let i = 0; i < scrolls.length; i++) {
      let scroll = scrolls[i];
      let scrollName = new Text(scroll.title, style1);
      scrollName.x = 240
      scrollName.y = 120;
      scrollName.y *= i + 0.15;
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
  }
}
        
      });
      titleContainer.addChild(scrollName);

        let message = new Text(scroll.body, style1);
        message.x = window.innerWidth / 6.3;
        message.y = window.innerHeight / 4;
        message.visible = false;
        bodyContainer.addChild(message);

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
  let chatText = new Text("Log", style1);
  chatText.x = 220;
  chatText.y = 110;
  chatText.interactive = true;
  chatText.buttonMode = true;
chatText.on("pointerdown", () => {
  deskTextbox.visible = false;
  textbox.visible = true;
  writeText.visible = false;
  editText.visible = false;
  deleteText.visible = false;
  chatText.visible = false;
  chat.style.display = "inline-block";

});
  let writeInput = document.getElementById("add_scroll");
  let ScrollList = document.getElementById("scrolls");
  let DeleteList = document.getElementById("delete-scrolls");

    writeInput.style.display = "none";
  let writeText = new Text("Write", style1);
  writeText.x = 220;
  writeText.y = 130;
  writeText.interactive = true;
  writeText.buttonMode = true;
  writeText.on("pointerdown", () => {
  deskTextbox.visible = false;
  textbox.visible = true;
  writeText.visible = false;
  editText.visible = false;
  deleteText.visible = false;
  chatText.visible = false;

  writeInput.style.display = "flex"; 
  })

  let editText = new Text("Edit", style1);
  editText.x = 220;
  editText.y = 150;
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
    editForm.forEach((item) => {   
        item.style.display = "none";
    });
    
  })

  let deleteTitle = document.getElementById("title-delete");
  let deleteText = new Text("Destroy", style1);
  deleteText.x = 220;
  deleteText.y = 170;
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
    deleteTitle.style.display = "flex";  
  })

  // --- RENDER ORDER ---
  titleList.visible = false;
  textbox.visible = false;
  deskTextbox.visible = false;
  writeText.visible = false;
  editText.visible = false;
  deleteText.visible = false;
  chatText.visible = false;
  gameScene.addChild(background);
  gameScene.addChild(backshelves);
  gameScene.addChild(frontshelves);
  gameScene.addChild(scribe);
  gameScene.addChild(scribeClickArea);
  gameScene.addChild(librarian);
  gameScene.addChild(urns);
  gameScene.addChild(explorer);
  gameScene.addChild(armor);
  gameScene.addChild(darker);
  gameScene.addChild(screen);
  gameScene.addChild(lightBeams);
  gameScene.addChild(pillars);
  gameScene.addChild(textbox);
  gameScene.addChild(deskTextbox);
  gameScene.addChild(bodyContainer);
  gameScene.addChild(titleList);
  gameScene.addChild(writeText);
  gameScene.addChild(editText);
  gameScene.addChild(deleteText);
  gameScene.addChild(chatText);

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
    explorer.vx = -2;
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
    explorer.vy = -2;
    explorer.vx = 0;
  };
  up.release = function () {
    if (!down.isDown && explorer.vx === 0) {
      explorer.vy = 0;
    }
  };

  //Right
  right.press = function () {
    explorer.vx = 2;
    explorer.vy = 0;
  };
  right.release = function () {
    if (!left.isDown && explorer.vy === 0) {
      explorer.vx = 0;
    }
  };

  //Down
  down.press = function () {
    explorer.vy = 2;
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
    } else 
    // if (explorer.position.x > 20 && explorer.position.y < 90) 
    {
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
      titleList.visible = true;
      textbox.visible = true;
    }
  }

  //#onClickMsg
  function onClickMsg() {
    if (textbox.visible) {
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
      deleteTitle.style.display = "none";

      const scrollLi = document.getElementById(`read-scrolls`);
      scrollLi.style.display = "none";

      const titleRead = document.getElementById(`title-read`);
      titleRead.style.display = "none";

      const scrollBody = document.querySelectorAll(`.scroll-bodies`);
      scrollBody.forEach((element) => {
        element.style.display = "none";
      });

      const scrollTitle = document.querySelectorAll(`.scroll-titles`);
      scrollTitle.forEach((element) => {
        element.style.display = "none";
      });

      const scrollAuthor = document.querySelectorAll(`.scroll-authors`);
      scrollAuthor.forEach((element) => {
        element.style.display = "none";
      });
    } else if (
      explorer.position.x > 75 &&
      explorer.position.y < 190 &&
      explorer.position.x < 130 &&
      explorer.position.y > 70
    ) {
      const scrollList = document.getElementById(`read-scrolls`);
      scrollList.style.display = "flex";

      const titleRead = document.getElementById(`title-read`);
      titleRead.style.display = "flex";

      const scrollLi = document.querySelectorAll(`.read-scroll`);

      scrollLi.forEach((element) => {
        element.style.display = "list-item";
      });

      titleList.visible = true;
      textbox.visible = true;
      bodyContainer.visible = false;
      console.log(explorer.position.x);
      console.log(explorer.position.y);
    }
    else {

      console.log(explorer.position.x);
      console.log(explorer.position.y);
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
    deleteTitle.style.display = "none";
      // editInput.visible = false;
    } else if (
      explorer.position.x > 160 &&
      explorer.position.y < 141 &&
      explorer.position.x < 301 &&
      explorer.position.y > 71
    ) {
      deskTextbox.visible = true;
      editText.visible = true;
      deleteText.visible = true;
      chatText.visible = true;
      writeText.visible = true;
    }
  }

  

  //Set the game state
  state = play;

  // //Start the game loop
  // app.ticker.add((delta) => gameLoop(delta));

var ticker = new PIXI.Ticker();
ticker.add((delta) => {
  app.render(stage);
  gameLoop(delta);
}, PIXI.UPDATE_PRIORITY.LOW);
ticker.start();

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
  contain(explorer, { x: 28, y: 70, width: 450, height: 270 });
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

  //Left Bookshelf Collisions
  if (sprite.y < 170 && sprite.y > 100 && sprite.x < 150) {
    if (sprite.y < 110 && sprite.y > 100 && sprite.x < 150) {
      sprite.x = sprite.x;
      sprite.y = 100;
      console.log("top");
    } else if (sprite.y < 165 && sprite.y > 100 && sprite.x < 150) {
      sprite.x = 150;
      sprite.y = sprite.y;
      console.log("side");
    } else {
      sprite.y = 170;
      sprite.x = sprite.x;
      collision = "bookshelf";
      console.log(sprite.position);
    }
  }

  //Right Bookshelf Collisions
  if (sprite.y < 170 && sprite.y > 100 && sprite.x > 305) {
    if (sprite.y < 110 && sprite.y > 100 && sprite.x > 305) {
      sprite.x = sprite.x;
      sprite.y = 100;
      console.log("top");
    } else if (sprite.y < 165 && sprite.y > 100 && sprite.x > 305) {
      sprite.x = 305;
      sprite.y = sprite.y;
      console.log("side");
    } else {
      sprite.y = 170;
      sprite.x = sprite.x;
      collision = "bookshelf";
      console.log(sprite.position);
    }
  }
  //Return the `collision` value
  return collision;
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
      <TitleList />
      <div ref={updatePixiCnt} />
      
    </div>
  );
};

export default MyComponent;
