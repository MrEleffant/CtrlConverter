
document.addEventListener("copy", function(e) {
    chrome.storage.sync.get('status', function(data) { 
        if(!data.status) return
        chrome.storage.sync.get('mode', function(data) { 
            if (data.mode) return
            e.preventDefault();
           chrome.storage.local.get('db', function(data) { 
               console.log(data)
               const selection = window.getSelection().toString().trimEnd().trimStart();
               if(!data.db[selection]) return;
               navigator.clipboard.writeText(data.db[selection])
               window.getSelection().empty();
            })
        })
    })

    return
});


let selected = null, current = null, i = 0, j =0
document.addEventListener("keypress", function(e) {
    chrome.storage.sync.get('status', function(data) { 
        if(!data.status) return
        chrome.storage.sync.get('mode', function(data) { 
           if (!data.mode) return
           e.preventDefault()
           chrome.storage.local.get('db', function(data) { 
                let db = data.db
                switch (e.keyCode) {
                    case 38: // key "&" for selection
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
            })
        })
    })
    return;
})
