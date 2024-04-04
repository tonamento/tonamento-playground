import React, { useState, useEffect } from 'react';
import './css/PlayersComponent.css'; // make sure to create and import this CSS file

const PlayersTable = ({ socket, roomId, userAddress, setPlayerCurrentPosition}) => {
    const [roomPlayers, setRoomPlayers] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            socket.emit('getPlayers', roomId);
        }, 700);

        socket.on('getPlayers', (data) => {
            // Create a deep copy of the data and sort it
            const sortedData = [...data].sort((a, b) => b.points - a.points);
            setPlayerCurrentPosition(sortedData.findIndex(player => player.userAddress === userAddress) + 1);
            setRoomPlayers(sortedData);
        });

        return () => {
            clearInterval(timer);
            socket.off('getPlayers'); // Remove event listener on cleanup
        };
    }, [socket, roomId]);

    // Helper function to determine the medal for the top 3 players
    const getMedalEmoji = (index) => {
        const medals = {
            0: <img width="20" height="20" src="https://img.icons8.com/emoji/48/1st-place-medal-emoji.png" alt="1st-place-medal-emoji"/>,
            1: <img width="20" height="20" src="https://img.icons8.com/emoji/48/2nd-place-medal-emoji.png" alt="2nd-place-medal-emoji"/>,
            2: <img width="20" height="20" src="https://img.icons8.com/emoji/48/3rd-place-medal-emoji.png" alt="3rd-place-medal-emoji"/>
        };
        return medals[index] || null;
    };

    // Helper function to find CSS class for an individual player
    const getPlayerCssClass = (player) => {
        let cssClass = 'li-player';
        if (player.userAddress === userAddress) {
            cssClass += ' li-player-active';
        }
        return cssClass;
    };

    return (
        <div id="usersStage">
            <div>
                <ul id="playersTable">
                    {roomPlayers?.map((player, index) => (
                        <li key={player.userAddress} className={getPlayerCssClass(player)}>
                            <span className="medal">{getMedalEmoji(index)}</span>
                            <span className="player-info">
                              {`${player.username} (${player.userAddress.slice(0, 4)}...${player.userAddress.slice(-4)})`}
                              <p style={{ float: 'right', margin: 0, padding: 0, fontSize: '18px', textAlign: 'right' }}>{player.points}</p>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PlayersTable;