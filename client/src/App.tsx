import React, { useEffect, useState } from 'react';
import { connect } from 'socket.io-client';
import './App.css';

const socket = connect("http://localhost:3001");

function App() {

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState("");

  const [room, setRoom] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", {message: message, room: room});
  }

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };


  useEffect(() => {
    socket.on("receive_message", (data) => {
      // alert(data)
      // console.log(data.message)
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
     <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
