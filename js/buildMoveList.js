export default function buildMoveList(moveStrList){
  let moves = moveStrList.split('\n');
  let returnVal = [];
  moves.forEach(moveStr=>{
    if (moveStr.length < 2) return;
    let squares = moveStr.split(',');
    returnVal.push({
      from: {x: Number(squares[0]), y: Number(squares[1])},
      to: {x: Number(squares[2]), y: Number(squares[3])}
    });
  });

  return returnVal;
}
