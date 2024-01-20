import React, { useState, useEffect } from 'react';



const PlayersTable = ({socket, roomId, userAddress}) => {
    const [roomPlayers, setRoomPlayers] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            socket.emit('getPlayers', roomId);
          }, 1000);
        
          socket.on('getPlayers', (data) => {
              setRoomPlayers(data)
            })
        
          return () => {
            clearInterval(timer);
          };
    }, [socket])

    return (
       <div id="usersStage">
            <div>
                <ul id="playersTable">
                    {roomPlayers?.map((player) => (
                       <li className={player === userAddress ? 'li-player li-player-active' : 'li-player'}>{`${player.substring(0, 10)}...`}</li>
                    ))}
                </ul>
            </div>
      </div>
    )
}

export default PlayersTable;