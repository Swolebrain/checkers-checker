import preLoader from './preLoader';
import CheckersGame from './CheckersGame';

let testCases;

preloader()
.then(fileContents=>{
  testCases = fileContents;
})
.catch(err=>{
  alert(err);
});
