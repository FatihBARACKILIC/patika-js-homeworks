const myClock = document.querySelector("#myClock")
const myName = document.querySelector("#myName")

let userName = prompt("Adınızı girin:", "")
!userName && (userName = "Tanımsız")
myName.innerText = userName

const days = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
]

setInterval(() => {
  const date = new Date()
  myClock.innerText = `${date.toLocaleTimeString()} ${days[date.getDay()]}`
}, 1000)
