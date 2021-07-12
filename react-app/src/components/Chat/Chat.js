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
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    let chats = useSelector(state => state.chats)

    useEffect(() => {

        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
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
      await dispatch(chatPost(chatInput));
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
          </form>
        </div>
      )
    );
};


export default Chat;
