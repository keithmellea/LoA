import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { chatPost, chatForChannel } from "../../store/chats"
import './index.css';
import * as PIXI from "pixi.js";
//import app from '../Ref/Ref'
let socket;

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [channel, setChannel] = useState()
    const [show, setShow] = useState(false)
    const [messagePosted, setMessagePosted] = useState(false)
    // const [content, setContent] = useState('')
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    let chats = useSelector(state => state.chats)

//  function createRenderer(color, canvas) {
//    canvas = canvas || document.createElement("canvas");
//    var renderer = new PIXI.WebGLRenderer(800, 600, { view: canvas });
//    var stage = new PIXI.Container();
//    var graphics = new PIXI.Graphics();
//    graphics.beginFill(color, 0.5);
//    graphics.drawCircle(0, 0, 200);
//    graphics.endFill();
//    stage.addChild(graphics);
//    renderer.render(stage);
//    return { renderer: renderer, stage: stage, graphics: graphics };
//  }

    useEffect(() => {

        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
// var canvas = document.createElement("canvas");
// document.body.appendChild(canvas);
// var scene = createRenderer(0x00ff00, canvas);
// // Uncomment to see that the original canvas isn't removed.
// scene.renderer.currentRenderer.gl
//   .getExtension("WEBGL_lose_context")
//   .loseContext();
// console.log(scene);
// scene.renderer.destroy();
// scene.stage.removeChild(scene.graphics);
// document.body.removeChild(canvas);
        return (() => {
            socket.disconnect()
        })

    }, [chats])

    const updateChatInput = (e) => {
      setChatInput(e.target.value); // maintain the reference to this Application even as your SPA view gets destroyed
      
    };

    const updateChannel = (e) => {
        setChannel(e.target.value)
    }

    const sendChat = async (e) => {
      e.preventDefault();
      // socket.emit("chat_to_channel", {
      //     channel_id: channel.id,
      //     body: content
      // })
      socket.emit("chat", { user: user.username, msg: chatInput });
      setChatInput("");
      // setMessagePosted(true);
      // var canvas = document.createElement("canvas");
      // document.body.appendChild(canvas);
      // var scene = createRenderer(0x00ff00, canvas);
      // // Uncomment to see that the original canvas isn't removed.
      // scene.renderer.currentRenderer.gl
      //   .getExtension("WEBGL_lose_context")
      //   .loseContext();
      // console.log(scene);
      // scene.renderer.destroy();
      // scene.stage.removeChild(scene.graphics);
      // document.body.removeChild(canvas);
      await dispatch(chatPost(1, chatInput));
      // const app = new PIXI.Application();

      // // Insert in the DOM or whatever the equivalent is in Angular
      // document.querySelector("#pixi-container").appendChild(app.view);
       
    }

    const place = () => {
        if (chats)
            return show ? chats.map((msg) => {

                return (
                    <div id="previousMessages" key={msg.id}>
                        <div id="Chat_user">{user.username}</div>
                        <div id="Chat_message">{msg.content}</div>
                    </div>
                );

            }) : <div></div>
    }


    const messagesForChannel = async () => {
        await dispatch(chatForChannel(1))
        setShow(true)
    }

    return (
      user && (
        <div id="top_level">
          <div id="channelTest">
            <input
              className="select-channel"
              placeholder="Select Channel"
              value={channel}
              onChange={updateChannel}
            />
            <button className="select-channel" onClick={messagesForChannel}>
              {" "}
              Channel {1}
            </button>
          </div>
          <div>
            {place()}
            {messages.map((message, ind) => (
              <div id="messageComponent">
                {/* <div id="RecentMessage">Most Recent Message From you</div> */}
                <div id="Chat_user" key={ind}>{`${message.user}`}</div>
                <div id="another">
                  <div id="Chat_message" key={ind}>{` ${message.msg} `}</div>
                </div>
              </div>
            ))}
          </div>
          <form id="top_level_chat" method="POST" onSubmit={sendChat}>
            <input
              id="bar"
              placeholder="Message"
              value={chatInput}
              onChange={updateChatInput}
            />
            {/* <button type="submit">Send</button> */}
          </form>
        </div>
      )
    );
};


export default Chat;
