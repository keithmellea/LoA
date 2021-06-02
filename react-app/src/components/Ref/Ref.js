import * as PIXI from "pixi/pixi.min.js";
import Cat from "../../../images/cat.png";

let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite;

const MyComponent = () => {

let pixi_cnt = null;

let app = Application({
      width: 600,
      height: 600,
      transparent: false
    });
      
  updatePixiCnt = (element) => {
    // the element is the DOM object that we will use as container to add pixi stage(canvas)
    pixi_cnt = element;
    //now we are adding the application to the DOM element which we got from the Ref.
    if (pixi_cnt && pixi_cnt.children.length <= 0) {
      pixi_cnt.appendChild(app.view);
      //The setup function is a custom function that we created to add the sprites. We will this below
      setup();
    }
  };

  setup = () => {
   loader
    .add("cat", Cat)
    .load(this.initialize);
  };

  initialize = () => {
    let Stage = app.stage;
    //We will create a sprite and then add it to stage and (0,0) position
    let avatar = new Sprite(resources["cat"].texture);
    Stage.addChild(avatar);
  };

    return (
    <div ref={updatePixiCnt} />
    )
}

export default Ref;
