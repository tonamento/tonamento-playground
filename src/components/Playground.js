import React, {useEffect, useState} from 'react';
import comingSoon from "../img/coming-soon.png"
import ImageListItemBar from '@mui/material/ImageListItemBar';
import CircleIcon from '@mui/icons-material/Circle';
import { Modal, Paper, Box, Button, Typography, Dialog, ListItemText, ListItem, TextField } from '@mui/material';
import { useContract } from '../utils/contractAPI';
import ConfirmModal from './ConfirmModal';
// import account from wagmi/account';

function Playground(props) {
  const {classes, setLoadingText, setLoadingSubText, setLoadingStatus, setNeededSkeletons, userAddress, isConnected} = props;
  const [openRoom, setOpenRoom] = useState(false);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomTicketPrice, setRoomTicketPrice] = useState(0);
  const [roomMaxPlayers, setRoomMaxPlayers] = useState(0);
  const [currectGame, setCurrectGame] = useState('');
  const [rooms, setRooms] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [userRequiredJoin, setUserRequiredJoin] = useState(false);
  const [roomIdRequiredJoin, setRoomIdRequiredJoin] = useState(null);
  const { write, isLoading, isSuccess, error } = useContract();
  
  const socket = props.socket

  useEffect (() => {
    socket.on('roomCreated', (data) => {
      setRooms([...rooms, data.room])
    })
    
    socket.on('roomReady', (data) => {
      // go to room by url
      setOpenCreateRoom(false)
      setOpenRoom(false)
      setLoadingStatus(false)
      setNeededSkeletons(false)
      window.location.href = `/games/${currectGame}/${data.id}`
    })

    const newPlayerHandler = (data) => {
      setLoadingSubText(`${data.players.length} / ${data.maxPlayers} players joined`);
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

  useEffect(() => {
    if (isSuccess) {
      setOpenConfirmModal(false);
      if (userRequiredJoin) {
         performJoinRoom()
      } else {
         performRoomCreation(); // If transaction is successful, perform room creation
      }
    }
  }, [isSuccess]);
  
  const handleCostTickets = React.useCallback((amount) => {
    write({ functionName: 'useTicket', args: [amount] });
  }, [write]);

  const gameTicketPrices = () => {
     switch (currectGame) {
       default:
          setRoomTicketPrice(100)
       case '2048':
          setRoomTicketPrice(100)
        case 'tic-tac-toe':
           setRoomTicketPrice(100)
     }
  }

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  }

  const handleOpenRoom = (game) => {
    const _currectGame = game.toLowerCase()
    if (_currectGame.includes('coming')) {
      alert('coming soon')
    } else {
      setCurrectGame(_currectGame.replace('game', '').replace('play','').replace(' ', ''))
      setOpenRoom(true);
    }
  };
  
  const handleCloseRoom = () => {
    setOpenRoom(false);
  }

  const handleCreateRoom = () => {
    gameTicketPrices()
    setOpenRoom(false)
    setOpenCreateRoom(true)
 }

 const handleCloseCreateRoom = () => {
   setOpenCreateRoom(false)
 }

 const createRoom = () => {
    //  show alert with confirm button
    setOpenConfirmModal(true)
};

  const performRoomCreation = () => {
      const roomData = {
        game: currectGame,
        name: roomName,
        owner: socket.id,
        id:null,
        ticketPrice: roomTicketPrice,
        players: [userAddress],
        playersJoined : 1,
        maxPlayers: Number(roomMaxPlayers),
      }
      setOpenCreateRoom(false)
      setOpenRoom(false)
      setLoadingStatus(true)
      setNeededSkeletons(false)
      setLoadingText('Waiting for joining players...')
      setLoadingSubText(`1 / ${roomData.maxPlayers} players joined`)
      socket.emit('createRoom', roomData)
  }

  const joinRoom = (roomID) => {
    //  show alert with confirm button
    setUserRequiredJoin(true)
    setOpenConfirmModal(true)
    setRoomIdRequiredJoin(roomID)
  }
  
  const performJoinRoom = () => {
    if (isConnected) {
      const roomData = rooms.find(room => room.id === roomIdRequiredJoin);
      setCurrectGame(roomData)
      setLoadingStatus(true)
      setLoadingSubText(`${roomData.players.length + 1} / ${roomData.maxPlayers} players joined`)
      socket.emit('joinRoom', {roomId: roomIdRequiredJoin,  'userAddress': userAddress})
    }
  }

  const returnConfirmModal = () => {
    if (!userRequiredJoin) {
      return (
        <ConfirmModal 
          open={openConfirmModal} 
          method={'Create Room'} 
          confirmName={'Pay'} 
          onConfirm={() => handleCostTickets(roomTicketPrice * 10 ** 18)} 
          onCancel={handleCloseConfirmModal} 
          details={`This service costs ${roomTicketPrice} TOTO to set up a room. Do you want to continue?`} 
          isConfirmDisabled={isLoading} 
     />
      )
    } else {
       return (
        <ConfirmModal 
            open={openConfirmModal} 
            method={'Create Room'} 
            confirmName={'Pay'} 
            onConfirm={() => handleCostTickets(roomTicketPrice * 10 ** 18)} 
            onCancel={handleCloseConfirmModal} 
            details={`This costs ${roomTicketPrice} TOTO to join room. Are you sure?`} 
            isConfirmDisabled={isLoading} 
     />
       )
    }
  }

  const games = [
    {
      image: "https://assets.fortnitecreativehq.com/wp-content/uploads/2023/01/21012853/Tic-Tac-Toe.png",
      title: "Play 2048",
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
          <div key={index} className={classes.game} onClick={() => handleOpenRoom(game.title)}
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
                disabled
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
      {returnConfirmModal()}
    </>
  );
}

export default Playground;