import React from 'react';
import comingSoon from "../img/coming-soon.png"
import ImageListItemBar from '@mui/material/ImageListItemBar';

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
                    <p style={{ marginLeft: "20px", fontFamily:"visage" }}>Stay tuned</p>
                    :
                    <p style={{ marginLeft: "20px", fontFamily:"visage" }}>{game.online}</p>
                  }
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Playground;