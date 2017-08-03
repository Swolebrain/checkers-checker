import preLoader from './preLoader';
import CheckersGame from './CheckersGame';

let testCases;
console.log("hi");

preLoader()
.then(fileContents=>{
  testCases = fileContents;
})
.catch(err=>{
  alert(err);
});
