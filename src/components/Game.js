import React from 'react';
import { useParams } from "react-router-dom";
import Game2048 from "../games/2048/2048";

const Game = () => {
  const { game, roomId } = useParams();
  return (
    <>
       
    </>
  )
}

export default Game;