const db = {
    "word1": "1",
    "word2": "2",
    "word3": "3"
}


// first way
document.onmouseup = function(e) {
    const content = window.getSelection().toString();
    if (db[content]) {
        // navigator.clipboard.writeText(db[content]) // past the db correspondance in the clipboard **https only**

        // window.prompt(db[content], db[content]) // open conversion window ctrl c enter
        
    }
}

// second way - acces to db from ctrl c
document.addEventListener('copy', function(e) {
    if(!db[window.getSelection().toString()]) return
    e.clipboardData.setData('text/plain', db[window.getSelection().toString()]);
    e.preventDefault();
  });
