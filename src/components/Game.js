import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Game2048 from "../games/2048/2048";
import Chat from './Chat';

const Game = ({game, socket, userAddress}) => {
  const { roomId } = useParams();
  const [roomPlayers, setRoomPlayers] = useState([]);

  const renderGame = () => {
    switch (game) {
      case '2048':
        return <Game2048 socket={socket} userAddress={userAddress} roomId={roomId}/>
      default:
        return <><h1>Game not found</h1></>
    }  
  }

  return (
    <div className='gameStage'>
      <div id="gameOver" className="hide" style={{ opacity: 0 }}>
      <div className="overText">GameOver!</div>
      </div>
      <div className="container">
      <div id="leftSide">
        <div id="timelineStage">
          <p>Score : </p>
          <p id="score">0</p>
          <div id="addScore"></div>
        </div>
        <div id="usersStage">
          <div>
              {/* list users in table with theire score */}
              <ul id="playersTable">
                  {roomPlayers.map((player) => (
                      <li className="li-player">{`${player.substring(0, 10)}...`}</li>
                  ))}
              </ul>
          </div>
        </div>
      </div>
      {renderGame()}
      <div id="rightSide">
        <Chat roomId={roomId} socket={socket} userAddress={userAddress}/>
      </div>
    </div>
   </div>
  )
}

export default Game;