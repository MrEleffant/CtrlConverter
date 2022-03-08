document.getElementById("submitBTN").addEventListener("click", getDB);

function getDB() {
  const dbCode = document.getElementById("login__password").value
  console.log(dbCode)
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
        chrome.storage.sync.set({ db: JSON.parse(value) });
      return value
    })
    return
  }
