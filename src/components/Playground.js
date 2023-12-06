import React, {useEffect, useState} from 'react';
import comingSoon from "../img/coming-soon.png"
import ImageListItemBar from '@mui/material/ImageListItemBar';
import CircleIcon from '@mui/icons-material/Circle';
import { Modal, Paper, Box, Button, Typography, Dialog, ListItemText, ListItem, TextField } from '@mui/material';


function Playground(props) {
  const {classes, setLoadingText, setLoadingSubText, setLoadingStatus, setNeededSkeletons} = props
  const [openRoom, setOpenRoom] = useState(false);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomTicketPrice, setRoomTicketPrice] = useState(0);
  const [roomMaxPlayers, setRoomMaxPlayers] = useState(0);
  const [currectGame, setCurrectGame] = useState('');

  const [rooms, setRooms] = useState([]);
  
  const socket = props.socket

  useEffect (() => {
    socket.on('roomCreated', (data) => {
      setRooms([...rooms, data.room])
    })

      const newPlayerHandler = (data) => {
        setLoadingSubText(`${data.players.length + 1} / ${data.maxPlayers} players joined`);
        socket.off('newPlayer', newPlayerHandler);
      };
    
      socket.on('newPlayer', data => {
        newPlayerHandler(data)
      });
    
      return () => {
        socket.off('newPlayer', newPlayerHandler);
      }
  })
  
  // get rooms from server and set rooms state by socket
  useEffect(() => {
    const timer = setInterval(() => {
      socket.emit('getRooms');
    }, 1000);
  
    socket.on('rooms', (data) => {
      setRooms(data);
    });
  
    return () => {
      clearInterval(timer);
    };
  }, [socket]);
  

  const handleOpenRoom = () => {
    setOpenRoom(true);
  };
  
  const handleCloseRoom = () => {
    setOpenRoom(false);
  }

  const createRoom = () => {
      const roomData = {
        game: currectGame,
        name: roomName,
        owner: socket.id,
        id:null,
        ticketPrice: roomTicketPrice,
        players: [socket.id],
        playersJoined : 1,
        maxPlayers: roomMaxPlayers,
      }
      setOpenCreateRoom(false)
      setOpenRoom(false)
      setLoadingStatus(true)
      setNeededSkeletons(false)
      setLoadingText('Waiting for joining players...')
      setLoadingSubText(`1 / ${roomData.maxPlayers} players joined`)
      socket.emit('createRoom', roomData)
  }

  const handleCreateRoom = () => {
     setOpenRoom(false)
     setOpenCreateRoom(true)
  }

  const handleCloseCreateRoom = () => {
    setOpenCreateRoom(false)
  }

  const joinRoom = (roomID) => {
    const roomData = rooms.find(room => room.id === roomID)
    setCurrectGame(roomData)
    setLoadingStatus(true)
    setLoadingSubText(`${roomData.players.length + 1} / ${roomData.maxPlayers} players joined`)
    socket.emit('joinRoom', roomID)
  }

  const games = [
    {
      image: "https://assets.fortnitecreativehq.com/wp-content/uploads/2023/01/21012853/Tic-Tac-Toe.png",
      title: "TicTacTao Game",
      online: "20 online"
    },
    {
      image: comingSoon,
      title: "Coming soon!",
      online: "20 online"
    },
    {
      image: comingSoon,
      title: "Coming soon!",
      online: "20 online"
    },
    {
      image: comingSoon,
      title: "Coming soon!",
      online: "20 online"
    },
    {
      image: comingSoon,
      title: "Coming soon!",
      online: "20 online"
    },
    {
      image: comingSoon,
      title: "Coming soon!",
      online: "20 online"
    },
    {
      image: comingSoon,
      title: "Coming soon!",
      online: "20 online"
    }
  ];

  return (
    <>
      <div className={classes.drawerHeader} />
      <div className={classes.games}>
        {games.map((game, index) => (
          <div key={index} className={classes.game} onClick={handleOpenRoom}
            style={{
              backgroundImage: `url(${game.image})`,
              backgroundColor: '#c3deff'
            }}
          >
           <div className={classes.titleBar}>
               <h2 className={classes.titleBarText}>{game.title}</h2>
                  {game.title === "Coming soon!"?
                    <p style={{ marginLeft: "20px", fontFamily:"visage" }}>
                      <CircleIcon sx={{fontSize:"15px"}} style={{color:'yellow', marginRight:"5px",filter:"drop-shadow(1px 1px 5px yellow)"}}/>  
                      Stay tuned
                    </p>
                    :
                    <p style={{ marginLeft: "20px", fontFamily:"visage" }}>
                       <CircleIcon sx={{fontSize:"15px"}} style={{color:'#2fff10', marginRight:"5px",filter:"drop-shadow(1px 1px 5px #2fff10)"}}/>
                       {game.online}
                    </p>
                  }
            </div>
          </div>
        ))}
      </div>
      <Dialog open={openRoom} onClose={handleCloseRoom} maxWidth="xl">
        <Box className={classes.roomsModal} p={3} width={700}>
          <Typography variant="h5" mb={2} sx={{fontFamily:"avenir", fontWeight:500}}>Online Rooms</Typography>
          <div className={classes.roomPreview}>
            {rooms.length > 0 ? rooms.map((room, index) => (
              <ListItem sx={{background:"dodgerblue", borderRadius:"10px", margin:0.5, padding:1}} button key={index}>
                  <ListItemText primary={<Typography variant="h6" style={{fontFamily: 'gumdrop'}}>{room.name}</Typography>} />
                  <ListItemText primary={<Typography variant="h6" style={{fontFamily: 'gumdrop'}}>{room.playersJoined}/{room.maxPlayers} Joined</Typography>} />
                  <ListItemText primary={<Typography variant="h6" style={{fontFamily: 'gumdrop'}}>{room.ticketPrice}</Typography>} />
                  <Button onClick={() => joinRoom(room.id)} variant="contained" sx={{marginLeft:"auto",background:"gold", borderRadius:"10px", fontWeight:800, color:"black"}}>Join</Button>
            </ListItem>)
            ) : (
              <ListItem sx={{background:"gold", borderRadius:"10px", marginBottom:0.1}} button>
                    <ListItemText>
                          There is no any room!
                    </ListItemText>
              </ListItem>
             )}
          </div>
          <Button onClick={handleCreateRoom} variant="contained" sx={{fontFamily:"avenir",marginTop:"20px", borderRadius:"10px"}}>Create Room</Button>
          <Button onClick={handleCloseRoom} variant="contained" sx={{fontFamily:"avenir",marginTop:"20px", borderRadius:"10px",background:"#ff0000", marginLeft:0.5}}>Exit</Button>
      </Box>
    </Dialog>
      <Dialog open={openCreateRoom} onClose={handleCloseCreateRoom} className={classes.roomsModal} maxWidth="xl" sx={{display:"flex", justifyContent:"center", alignItems:"center", padding:8}}>
         <Box className={classes.roomsModal} p={3} width={500}>
              <TextField
                fullWidth
                label="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                sx={{marginBottom: 2}}
              />
              <br />
              <TextField
                label="Ticket Price"
                type="number"
                value={roomTicketPrice}
                onChange={(e) => setRoomTicketPrice(e.target.value)}
              />
              <TextField
                label="Max Players"
                type="number"
                value={roomMaxPlayers}
                onChange={(e) => setRoomMaxPlayers(e.target.value)}
                sx={{marginLeft: 3}}
              />
              <br />
              <div style={{marginTop: 20}}>
                <Button variant="contained" color="primary" onClick={createRoom} sx={{margin:0.75}}>
                  Create Room
                </Button>
                <Button variant="contained" color="warning" onClick={handleCloseCreateRoom} sx={{margin:0.75}}>
                  Close
                </Button>
            </div>
          </Box>
      </Dialog>
    </>
  );
}

export default Playground;