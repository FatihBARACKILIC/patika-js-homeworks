import { default as menuList } from "./menuList.js"

const btnContainer = document.querySelector(".btn-container")
const sectionCenter = document.querySelector(".section-center")

const categories = menuList.reduce(
  (prev, curr) => {
    if (!prev.includes(curr.category)) prev.push(curr.category)
    return prev
  },
  ["All"]
)

categories.map((item) => {
  btnContainer.innerHTML += `<button class="btn btn-outline-dark btn-item" data-id="${item}">${item}</button>`
})

const btnList = document.querySelectorAll(".btn-item")

btnList.forEach((element) => element.addEventListener("click", handleClick))

function handleClick(e) {
  const category = e?.currentTarget?.dataset?.id ?? "All"
  const filteredMenu = menuList.reduce((prev, curr) => {
    if (curr.category === category || category === "All") prev.push(curr)
    return prev
  }, [])

  const newMenu = filteredMenu.map(
    ({ id, title, category, price, img, desc }) => {
      return `
    <div class="menu-items col-lg-6 col-sm-12">
      <img src="${img}" alt="${title}" class="photo" />
      <div class="menu-info">
        <div class="menu-title">
        <h4>${title}</h4>
        <h4>${price}</h4>
        </div>
        <div class="menu-text">${desc}</div>
      </div>
    </div>`
    }
  )

  sectionCenter.innerHTML = newMenu.join("")
}

handleClick()
