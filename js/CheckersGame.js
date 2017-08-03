export default class CheckersGame{
  constructor(movesList){
    this.movesList = movesList;
    this.boardState = this.initializeBoard();
    this.startingPiece = this.boardState[movesList[0].from.y][movesList[0].from.x];
    if (this.startingPiece!="b" && this.startingPiece!="w") throw "Illegal starting piece";

    let endState = this.validateMoves();
    if (endState.valid){
      this.boardState = endState.boardState;
      this.endState = this.determineWinner();
      console.log(this.endState);
    }
    else{
      console.log(this.endState);
    }
  }
  initializeBoard(){
    let state = new Array(8).fill("").map(cell=>new Array(8).fill("").map((e,i)=>""));
    let oneIndexed = [0,2,6];
    let zeroIndexed = [1,5,7];
    state.forEach((row,rowIdx)=>{
      let pieceColor = "w";
      if (rowIdx > 3) pieceColor = "b";
      //if it's an even column, fill it with adequate color
      if (zeroIndexed.indexOf(rowIdx) >= 0)
        state[rowIdx] = state[rowIdx].map((cell,idx) => idx%2===0 ? pieceColor : "");
      else if (oneIndexed.indexOf(rowIdx) >= 0)
        state[rowIdx] = state[rowIdx].map((cell,idx) => idx%2===1 ? pieceColor : "");
    });
    state = JSON.parse(JSON.stringify(state));
    // this.printBoard(state);
    // console.log("initialized.");
    return state;
  }
  printBoard(board){
    let print;
    if (board) print = JSON.parse(JSON.stringify(board));
    else print = JSON.parse(JSON.stringify(this.boardState));

    console.log(print.reverse());
  }
  validateMoves(){
    //deep clone board state:
    let currentState = JSON.parse(JSON.stringify(this.boardState));
    // console.log("currentState");
    // this.printBoard();
    let invalidMove = null;
    this.movesList.forEach((move, idx)=>{
      let moveStr = `${move.from.x},${move.from.y}->${move.to.x},${move.to.y}`;
      if (invalidMove) return; //bias towards first invalid move
      // console.log(moveStr);
      if (move.from.x < 0 || move.from.x > 7) invalidMove = `Line ${idx+1} illegal move: ${moveStr} - bad starting x coord`;
      if (move.from.y < 0 || move.from.y > 7) invalidMove = `Line ${idx+1} illegal move: ${moveStr} - bad starting y coord`;
      if (move.to.x < 0 || move.to.x > 7) invalidMove = `Line ${idx+1} illegal move: ${moveStr} - bad ending x coord`;
      if (move.to.y < 0 || move.to.y > 7) invalidMove = `Line ${idx+1} illegal move: ${moveStr} - bad ending y coord`;

      if (currentState[move.from.y][move.from.x] === "")
        invalidMove = `Line ${idx+1} illegal move: ${moveStr} - starting coords empty`;
      if (currentState[move.to.y][move.to.x] !== "")
        invalidMove = `Line ${idx+1} illegal move: ${moveStr} - ending coords not empty`;

      if (invalidMove) return; //don't check anything else if we found an invalid move this turn

      //two main cases: can jump or not. May jump left or right. We choose left bias if it can jump both ways
      let canJump = false;
      let moveDirY = 1; //assume white move Direction
      let moveDirX;
      let opponentColor = "b";
      if (currentState[move.from.y][move.from.x] === "b"){
         moveDirY = -1;
         opponentColor = "w";
      }

      if (currentState[move.from.y+2*moveDirY] &&
            currentState[move.from.y+moveDirY][move.from.x-1] === opponentColor &&
            currentState[move.from.y+2*moveDirY][move.from.x-2] === ""){
        // console.log("can jump left");
        canJump = "left";
        moveDirY *= 2;
        moveDirX = -2;
      }
      else if (currentState[move.from.y+2*moveDirY] &&
            currentState[move.from.y+moveDirY][move.from.x+1] === opponentColor &&
            currentState[move.from.y+2*moveDirY][move.from.x+2] === ""){
        // console.log("can jump right");
        canJump = "right";
        moveDirY *= 2;
        moveDirX = 2
      }
      if (canJump){
        //make sure that the move is a diagonal jump
        if (move.from.y+moveDirY != move.to.y || move.from.x+moveDirX != move.to.x){
          invalidMove = `Line ${idx+1} illegal move: ${moveStr} - can jump but didn't. MoveDir=${moveDirX},${moveDirY}`;
          return;
        }
        // console.log("can jump, not invalid");
        //eat the jumped piece
        currentState[move.from.y+moveDirY/2][move.from.x+moveDirX/2] = "";
      }
      else {
        // console.log("cant jump");
        //make sure the move is diagonal
        if ( move.to.y != move.from.y+moveDirY  || (move.to.x != move.from.x-1 && move.to.x != move.from.x+1) ){
          console.log(move.from.y+moveDirY, move.from.x-1 , move.from.x+1);
          invalidMove = `Line ${idx+1} illegal move: ${moveStr} - cant jump but didn't take single-square diagonal move`;
          return;
        }
      }
      //we made it here so move was valid, update current state by moving piece
      currentState[move.to.y][move.to.x] = currentState[move.from.y][move.from.x];
      currentState[move.from.y][move.from.x] = "";
      // this.printBoard(currentState);
    });
    return invalidMove ? invalidMove : {valid: true, boardState:currentState};
  }
  determineWinner(){
    let hasValidMovesLeft = this.boardState.reduce((acc,row,rowIdx)=>
        acc ||
            row.reduce((accum,cell,colIdx)=>accum||this.hasValidMove(rowIdx,colIdx),false)
        ,false);
    // console.log("has valid moves:", hasValidMovesLeft);
    let blackPieces = this.boardState.reduce((acc,row)=>acc+row.filter(cell=>cell==="b").length,0);
    let whitePieces = this.boardState.reduce((acc,row)=>acc+row.filter(cell=>cell==="w").length,0);
    if (hasValidMovesLeft && blackPieces > 0 && whitePieces > 0){
      return "incomplete game";
    }

    if (blackPieces===whitePieces) return "draw!";
    else if (blackPieces > whitePieces) return this.startingPiece==="b" ? "first" : "second";
    else return this.startingPiece==="w" ? "first" : "second";
  }
  hasValidMove(row, col){
    let color = this.boardState[row][col];
    if (color==="") return false;
    if (color==="w" && row === 7) return false;
    if (color==="b" && row === 0) return false;
    let opponentColor = color==="w" ? "b" : "w";

    let moveDirY = 1;
    if (color==="b") moveDirY = -1;
    if (this.boardState[row+moveDirY][col-1]===opponentColor && this.boardState[row+2*moveDirY][col-2]===""){
      //can jump left
      return true;
    }
    else if (this.boardState[row+moveDirY][col+1]===opponentColor && this.boardState[row+2*moveDirY][col+2]===""){
      //can jump right
      return true;
    }
    else if (this.boardState[row+moveDirY][col-1]==="" || this.boardState[row+moveDirY][col+1]===""){
      //cant jump, but has empty cell diagonally
      return true;
    }
    return false;
  }
}
