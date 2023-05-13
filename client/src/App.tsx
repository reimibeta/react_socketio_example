import React, { useEffect, useState } from 'react';
import { connect as connectSocket } from 'socket.io-client';
import { connect } from "react-redux";
import './App.css';
import { dispatchSetRoom, dispatchSendMessage, dispatchReceiveMessage } from './redux/actions/send_message_action';

// const socket = connectSocket("http://localhost:3001");
const socket = connectSocket("http://localhost:3001/sales");

interface Props {
  dispatchSetRoom: (socket: any, props: { room: string }) => void,
  room: string,
  dispatchSendMessage: (socket: any, props: { message: string, room: string }) => void,
  messageSend: string,
  dispatchReceiveMessage: (socket: any) => void,
  messageReceived: string,
}

const App: React.FC<Props> = ({
  dispatchSendMessage,
  messageSend,
  dispatchSetRoom,
  room,
  dispatchReceiveMessage,
  messageReceived
}) => {

  const [msg, setMsg] = useState('');
  const [msgReceived, setMsgReceived] = useState("");

  const [rom, setRom] = useState("");

  const sendMessage = () => {
    // socket.emit("send_message", {message: message, room: room});
    if(room){
      dispatchSendMessage(socket, { room: room, message: msg });
    }
  }

  const joinRoom = () => {
    if (rom !== "") {
      // socket.emit("join_room", room);
      dispatchSetRoom(socket, { room: rom });
    }
  };


  useEffect(() => {
    // socket.on("receive_message", (data) => {
    //   // alert(data)
    //   // console.log(data.message)
    //   setMsgReceived(data.message);
    // });
    dispatchReceiveMessage(socket);
  }, [socket]);

  return (
    <div className="App">
     <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMsg(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1>Room:</h1>
      <>{room}</>
      <h1>Message:</h1>
      <>{messageReceived}</>
    </div>
  );
}

const mapToStateProps = (state: {
  messages: {
    room: string,
    messageSend: string,
    messageReceived: string,
  }
}) => {
  return {
    room: state.messages.room,
    messageSend: state.messages.messageSend,
    messageReceived: state.messages.messageReceived
  }
}

export default connect(mapToStateProps, { dispatchSendMessage, dispatchSetRoom, dispatchReceiveMessage })(App);
