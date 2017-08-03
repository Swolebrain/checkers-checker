export default function(){
  return new Promise((resolve, reject)=>{
    let files = [
      'black.txt',
      'incomplete.txt',
      'white.txt',
      'illegal_move.txt'
    ];
    let fileContents = {};
    let numResolved = 0;
    files.forEach(fileName=>{
      fetch(fileName)
      .then(res=>{
        if (res.status != 200) throw "Failed preloading "+fileName;
        return res.text();
      })
      .then(fileContent=>{
        console.log("Loaded:", fileContent);
        fileContents[fileName] = fileContent;
        //if this is the last file, resolve promise
        if (++numResolved === files.length){
          resolve(fileContents);
        }
      })
      .catch(err=>{
        reject(err);
      });
    })
  });
}
