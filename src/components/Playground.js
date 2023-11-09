import React from 'react';
import comingSoon from "../img/coming-soon.png"
import ImageListItemBar from '@mui/material/ImageListItemBar';
import CircleIcon from '@mui/icons-material/Circle';

function Playground(props) {
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
    }
  ];

  return (
    <>
      <div className={props.classes.drawerHeader} />
      <div className={props.classes.games}>
        {games.map((game, index) => (
          <div key={index} className={props.classes.game}
            style={{
              backgroundImage: `url(${game.image})`,
              backgroundColor: '#c3deff'
            }}
          >
           <div className={props.classes.titleBar}>
               <h2 className={props.classes.titleBarText}>{game.title}</h2>
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
    </>
  );
}

export default Playground;