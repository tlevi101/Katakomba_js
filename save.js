const savebut = document.getElementById("save")
const nameof = document.getElementById("name_of_save")
const savedgames = document.getElementById("saved")
let now = new Date()
nameof.value = now.getFullYear() + "." + (now.getMonth() + 1) + "." + now.getDate() + " " + now.getHours() + ":" + now.getMinutes()
setInterval(function () {
    let now = new Date()
    nameof.value = now.getFullYear() + "." + (now.getMonth() + 1) + "." + now.getDate() + " " + now.getHours() + ":" + now.getMinutes()
}, 60000)

let playedGame
let playerTreasures
savebut.addEventListener("click", function () {
    playedGame = main.innerHTML
    playerTreasures = players.treasure
    let currPlayer = activePlayer
    let _freeTileMoved = freeTileMoved
    let save = {
        _main: playedGame,
        treasures: playerTreasures,
        _activePlayer: currPlayer,
        __freeTileMoved: _freeTileMoved
    }
    console.log(save)
    let name = nameof.value
    localStorage.setItem(name, JSON.stringify(save))
})
if (localStorage.length == 0) {
    savedgames.style.display = "none"
}
else {
    writeSaves()
}
function writeSaves() {
    for (let i = 0; i < localStorage.length; i++) {
        let p = document.createElement("p")
        p.className = "savedGame"
        let load = document.createElement("button")
        load.id = localStorage.key(i).split("_")[0]
        load.innerText = "Betöltés"
        load.className = "loadit"
        p.innerText = localStorage.key(i).split("_")[0]
        load.addEventListener("click", function (e) {
            let obj = JSON.parse(localStorage.getItem(e.target.id))
            main.innerHTML = obj._main
            players.treasure = obj.treasures
            freeTileMoved = obj.__freeTileMoved
            activePlayer = obj._activePlayer
            savedgames.style.display = "none"
        })
        savedgames.appendChild(p)
        savedgames.appendChild(load)
    }
}