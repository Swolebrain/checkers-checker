import preLoader from './preLoader';
import CheckersGame from './CheckersGame';
import buildMoveList from './buildMoveList';

let testCases = {};
console.log("hi");

preLoader()
.then(fileContents=>{
  for (let fileName in fileContents){
    testCases[fileName] = buildMoveList(fileContents[fileName], "black");
  }
  console.log(testCases);
  let game1 = new CheckersGame(testCases["black.txt"]);
})
.catch(err=>{
  alert(err);
  console.log(err);
});
