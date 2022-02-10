const db = {
    "word1": "1",
    "word2": "2",
    "word3": "3"
   }

// first way
document.onmouseup = function(e) {
    const content = window.getSelection().toString();
    if (db[content]) {
        // navigator.clipboard.writeText(db[content]); // past the db correspondance in the clipboard **https only**

        // window.prompt(db[content], db[content]); // open conversion window ctrl c enter
    }
}

// second way - acces to db from ctrl c
document.addEventListener("copy", function(e) {
    const selection = window.getSelection().toString().trimEnd().trimStart;
    if(!db[selection]) return;
    window.getSelection().empty();
    e.clipboardData.setData("text/plain", db[selection]);
    e.preventDefault();
});


let selected = null, current = null, i = 0, j =0, auto = false
document.addEventListener("keypress", function(e) {
    if(e.keyCode == 178) auto = !auto
    if(!auto) return
    switch (e.keyCode) {
        case 38: // key "&" for selection
            const selection = window.getSelection().toString().trimEnd().trimStart;
            if(!db[selection]) return;
            window.getSelection().empty();
            i=0
            j=0
            selected = db[selection].split(" ")
            current = selected[i].split("")
            break;

        case 60: case 32: // key ">" or space for change
            if(selected == null || current == null ) break
            if(i == (selected.lenght-1) && j == (current.lenght - 1)) {
                selected = null 
                current = null
                break
            } else {
                current = selected[++i]?.split("") || null
                j=0
            }
            break;
    
        default:
            e.preventDefault();
            if(selected == null || current == null || current[j] == undefined) break
            if(i == (selected.lenght-1) && j == (current.lenght - 1)) {
                selected = null 
                current = null
                break
            } else {
                document.execCommand("insertText", false, current[j]);
                j++
            }
            break;
    }
    return;
})
