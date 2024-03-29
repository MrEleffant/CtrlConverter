window.onload = function () {
  chrome.storage.sync.get('status', function (data) {
    document.getElementById("status").checked = data.status
  });

  chrome.storage.sync.get('mode', function (data) {
    let mod = ''
    document.getElementById("mode").checked = data.mode
    if (!data.mode) {
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


async function getData(db) {
  const jsonFile = new Promise((resolve, reject) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', `http://${ip}:${port}/getDATA?DB=${db}`, true);
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        resolve(xmlhttp.responseText)
      else if (xmlhttp.readyState == 4 && xmlhttp.status == 0) {
        resolve('CORS request did not succeed')
        document.getElementById("submitBTN").style.background = '#ce3333'
      } else {
        document.getElementById("submitBTN").style.background = '#ce3333'
        console.log("Error loading page")
      }
    };
    xmlhttp.send();
  });
  await jsonFile.then((value) => {
    document.getElementById("submitBTN").style.background = '#259b64'
    console.log(value)
    const data = JSON.parse(value)
    chrome.storage.local.set({ db: data });
    return value
  })
  return
}

document.getElementById("status").addEventListener("change", async function () {
  chrome.storage.sync.set({ status: this.checked });
})

document.getElementById("mode").addEventListener("change", async function () {
  chrome.storage.sync.set({ mode: this.checked });
  let mod = ''
  if (!this.checked) {
    mod = 'Mode Ctrl C'
  } else {
    mod = 'Mode Auto'
  }
  document.getElementById("modeDesc").innerHTML = 'Mode d\'utilisation\n' + mod
})
