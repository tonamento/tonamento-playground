import React, { useState, useEffect } from 'react';
import Chat from '../../components/Game/Chat';
import './2048.css';
import { useParams } from 'react-router-dom';
import PlayersTable from '../../components/Game/PlayersTable';
import CountdownProgress from '../../components/Game/CountdownProgress';
import GameOverDialog from '../../components/Game/GameOverDialog';

const Game2048 = ({ socket, userAddress, playerUsername, setConfettiStatus, setMessageInfo }) => {
  const { roomId } = useParams();
  const [gameLaunched, setGameLaunched] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerCurrentPosition, setPlayerCurrentPosition] = useState(0);
  const [playerClaimableTokens, setPlayerClaimableTokens] = useState(0);
  const [gameState, setGameState] = useState({
    points: {
      score: 0,
      history: [],
      status: 1
    },
    stage: Array.from({length: 4}, (_, i) => Array.from({length: 4}, (_, j) => ({boxObj: null, position: [i, j]})))
  });

  // // send points to server
  useEffect(() => {
    socket.emit('updatePoints', {userAddress: userAddress, points: gameState.points.score, roomId: roomId});
  }, [gameState.points.score]);    

  const initStage = () => {
    const newStage = [];
    for (let cell = 0; cell < 4; cell++) {
      newStage[cell] = [];
      for (let row = 0; row < 4; row++) {
        newStage[cell][row] = {
          boxObj: null,
          position: [cell, row]
        };
      }
    }
    console.log('new stage', newStage);
    setGameState(prevState => ({
      ...prevState,
      stage: newStage
    }));
  };

  const empty = () => {
    const emptyList = [];
    for (let row = 0; row < 4; row++) {
      for (let cell = 0; cell < 4; cell++) {
        if (gameState.stage?.[cell]?.[row]?.boxObj === null) {
            emptyList.push(gameState.stage[cell][row]);
          }
      }
    }
    return emptyList;
  };

  const newBox = (currentState) => {
    const box = function (obj) {
      const num = Math.random() > 0.9 ? 4 : 2;
      this.value = num;
      this.parent = obj;
      this.domObj = function () {
        const domBox = document.createElement('span');
        domBox.innerText = num;
        domBox.textContent = num;
        domBox.className = 'row' + obj.position[0] + ' ' + 'cell' + obj.position[1] + ' ' + 'num' + num + ' ' + 'dom-box';
        const root = document.getElementById('stage');
        root.appendChild(domBox);
        return domBox;
      }();
      obj.boxObj = this;
    };
    
    const emptyList = empty(currentState);
    if (emptyList.length) {
      const randomIndex = Math.floor(Math.random() * emptyList.length);
      new box(emptyList[randomIndex]);
      return true;
    }
  };

  const isEnd = () => {
    const emptyList = empty();
    if (!emptyList.length) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const obj = gameState.stage[i][j];
          const objLeft = (j === 0) ? { boxObj: { value: 0 } } : gameState.stage[i][j - 1];
          const objRight = (j === 3) ? { boxObj: { value: 0 } } : gameState.stage[i][j + 1];
          const objUp = (i === 0) ? { boxObj: { value: 0 } } : gameState.stage[i - 1][j];
          const objDown = (i === 3) ? { boxObj: { value: 0 } } : gameState.stage[i + 1][j];
          if (obj.boxObj.value === objLeft.boxObj.value
            || obj.boxObj.value === objDown.boxObj.value
            || obj.boxObj.value === objRight.boxObj.value
            || obj.boxObj.value === objUp.boxObj.value) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  };

  const handleGameOver = () => {
    setGameOver(true);
  };

  const moveTo = (obj1, obj2) => {
    obj2.boxObj = obj1.boxObj;
    obj2.boxObj.domObj.className = 'row' + obj2.position[0] + ' ' + 'cell' + obj2.position[1] + ' ' + 'num' + obj2.boxObj.value + ' ' + 'dom-box';
    obj1.boxObj = null;
  };

  const addTo = (obj1, obj2) => {
    obj2.boxObj.domObj.parentNode.removeChild(obj2.boxObj.domObj);
    obj2.boxObj = obj1.boxObj;
    obj1.boxObj = null;
    obj2.boxObj.value = obj2.boxObj.value * 2;
    obj2.boxObj.domObj.className = 'row' + obj2.position[0] + ' ' + 'cell' + obj2.position[1] + ' ' + 'num' + obj2.boxObj.value + ' ' + 'dom-box';
    obj2.boxObj.domObj.innerText = obj2.boxObj.value;
    obj2.boxObj.domObj.textContent = obj2.boxObj.value;
    setGameState(prevState => ({
        ...prevState,
        points: {
          ...prevState.points,
          score: prevState.points.score + obj2.boxObj.value
        }
     }));
   return obj2.boxObj.value;
 };

  const clear = (x, y) => {
    let can = 0;
    for (let i = 0; i < 4; i++) {
      let fst = null;
      let fstEmpty = null;
      for (let j = 0; j < 4; j++) {
        let objInThisWay = null;
        switch ("" + x + y) {
          case '00': objInThisWay = gameState.stage[i][j]; break;
          case '10': objInThisWay = gameState.stage[j][i]; break;
          case '11': objInThisWay = gameState.stage[3 - j][i]; break;
          case '01': objInThisWay = gameState.stage[i][3 - j]; break;
        }
        if (objInThisWay.boxObj != null) {
          if (fstEmpty) {
            moveTo(objInThisWay, fstEmpty);
            fstEmpty = null;
            j = 0;
            can = 1;
          }
        } else if (!fstEmpty) {
          fstEmpty = objInThisWay;
        }
      }
    }
    return can;
  };

  const move = (x, y) => {
    let can = 0;
    can = clear(x, y) ? 1 : 0;
    let add = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        let objInThisWay = null;
        let objInThisWay2 = null;
        switch ("" + x + y) {
          case '00': {
            objInThisWay = gameState.stage[i][j];
            objInThisWay2 = gameState.stage[i][j + 1]; break;
          }
          case '10': {
            objInThisWay = gameState.stage[j][i];
            objInThisWay2 = gameState.stage[j + 1][i]; break;
          }

          case '11': {
            objInThisWay = gameState.stage[3 - j][i];
            objInThisWay2 = gameState.stage[2 - j][i]; break;
          }
          case '01': {
            objInThisWay = gameState.stage[i][3 - j];
            objInThisWay2 = gameState.stage[i][2 - j]; break;
          }
        }
        if (objInThisWay2.boxObj && objInThisWay.boxObj.value === objInThisWay2.boxObj.value) {
          add += addTo(objInThisWay2, objInThisWay);
          clear(x, y);
          can = 1;
        }
      }
    }
    if (add) {
      const addscore = document.getElementById('addScore');
      addscore.innerText = "+" + add;
      addscore.textContent = "+" + add;
      addscore.className = "show";
      setTimeout(function () {
        addscore.className = "hide";
      }, 500);
    }
    if (can) {
      newBox();
    }
    if (isEnd()) {
      handleGameOver();
    }
  };

  const controller = () => {
    let startX = 0;
    let startY = 0;
    let ready = 0;
    const start = (x, y) => {
      ready = 1;
      startX = x;
      startY = y;
    };
    const move = (x, y) => {
      if (x - startX > 100 && ready) {
        move(0, 1);
        ready = 0;
      } else if (startX - x > 100 && ready) {
        move(0, 0);
        ready = 0;
      }
      else if (startY - y > 100 && ready) {
        move(1, 0);
        ready = 0;
      }
      else if (y - startY > 100 && ready) {
        move(1, 1);
        ready = 0;
      }
    };
    const end = (x, y) => {
      ready = 0;
    };
    return {
      start: start,
      move: move,
      end: end
    };
  };

  const disableSelection = (target) => {
    if (typeof target.onselectstart != "undefined") //IE route
      target.onselectstart = function () { return false; };
    else if (typeof target.style.MozUserSelect != "undefined") //Firefox route
      target.style.MozUserSelect = "none";
    else //All other route (ie: Opera)
      target.onmousedown = function () { return false; };
    target.style.cursor = "default";
  };

  const handleClaimRewards = () => {
    // alret that we claimed tokens
    setMessageInfo({
      open: true,
      severity: 'success',
      message: 'Tokens Claimed Successfully!!',
    });
    // redirect to home page
    setTimeout(() => {
      window.location.href = '/';
    }, 3000)
  }
  
    useEffect(() => {
        //  initStage();
        var stage = document.getElementById('stage');
        document.onmousedown = function (e) {
           var event = e || window.event;
           var obj = event.target || event.srcElement;
           var x = event.clientX;
           var y = event.clientY;
           const gameController = controller();
           gameController.start(x, y);
      };
         document.onmousemove = function (e) {
            var event = e || window.event;
            var obj = event.target || event.srcElement;
            var x = event.clientX;
            var y = event.clientY;
            const gameController = controller();
            gameController.move(x, y);
       };
         document.onmouseup = function (e) {
            var event = e || window.event;
            var obj = event.target || event.srcElement;
            var x = event.clientX;
            var y = event.clientY;
            const gameController = controller();
            gameController.end(x, y);
       };
         function keyUp(e) {
            var currKey = 0, e = e || window.event;
            currKey = e.keyCode || e.which || e.charCode;
            var keyName = String.fromCharCode(currKey);
            switch (currKey) {
                case 37: move(0, 0); break;
                case 38: move(1, 0); break;
                case 39: move(0, 1); break;
                case 40: move(1, 1); break;
            }
       }
        document.onkeyup = keyUp;
        disableSelection(document.body);
    }, []);
    
    useEffect(() => {
       if (gameState.stage.length > 1 && !gameLaunched) {
           newBox();
           setGameLaunched(true);
       }
    }, [gameState.stage, gameLaunched]);

    return (
        <div className='gameStage'>
      <div id="gameOver" className="hide" style={{ opacity: 0 }}>
        <div className="overText">GameOver!</div>
      </div>
      <div className="container">
        <div id="leftSide">
          <div id="timelineStage">
            <p>Score : </p>
            <p id="score">{gameState.points.score}</p>
            <div id="addScore"></div>
          </div>
          <PlayersTable roomId={roomId} socket={socket} userAddress={userAddress} setPlayerCurrentPosition={setPlayerCurrentPosition}/>
        </div>
        <div id='stage'>
           <CountdownProgress  
               totalTime={60}
               style={{
                  width: 'inherit',
                  height: '75px',
                  position: 'relative',
                  top: '102%',
                  background: 'transparent',
                  borderRadius: '7px',
              }}
              progressHeight={'100%'}
              onComplete={handleGameOver}  />
        </div>
        <div id="rightSide">
          <Chat roomId={roomId} socket={socket} userAddress={userAddress} />
        </div>
      </div>
        {gameOver && <GameOverDialog
           open={gameOver}
           player={playerUsername}
           points={gameState.points.score}
           position={playerCurrentPosition}
           onConfirm={handleClaimRewards}
           confirmButtonText="Claim Rewards"
           setConfettiStatus={setConfettiStatus}
        />}
    </div>
  );
};

export default Game2048;