// write react component
import React, { useState, useEffect } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import CelebrationIcon from '@mui/icons-material/Celebration';
import TelegramIcon from '@mui/icons-material/Telegram';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Chip, Grid, Typography , Avatar, Skeleton} from '@mui/material';
import './css/chatApp.css';



const Chat = ({socket, userAddress, roomId}) => {
    const [message, setMessage] = useState('');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [roomMessages, setRoomMessages] = useState([]);
  
    // get currect players from socket
    useEffect(() => {
      socket.on('receiveMessage', (data) => {
          setRoomMessages([...roomMessages, data])
      })
  
      var chatContainer = document.getElementById("chatApp");
      chatContainer.scrollTop = chatContainer.scrollHeight;
    
    });
  
    function timestamp2date(timestamp) {
      const date = new Date(timestamp * 1000);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      const formattedTimestamp = `${hours}:${minutes}`;
      return formattedTimestamp;
  }
  
    const handleOpenEmojiPicker = () => {
      if (!openEmojiPicker) { setOpenEmojiPicker(true) }
      else {setOpenEmojiPicker(false)}
    };
  
    const sendMessage2Room = (event , reactions = false) => {
      if (message !== '' && message !== null) {
        const msgData = {
          roomId: roomId,
          message:  reactions? event.target.innerHtml : message ,
          userAddress: userAddress,
          type: "send",
          time: timestamp2date(Date.now() / 1000),
        }
        socket.emit('sendMessage', msgData);
        setRoomMessages([...roomMessages, msgData])
        setMessage('');
      }
    }


    return (
        <div className="chatFeature">
              <div id="chatAppActions">
                {/*  send action messages to room */}
                <span onClick={() => sendMessage2Room(true)}>Let's go! 🔥</span>
                <span onClick={() => sendMessage2Room(true)}>Haha 😁</span>
                <span onClick={() => sendMessage2Room(true)}>Nooooo 🤬</span>
                {/* <span>Im winner👀</span> */}
              </div>
              <div id="chatApp">
              {roomMessages.length > 0 ? (
                            roomMessages.map((val, index) => (
                              <div key={index} className={`message ${val.type === "receive" ? "their" : "my"}-message`}>
                                {val.type === "send" ? (
                                  <>
                                    <Chip className="ml-3" label={val.message} color="info" sx={{height: 'auto', minHeight:50+'px',   '& .MuiChip-label': {     display: 'block',     whiteSpace: 'normal',   }, }}/>
                                    <p style={{fontSize:"12px", margin:"1px" ,marginRight:"6px"}}>{val.time}</p>
                                </>
                                ) : (
                                  <>
                                    <Chip className="ml-3" avatar={<Avatar style={{padding:15+"px", margin:5}}>test</Avatar>} label={val.message} color="secondary"  sx={{height: 'auto', minHeight:50+'px',   '& .MuiChip-label': {     display: 'block',     whiteSpace: 'normal',   }, }}/>
                                    <p style={{fontSize:"12px", margin:"1px" ,marginLeft:"25px"}}>{val.time}</p>
                                  </>
                                )}
                              </div>
                            ))
                          ) : (
                            <>
                              <Skeleton variant="rectangular" sx={{ bgcolor: '#20d2ff36', margin: 1}} height={200} />
                              <Skeleton variant="rectangular" sx={{ bgcolor: '#20d2ff36', margin: 1}} height={100} />
                              <Skeleton variant="rectangular" sx={{ bgcolor: '#20d2ff36', margin: 1}} height={40}/>
                            </>
                          )}
                {openEmojiPicker && (
                    <Picker data={data} onEmojiSelect={(emoji) => setMessage(message + emoji.native)} />
                )}
              </div>
              <div id='chatAppParentInput' style={{ display: 'flex', alignItems: 'center' , height:"12%"}}>
                <input
                    id="chatAppInput"
                    placeholder="Send message!"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                  <button onClick={handleOpenEmojiPicker} id={openEmojiPicker? 'chatAppEmojiBtnActive' : 'chatAppEmojiBtn'}>
                    <CelebrationIcon fontSize='large' sx={{verticalAlign:"middle"}}/>
                  </button>
                  <button onClick={sendMessage2Room} id='chatAppSendBtn'>
                    <TelegramIcon fontSize='large' sx={{verticalAlign:"middle"}}/>
                  </button>
              </div>
          </div>
    );
}

export default Chat;