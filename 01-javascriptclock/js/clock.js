const myClock = document.querySelector("#myClock")
const myName = document.querySelector("#myName")

let userName = prompt("Adınızı girin:", "")
if (!userName) userName = "Tanımsız"
myName.innerText = userName

setInterval(() => {
  const date = new Date()
  myClock.innerText = date.toLocaleString("tr-TR", {
    dateStyle: "full",
    timeStyle: "medium",
  })
}, 1000)
