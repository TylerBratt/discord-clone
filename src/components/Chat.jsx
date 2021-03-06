import React, { useEffect, useRef, useState } from 'react'
import "./Chat.css";
import Message from './Message'
import ChatHeader from './ChatHeader';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import GifIcon from "@material-ui/icons/Gif";
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from '../features/appSlice';
import db from './firebase';
import firebase from '@firebase/app-compat';

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messageEl = useRef(null);



  useEffect(()=>{
    if(channelId) {
        db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => 
          setMessages(snapshot.docs.map((doc) => doc.data()))
      );
    };
  },[channelId]);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user
    });
    setInput("");
  };


  return (
    <div className="chat">
      <ChatHeader channelName={channelName}/>

      <div className="chat__messages" ref={messageEl}>
        {!channelName && <div className="chat__sticky">
          <h2>Welcome to my discord clone.</h2> <p>Feel free to add a channel and send a message</p>
        </div>}
        {messages.map((message) => 
          <Message 
            key={message.id}
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
            />,
        )}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large"/>
        <form>
          <input 
            value={input}
            disabled={!channelId}
            onChange={(e)=> setInput(e.target.value)}
            placeholder={`Message #${channelName}`} />
          <button 
            className="chat__inputButton"
            disabled={!channelId}
            type="submit"
            onClick={sendMessage}
            >Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large"/>
          <GifIcon fontSize="large"/>
          <EmojiEmotionsIcon fontSize="large"/>
        </div>
      </div>
    </div>
  )
}

export default Chat
