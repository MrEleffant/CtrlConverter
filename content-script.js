

let db = {}

// first way
document.onmouseup = function(e) {
    return
    const content = window.getSelection().toString();
    if (db[content]) {
        // navigator.clipboard.writeText(db[content]); // past the db correspondance in the clipboard **https only**

        // window.prompt(db[content], db[content]); // open conversion window ctrl c enter
    }
}

// second way - acces to db from ctrl c
document.addEventListener("copy", async function(e) {
    await chrome.storage.sync.get('db', function(data) {
        db = data.db
    });
    console.log(db)
    const selection = window.getSelection().toString().trimEnd().trimStart();
    if(!db[selection]) return;
    window.getSelection().empty();
    e.clipboardData.setData("text/plain", db[selection]);
    e.preventDefault();
});


let selected = null, current = null, i = 0, j =0, auto = false
document.addEventListener("keypress", async function(e) {
    if(e.keyCode == 178) auto = !auto
    if(!auto) return
    switch (e.keyCode) {
        case 38: // key "&" for selection
            db = await actudb()
            const selection = window.getSelection().toString().trimEnd().trimStart();
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

async function actudb() {
    let data = {}
    try {
        await chrome.storage.sync.get('db', async function(data) {
            data = data.db
            console.log(data.db)
        });
        return data
    } catch (error) {
        console.log(error)
        return
    }
}
