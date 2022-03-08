window.onload = function() {
  chrome.storage.sync.get('status', function(data) {
    document.getElementById("status").checked = data.status
  });
  
  chrome.storage.sync.get('mode', function(data) {
    let mod = ''
    document.getElementById("mode").checked = data.mode
    if(!data.mode) {
      mod = 'Mode Ctrl C'
    } else {
      mod = 'Mode Auto'
    }
    document.getElementById("modeDesc").innerHTML = 'Mode d\'utilisation\n' + mod
  });
}

document.getElementById("submitBTN").addEventListener("click", getDB);

function getDB() {
  const dbCode = document.getElementById("login__password").value
  getData(dbCode)
}

const ip = "109.24.223.27"
async function getData(db) {
    const jsonFile = new Promise((resolve, reject) => {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('GET', `http://${ip}:4000/getDATA?DB=${db}`, true);
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
          resolve(xmlhttp.responseText)
        else if (xmlhttp.readyState == 4 && xmlhttp.status == 0) {
          resolve('CORS request did not succeed')
        } else
          console.log("Error loading page")
      };
      xmlhttp.send();
    });
    await jsonFile.then((value) => {
        document.getElementById("submitBTN").style.background='#259b64'
        chrome.storage.sync.set({ db: JSON.parse(value) });
      return value
    })
    return
  }

  document.getElementById("status").addEventListener("change", async function() {
    chrome.storage.sync.set({ status: this.checked });
  })

  document.getElementById("mode").addEventListener("change", async function() {
    chrome.storage.sync.set({ mode: this.checked });
    let mod = ''
    if(!this.checked) {
      mod = 'Mode Ctrl C'
    } else {
      mod = 'Mode Auto'
    }
    document.getElementById("modeDesc").innerHTML = 'Mode d\'utilisation\n' + mod
  })
  