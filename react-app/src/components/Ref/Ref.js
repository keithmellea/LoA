import React, { Component } from "react";
import Cat from "../Ref/images/cat.png"
import * as PIXI from "pixi.js";


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
    TextStyle = PIXI.TextStyle;

  let app = new Application({
    width: 256,
    height: 256,
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
    loader.add("cat", Cat)
    .load(setup);
  };
  //Define variables that might be used in more
  //than one function

  let cat, state;

  function setup() {
    //Create the `cat` sprite
    cat = new PIXI.Sprite(PIXI.loader.resources["cat"].texture);
    cat.y = 96;
    cat.vx = 0;
    cat.vy = 0;
    app.stage.addChild(cat);

    //Capture the keyboard arrow keys
    let left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

    //Left arrow key `press` method
    left.press = () => {
      //Change the cat's velocity when the key is pressed
      cat.vx = -5;
      cat.vy = 0;
    };

    //Left arrow key `release` method
    left.release = () => {
      //If the left arrow has been released, and the right arrow isn't down,
      //and the cat isn't moving vertically:
      //Stop the cat
      if (!right.isDown && cat.vy === 0) {
        cat.vx = 0;
      }
    };

    //Up
    up.press = () => {
      cat.vy = -5;
      cat.vx = 0;
    };
    up.release = () => {
      if (!down.isDown && cat.vx === 0) {
        cat.vy = 0;
      }
    };

    //Right
    right.press = () => {
      cat.vx = 5;
      cat.vy = 0;
    };
    right.release = () => {
      if (!left.isDown && cat.vy === 0) {
        cat.vx = 0;
      }
    };

    //Down
    down.press = () => {
      cat.vy = 5;
      cat.vx = 0;
    };
    down.release = () => {
      if (!up.isDown && cat.vx === 0) {
        cat.vy = 0;
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
    //Use the cat's velocity to make it move
    cat.x += cat.vx;
    cat.y += cat.vy;
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
    key.downHandler = (event) => {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = (event) => {
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
