const main = document.querySelector("main")
const home = document.querySelector("#home")
const controls = document.querySelector("tbody")
const count = document.querySelector("#treasurecount")
const but=document.querySelector("button")
const help=document.getElementById("helps")
const sugo=document.getElementById("help")
game.style.display="none"
delegate(controls, "click", "td", function (e) {
    if (e.target.type == "radio") {
        count.max = Math.floor(24 / e.target.value)
    }
})
count.addEventListener("keydown", function (ev) {
            ev.preventDefault();
})
but.addEventListener("click",function(e){
    home.style.display="none"
    createTable()
    savedgames.style.display="none"
    //move(freeTile,0,2,0,2)
    //placeFreeTile(0,2)
})
function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector)
        if (this.contains(targetElement)) handler.call(targetElement, event)
    })
}
help.style.display="none"
sugo.addEventListener(("click"), function(){
    help.style.display=""
})
const exit=document.getElementById("exithelp")
exit.addEventListener(("click"), function(){
    help.style.display="none"
})