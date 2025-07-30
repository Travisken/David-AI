import React, { useState } from 'react';
import './App.css';
import gptLogo from './assets/david.png';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/david.png';
import { sendMsgToOpenAI } from './openai';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi, I'm D.A.V.I.D., your AI-powered search companion, built to understand you and find exactly what you need, instantly.",
      isBot: true,
    }
  ]);

 const [isLoading, setIsLoading] = useState(false);

const handleSend = async () => {
  if (!input.trim() || isLoading) return;
  setIsLoading(true);

  const userMessage = { text: input, isBot: false };
  setMessages(prev => [...prev, userMessage]);
  setInput("");

  try {
    const res = await sendMsgToOpenAI(input);
    const botMessage = { text: res, isBot: true };
    setMessages(prev => [...prev, botMessage]);
  } catch (error) {
    console.error("OpenAI Error:", error);
    const errorMessage = {
      text: "Too many requests, Please wait a moment.",
      isBot: true,
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">D.A.V.I.D.</span>
          </div>
          <button className="midBtn">
            <img src={addBtn} alt="New Chat" className="addBtn" />
            New Chat.
          </button>
          <div className="upperSideBottom">
            <button className="query">
              <img src={msgIcon} alt="message icon" /> What is Programming?
            </button>
            <button className="query">
              <img src={msgIcon} alt="message icon" /> Where is MCIU located?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="Home" className="listItemsImg" /> Home
          </div>
          <div className="listItems">
            <img src={saved} alt="Saved" className="listItemsImg" /> Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="Upgrade to Pro" className="listItemsImg" /> Upgrade to pro
          </div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img
                className="chatimg"
                src={message.isBot ? gptImgLogo : userIcon}
                alt={message.isBot ? "DAVID Bot" : "User"}
              />
              <p className="text">{message.text}</p>
            </div>
          ))}
        </div>

        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Ask away"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
            />
            <button className="send" onClick={handleSend} aria-label="Send message">
              <img src={sendBtn} alt="send" />
            </button>
          </div>
          <p className="Info">D.A.V.I.D. is mostly accurate, with a sprinkle of 'meh'</p>
        </div>
      </div>
    </div>
  );
}

export default App;