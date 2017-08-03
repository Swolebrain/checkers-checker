import preLoader from './preLoader';
import CheckersGame from './CheckersGame';
import buildMoveList from './buildMoveList';

let testCases = {};
console.log("hi");

preLoader()
.then(fileContents=>{
  for (let fileName in fileContents){
    testCases[fileName] = buildMoveList(fileContents[fileName]);
  }
  console.log(testCases);
  console.log("About to start running test cases...");
  console.log("Running game: black.txt");
  let game1 = new CheckersGame(testCases["black.txt"]);
  console.log("Running game: white.txt");
  let game2 = new CheckersGame(testCases["white.txt"]);
  console.log("Running game: incomplete.txt");
  let game3 = new CheckersGame(testCases["incomplete.txt"]);
  console.log("Running game: illegal_move.txt");
  let game4 = new CheckersGame(testCases["illegal_move.txt"]);
})
.catch(err=>{
  alert(err);
  console.log(err);
});

window.onload = function(){
  let textArea = document.getElementById("textarea");
  let outputDiv = document.getElementById("output");
  document.getElementById("run").addEventListener("click", function(){
    let input = textArea.value;
    if (input.length<7) return writeOutput("Empty input");
    let game = new CheckersGame(buildMoveList(input));
    writeOutput(game.endState);
  });
  function writeOutput(str){
    outputDiv.innerText = str;
  }
}
