import React, { useState, useEffect } from 'react';
import Chat from '../../components/Game/Chat';
import './2048.css';
import { useParams } from 'react-router-dom';
import PlayersTable from '../../components/Game/playersTable';

const Game2048 = ({socket, userAddress}) => {
  const { roomId } = useParams();
  
  useEffect(() => {
    const gameObj = {
      points: {
        score: 0,
        history: [],
        status: 1,
      },
      stage: [],
      initStage: function () {
        for (let cell = 0; cell < 4; cell++) {
          this.stage[cell] = [];
          for (let row = 0; row < 4; row++) {
            this.stage[cell][row] = {
              boxObj: null,
              position: [cell, row],
            };
          }
        }
      },
      empty: function () {
        const emptyList = [];
        for (let row = 0; row < 4; row++) {
          for (let cell = 0; cell < 4; cell++) {
            if (this.stage[cell][row].boxObj === null) {
              emptyList.push(this.stage[cell][row]);
            }
          }
        }
        return emptyList;
      },
      newBox: function () {
        const emptyList = this.empty();
        if (emptyList.length) {
          const randomIndex = Math.floor(Math.random() * emptyList.length);
          new Box(emptyList[randomIndex]);
          return true;
        }
      },
      isEnd: function () {
        const emptyList = this.empty();
        if (!emptyList.length) {
          for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
              const obj = this.stage[i][j];
              const objLeft = j === 0 ? { boxObj: { value: 0 } } : this.stage[i][j - 1];
              const objRight = j === 3 ? { boxObj: { value: 0 } } : this.stage[i][j + 1];
              const objUp = i === 0 ? { boxObj: { value: 0 } } : this.stage[i - 1][j];
              const objDown = i === 3 ? { boxObj: { value: 0 } } : this.stage[i + 1][j];
              if (
                obj.boxObj.value === objLeft.boxObj.value ||
                obj.boxObj.value === objDown.boxObj.value ||
                obj.boxObj.value === objRight.boxObj.value ||
                obj.boxObj.value === objUp.boxObj.value
              ) {
                return false;
              }
            }
          }
          return true;
        }
        return false;
      },
      gameOver: function () {
        alert('GAME OVER!');
      },
      moveTo: function (obj1, obj2) {
        obj2.boxObj = obj1.boxObj;
        obj2.boxObj.domObj.className =
          'row' +
          obj2.position[0] +
          ' ' +
          'cell' +
          obj2.position[1] +
          ' ' +
          'num' +
          obj2.boxObj.value +
          ' ' +
          'dom-box';
        obj1.boxObj = null;
      },
      addTo: function (obj1, obj2) {
        obj2.boxObj.domObj.parentNode.removeChild(obj2.boxObj.domObj);
        obj2.boxObj = obj1.boxObj;
        obj1.boxObj = null;
        obj2.boxObj.value = obj2.boxObj.value * 2;
        obj2.boxObj.domObj.className =
          'row' +
          obj2.position[0] +
          ' ' +
          'cell' +
          obj2.position[1] +
          ' ' +
          'num' +
          obj2.boxObj.value +
          ' ' +
          'dom-box';
        obj2.boxObj.domObj.innerText = obj2.boxObj.value;
        obj2.boxObj.domObj.textContent = obj2.boxObj.value;
        this.points.score += obj2.boxObj.value;
        const scoreBar = document.getElementById('score');
        scoreBar.innerText = this.points.score;
        scoreBar.textContent = this.points.score;
        return obj2.boxObj.value;
      },
      clear: function (x, y) {
        let can = 0;
        for (let i = 0; i < 4; i++) {
          let fst = null;
          let fstEmpty = null;
          for (let j = 0; j < 4; j++) {
            let objInThisWay = null;
            switch ('' + x + y) {
              case '00':
                objInThisWay = this.stage[i][j];
                break;
              case '10':
                objInThisWay = this.stage[j][i];
                break;
              case '11':
                objInThisWay = this.stage[3 - j][i];
                break;
              case '01':
                objInThisWay = this.stage[i][3 - j];
                break;
            }
            if (objInThisWay.boxObj !== null) {
              if (fstEmpty) {
                this.moveTo(objInThisWay, fstEmpty);
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
      },
      move: function (x, y) {
        let can = 0;
        can = this.clear(x, y) ? 1 : 0;
        let add = 0;
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 3; j++) {
            let objInThisWay = null;
            let objInThisWay2 = null;
            switch ('' + x + y) {
              case '00':
                {
                  objInThisWay = this.stage[i][j];
                  objInThisWay2 = this.stage[i][j + 1];
                  break;
                }
              case '10':
                {
                  objInThisWay = this.stage[j][i];
                  objInThisWay2 = this.stage[j + 1][i];
                  break;
                }
              case '11':
                {
                  objInThisWay = this.stage[3 - j][i];
                  objInThisWay2 = this.stage[2 - j][i];
                  break;
                }
              case '01':
                {
                  objInThisWay = this.stage[i][3 - j];
                  objInThisWay2 = this.stage[i][2 - j];
                  break;
                }
            }
            if (objInThisWay2.boxObj && objInThisWay.boxObj.value === objInThisWay2.boxObj.value) {
              add += this.addTo(objInThisWay2, objInThisWay);
              this.clear(x, y);
              can = 1;
            }
          }
        }
        if (add) {
          const addscore = document.getElementById('addScore');
          addscore.innerText = '+' + add;
          addscore.textContent = '+' + add;
          addscore.className = 'show';
          setTimeout(function () {
            addscore.className = 'hide';
          }, 500);
        }
        if (can) {
          this.newBox();
        }
        if (this.isEnd()) {
          this.gameOver();
        }
      },
      init: null,
    };

    const Box = function (obj) {
      const num = Math.random() > 0.9 ? 4 : 2;
      this.value = num;
      this.parent = obj;
      this.domObj = (function () {
        const domBox = document.createElement('span');
        domBox.innerText = num;
        domBox.textContent = num;
        domBox.className =
          'row' + obj.position[0] + ' ' + 'cell' + obj.position[1] + ' ' + 'num' + num + ' ' + 'dom-box';
        const root = document.getElementById('stage');
        root.appendChild(domBox);
        return domBox;
      })();
      obj.boxObj = this;
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
          gameObj.move(0, 1);
          ready = 0;
        } else if (startX - x > 100 && ready) {
          gameObj.move(0, 0);
          ready = 0;
        } else if (startY - y > 100 && ready) {
          gameObj.move(1, 0);
          ready = 0;
        } else if (y - startY > 100 && ready) {
          gameObj.move(1, 1);
          ready = 0;
        }
      };

      const end = (x, y) => {
        ready = 0;
      };

      return {
        start,
        move,
        end,
      };
    };

    const disableSelection = (target) => {
      if (typeof target.onselectstart !== 'undefined') target.onselectstart = function () {
        return false;
      };
      else if (typeof target.style.MozUserSelect !== 'undefined') target.style.MozUserSelect = 'none';
      else target.onmousedown = function () {
        return false;
      };
      target.style.cursor = 'default';
    };

    window.onload = () => {
      gameObj.initStage();
      gameObj.newBox();

      const stage = document.getElementById('stage');
      document.onmousedown = (e) => {
        const event = e || window.event;
        const x = event.clientX;
        const y = event.clientY;
        controller().start(x, y);
      };

      document.onmousemove = (e) => {
        const event = e || window.event;
        const x = event.clientX;
        const y = event.clientY;
        controller().move(x, y);
      };

      document.onmouseup = (e) => {
        const event = e || window.event;
        const x = event.clientX;
        const y = event.clientY;
        controller().end(x, y);
      };

      const keyUp = (e) => {
        let currKey = 0;
        const event = e || window.event;
        currKey = event.keyCode || event.which || event.charCode;
        const keyName = String.fromCharCode(currKey);
        switch (currKey) {
          case 37:
            gameObj.move(0, 0);
            break;
          case 38:
            gameObj.move(1, 0);
            break;
          case 39:
            gameObj.move(0, 1);
            break;
          case 40:
            gameObj.move(1, 1);
            break;
        }
      };
  
      document.onkeyup = keyUp;
    };
  }, []);

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
      <PlayersTable roomId={roomId} socket={socket} userAddress={userAddress}/>
    </div>
    <div id='stage'></div>
    <div id="rightSide">
      <Chat roomId={roomId} socket={socket} userAddress={userAddress}/>
    </div>
  </div>
 </div>
  );
};

export default Game2048;