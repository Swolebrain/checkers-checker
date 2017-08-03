export default function buildMoveList(moveStrList, startPlayer){
  let moves = moveStrList.split('\n');
  let returnVal = [];
  // if (!startPlayer || startPlayer === 'white'){
  //   moves.forEach(moveStr=>{
  //     if (moveStr.length < 2) return;
  //     let squares = moveStr.split(',');
  //     returnVal.push({
  //       from: {x: squares[0], y: squares[1]},
  //       to: {x: squares[2], y: squares[3]}
  //     });
  //   });
  //   return returnVal;
  // }
  // moves.forEach(moveStr=>{
  //   if (moveStr.length < 2) return;
  //   let squares = moveStr.split(',');
  //   returnVal.push({
  //     from: {x: 7-squares[0], y: 7-squares[1]},
  //     to: {x: 7-squares[2], y: 7-squares[3]}
  //   });
  // });
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
