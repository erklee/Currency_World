import Example from "./scripts/test"
document.addEventListener("DOMContentLoaded", function(){
    const main = document.querySelector("#main")
    const h1 = document.createElement("h1")
    h1.innerText = "its alive"
    main.appendChild(h1)

    new Example(main)
})