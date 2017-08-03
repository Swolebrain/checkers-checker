/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _preLoader = __webpack_require__(1);

var _preLoader2 = _interopRequireDefault(_preLoader);

var _CheckersGame = __webpack_require__(2);

var _CheckersGame2 = _interopRequireDefault(_CheckersGame);

var _buildMoveList = __webpack_require__(3);

var _buildMoveList2 = _interopRequireDefault(_buildMoveList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testCases = {};
console.log("hi");

(0, _preLoader2.default)().then(function (fileContents) {
  for (var fileName in fileContents) {
    testCases[fileName] = (0, _buildMoveList2.default)(fileContents[fileName], "black");
  }
  console.log(testCases);
  var game1 = new _CheckersGame2.default(testCases["black.txt"]);
}).catch(function (err) {
  alert(err);
  console.log(err);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = preLoader;
function preLoader() {
  return new Promise(function (resolve, reject) {
    var files = ['black.txt', 'incomplete.txt', 'white.txt', 'illegal_move.txt'];
    var fileContents = {};
    var numResolved = 0;
    files.forEach(function (fileName) {
      fetch(fileName).then(function (res) {
        if (res.status != 200) throw "Failed preloading " + fileName;
        return res.text();
      }).then(function (fileContent) {
        fileContents[fileName] = fileContent;
        //if this is the last file, resolve promise
        if (++numResolved === files.length) {
          resolve(fileContents);
        }
      }).catch(function (err) {
        reject(err);
      });
    });
  });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CheckersGame = function () {
  function CheckersGame(movesList) {
    _classCallCheck(this, CheckersGame);

    this.movesList = movesList;
    this.boardState = this.initializeBoard();
    var endState = this.validateMoves();
    if (endState.valid) {
      this.boardState = endState.boardState;
      var outcome = this.determineWinner();
      console.log(outcome);
    }
  }

  _createClass(CheckersGame, [{
    key: "initializeBoard",
    value: function initializeBoard() {
      var state = new Array(8).fill("").map(function (cell) {
        return new Array(8).fill("").map(function (e, i) {
          return "";
        });
      });
      var oneIndexed = [0, 2, 6];
      var zeroIndexed = [1, 5, 7];
      state.forEach(function (row, rowIdx) {
        var pieceColor = "w";
        if (rowIdx > 3) pieceColor = "b";
        //if it's an even column, fill it with adequate color
        if (zeroIndexed.indexOf(rowIdx) >= 0) state[rowIdx] = state[rowIdx].map(function (cell, idx) {
          return idx % 2 === 0 ? pieceColor : "";
        });else if (oneIndexed.indexOf(rowIdx) >= 0) state[rowIdx] = state[rowIdx].map(function (cell, idx) {
          return idx % 2 === 1 ? pieceColor : "";
        });
      });
      state = JSON.parse(JSON.stringify(state));
      this.printBoard(state);
      console.log("initialized.");
      return state;
    }
  }, {
    key: "printBoard",
    value: function printBoard(board) {
      var print = void 0;
      if (board) print = JSON.parse(JSON.stringify(board));else print = JSON.parse(JSON.stringify(this.boardState));

      console.log(print.reverse());
    }
  }, {
    key: "validateMoves",
    value: function validateMoves() {
      var _this = this;

      //deep clone board state:
      var currentState = JSON.parse(JSON.stringify(this.boardState));
      console.log("currentState");
      this.printBoard();
      var invalidMove = null;
      this.movesList.forEach(function (move, idx) {
        var moveStr = move.from.x + "," + move.from.y + "->" + move.to.x + "," + move.to.y;
        if (invalidMove) return; //bias towards first invalid move
        console.log(moveStr);
        if (move.from.x < 0 || move.from.x > 7) invalidMove = "Line " + (idx + 1) + " illegal move: " + moveStr + " - bad starting x coord";
        if (move.from.y < 0 || move.from.y > 7) invalidMove = "Line " + (idx + 1) + " illegal move: " + moveStr + " - bad starting y coord";
        if (move.to.x < 0 || move.to.x > 7) invalidMove = "Line " + (idx + 1) + " illegal move: " + moveStr + " - bad ending x coord";
        if (move.to.y < 0 || move.to.y > 7) invalidMove = "Line " + (idx + 1) + " illegal move: " + moveStr + " - bad ending y coord";

        if (currentState[move.from.y][move.from.x] === "") invalidMove = "Line " + (idx + 1) + " illegal move: " + moveStr + " - starting coords empty";
        if (currentState[move.to.y][move.to.x] !== "") invalidMove = "Line " + (idx + 1) + " illegal move: " + moveStr + " - ending coords not empty";

        if (invalidMove) return; //don't check anything else if we found an invalid move this turn

        //two main cases: can jump or not. May jump left or right. We choose left bias if it can jump both ways
        var canJump = false;
        var moveDirY = 1; //assume white move Direction
        var moveDirX = void 0;
        var opponentColor = "b";
        if (currentState[move.from.y][move.from.x] === "b") {
          moveDirY = -1;
          opponentColor = "w";
        }

        if (currentState[move.from.y + moveDirY][move.from.x - 1] === opponentColor && currentState[move.from.y + 2 * moveDirY][move.from.x - 2] === "") {
          console.log("can jump left");
          canJump = "left";
          moveDirY *= 2;
          moveDirX = -2;
        } else if (currentState[move.from.y + moveDirY][move.from.x + 1] === opponentColor && currentState[move.from.y + 2 * moveDirY][move.from.x + 2] === "") {
          console.log("can jump right");
          canJump = "right";
          moveDirY *= 2;
          moveDirX = 2;
        }
        if (canJump) {
          //make sure that the move is a diagonal jump
          if (move.from.y + moveDirY != move.to.y || move.from.x + moveDirX != move.to.x) {
            invalidMove = "Line " + (idx + 1) + " illegal move: " + moveStr + " - can jump but didn't. MoveDir=" + moveDirX + "," + moveDirY;
            return;
          }
          console.log("can jump, not invalid");
          //eat the jumped piece
          currentState[move.from.y + moveDirY / 2][move.from.x + moveDirX / 2] = "";
        } else {
          console.log("cant jump");
          //make sure the move is diagonal
          if (move.to.y != move.from.y + moveDirY || move.to.x != move.from.x - 1 && move.to.x != move.from.x + 1) {
            invalidMove = "Line " + (idx + 1) + " illegal move: " + moveStr + " - cant jump but didn't take single-square diagonal move";
            return;
          }
        }
        //we made it here so move was valid, update current state by moving piece
        currentState[move.to.y][move.to.x] = currentState[move.from.y][move.from.x];
        currentState[move.from.y][move.from.x] = "";
        _this.printBoard(currentState);
      });
      return invalidMove ? invalidMove : { valid: true, boardState: currentState };
    }
  }, {
    key: "determineWinner",
    value: function determineWinner() {
      var _this2 = this;

      var hasValidMovesLeft = this.boardState.reduce(function (acc, row, rowIdx) {
        return acc || row.reduce(function (accum, cell, colIdx) {
          return accum || _this2.hasValidMove(rowIdx, colIdx);
        }, false);
      }, false);
      console.log("has valid moves:", hasValidMovesLeft);
      var blackPieces = this.boardState.reduce(function (acc, row) {
        return acc + row.filter(function (cell) {
          return cell === "b";
        }).length;
      }, 0);
      var whitePieces = this.boardState.reduce(function (acc, row) {
        return acc + row.filter(function (cell) {
          return cell === "w";
        }).length;
      }, 0);
      if (hasValidMovesLeft && blackPieces > 0 && whitePieces > 0) {
        console.log("Game unfinished!!");
        return "game unfinished";
      }
      if (blackPieces === whitePieces) return "draw!";else if (blackPieces > whitePieces) return "black wins!";else return "white wins";
    }
  }, {
    key: "hasValidMove",
    value: function hasValidMove(row, col) {
      var color = this.boardState[row][col];
      if (color === "") return false;
      var opponentColor = color === "w" ? "b" : "w";

      var moveDirY = 1;
      if (color === "b") moveDirY = -1;
      if (this.boardState[row + moveDirY][col - 1] === opponentColor && this.boardState[row + 2 * moveDirY][col - 2] === "") {
        //can jump left
        return true;
      } else if (this.boardState[row + moveDirY][col + 1] === opponentColor && this.boardState[row + 2 * moveDirY][col + 2] === "") {
        //can jump right
        return true;
      } else if (this.boardState[row + moveDirY][col - 1] === "" || this.boardState[row + moveDirY][col + 1] === "") {
        //cant jump, but has empty cell diagonally
        return true;
      }
      return false;
    }
  }]);

  return CheckersGame;
}();

exports.default = CheckersGame;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMoveList;
function buildMoveList(moveStrList, startPlayer) {
  var moves = moveStrList.split('\n');
  var returnVal = [];
  if (!startPlayer || startPlayer === 'white') {
    moves.forEach(function (moveStr) {
      if (moveStr.length < 2) return;
      var squares = moveStr.split(',');
      returnVal.push({
        from: { x: squares[0], y: squares[1] },
        to: { x: squares[2], y: squares[3] }
      });
    });
    return returnVal;
  }
  moves.forEach(function (moveStr) {
    if (moveStr.length < 2) return;
    var squares = moveStr.split(',');
    returnVal.push({
      from: { x: 7 - squares[0], y: 7 - squares[1] },
      to: { x: 7 - squares[2], y: 7 - squares[3] }
    });
  });

  return returnVal;
}

/***/ })
/******/ ]);