let freeTilePlaced = false
let pawnHasBeenSelected = false
let selectedPawn
let freeTileMoved = false
    delegate(table, "click", "td", function (e) {
        let tile = e.target.parentElement
        if (freeTile.className == "moveAble") {
            freeTile.parentElement.children[0].style.display = ""
            freeTile.className = "freeTile"
            main.appendChild(freeTile)
            removeFreePath()
            freeTilePlaced = false
        }
        if (tile.className == "arrow" && tile.id != "locked" && !freeTileMoved) {
            removeFreePath()
            pawnHasBeenSelected = false
            let td = tile.parentElement
            let i = td.parentElement.rowIndex
            let j = td.cellIndex
            placeFreeTile(i, j)
            freeTilePlaced = true
        }
        else if (freeTileMoved && e.target.src.includes(activePlayer)) {
            selectedPawn = e.target
            pawnHasBeenSelected = true
            let i = e.target.parentElement.parentElement.parentElement.rowIndex
            let j = e.target.parentElement.parentElement.cellIndex
            paintFreePath(i, j)
        }
        else if (freeTileMoved && pawnHasBeenSelected && e.target.parentElement.children[0].style.filter != "") {
            if (hasPawnChild(e.target.parentElement)) {
                stepTo(selectedPawn, e.target.parentElement)
                for (let i = 0; i < e.target.parentElement.children.length; i++) {
                    if (tile.children[i].className == "pawn") {
                        chooseId(tile.children[i])
                    }
                }
            }
            else {
                let leavedtile = selectedPawn.parentElement
                stepTo(selectedPawn, e.target.parentElement)
                removeIdIf(leavedtile)
                removeIdIf(selectedPawn.parentElement)
            }
            freeTileMoved = false
            changeCurrPlayer()
            removeFreePath()
        }
    })
    OK.addEventListener("click", function (e) {
        if (freeTilePlaced) {
            const locked = document.getElementById("locked")
            if (locked != null) {
                locked.id = ""
            }
            let i = freeTile.parentElement.parentElement.rowIndex
            let j = freeTile.parentElement.cellIndex
            setDoor(freeTile.children[0])
            move(freeTile, i, j, i, j)
            freeTilePlaced = false
            freeTileMoved = true
        }
        else if (freeTileMoved) {
            freeTileMoved = false
            changeCurrPlayer()
            removeFreePath()
        }
    })
function placeFreeTile(i, j) {
    if (i == 0 || i == 8 || j == 0 || j == 8) {
        table.rows[i].cells[j].children[0].style.display = "none"
        freeTile.className = "moveAble"
        table.rows[i].cells[j].appendChild(freeTile)
    }

}
function changeCurrPlayer() {
    let countOfPlayer = 24 / count.max
    let nextPlayer = ""
    if (countOfPlayer != 1) {
        for (let i = 0; i < countOfPlayer; i++) {
            if (players.id[i] == activePlayer) {
                const currplayercard = document.getElementById(activePlayer)
                if (i == countOfPlayer - 1) {
                    nextPlayer = "blue"
                    const nextplayercard = document.getElementById(nextPlayer)
                    nextplayercard.className = ""
                }
                else {
                    nextPlayer = players.id[i + 1]
                    const nextplayercard = document.getElementById(nextPlayer)
                    nextplayercard.className = ""
                }
                currplayercard.className = "inactive"
            }
        }
        activePlayer = nextPlayer
    }
}
function move(tile, i, j, startI, startJ) {
    if (i >= 0 && i <= 8 && j >= 0 && j <= 8) {
        if (startI == 0 || startI == 8) {
            if (i == startI) {
                table.rows[i].cells[j].children[0].style.display = ""
                table.rows[i].cells[j].removeChild(table.rows[i].cells[j].children[1])

            }
            if (startI == 0) {
                i++;
            }
            else {
                i--
            }
            if (i >= 0 && i <= 8) {
                if (startI == 0 && i == 8 || startI == 8 && i == 0) {
                    table.rows[i].cells[j].children[0].id = "locked"
                    console.log(tile)
                    if (hasPawnChild(tile)) {
                        movePawn(tile, startI, startJ)
                        movePawn(tile, startI, startJ)
                        movePawn(tile, startI, startJ)
                    }
                    tile.className = "freeTile"
                    freeTile = tile
                    main.appendChild(freeTile)
                }
                else {
                    let next = table.rows[i].cells[j].children[0]
                    table.rows[i].cells[j].removeChild(table.rows[i].cells[j].children[0])
                    table.rows[i].cells[j].appendChild(tile)
                    move(next, i, j, startI, startJ)
                }
            }
        }
        else if (startJ == 0 || startJ == 8) {
            if (j == startJ) {
                table.rows[i].cells[j].children[0].style.display = ""
                table.rows[i].cells[j].removeChild(table.rows[i].cells[j].children[1])
            }
            if (startJ == 0) {
                j++;
            }
            else {
                j--
            }
            if (j >= 0 && j <= 8) {
                if (startJ == 0 && j == 8 || startJ == 8 && j == 0) {
                    table.rows[i].cells[j].children[0].id = "locked"
                    if (hasPawnChild(tile)) {
                        console.log(tile)
                        movePawn(tile, startI, startJ)
                        movePawn(tile, startI, startJ)
                        movePawn(tile, startI, startJ)

                    }
                    tile.className = "freeTile"
                    freeTile = tile
                    main.appendChild(freeTile)
                }
                else {
                    let next = table.rows[i].cells[j].children[0]
                    table.rows[i].cells[j].removeChild(table.rows[i].cells[j].children[0])
                    table.rows[i].cells[j].appendChild(tile)
                    move(next, i, j, startI, startJ)
                }
            }
        }
    }
}
function hasPawnChild(tile) {

    for (let i = 0; i < tile.children.length; i++) {
        if (tile.children[i].className == "pawn") {
            return true
        }
    }
    return false
}
function movePawn(tile, startI, startJ) {
    if (startI == 0) {
        startI++
    }
    else if (startI == 8) {
        startI--
    }
    else if (startJ == 0) {
        startJ++
    }
    else if (startJ == 8) {
        startJ--
    }
    for (let i = 0; i < tile.children.length; i++) {
        if (tile.children[i].className == "pawn") {
            table.rows[startI].cells[startJ].children[0].appendChild(tile.children[i])
            if (hasTreasure(table.rows[startI].cells[startJ].children[0])) {
                collectTreasue(table.rows[startI].cells[startJ].children[0], activePlayer)
            }
            if (hasTreasure(table.rows[startI].cells[startJ].children[0])) {
                for (let i = 0; i < 4; i++) {
                    collectTreasue(tile, players.id[i])
                }
            }
        }
    }
}
function chooseId(pawn) {
    if (pawn.src.includes("blue")) {
        pawn.id = "pawnBlue"
    }
    else if (pawn.src.includes("red")) {
        pawn.id = "pawnRed"
    }
    else if (pawn.src.includes("lightGreen")) {
        pawn.id = "pawnLightGreen"
    }
    else {
        pawn.id = "pawnGreen"
    }
}
function removeIdIf(tile) {
    let countP = 0
    for (let i = 0; i < tile.children.length; i++) {
        if (tile.children[i].className == "pawn") {
            countP++
        }
    }
    if (countP == 1) {
        for (let i = 0; i < tile.children.length; i++) {
            if (tile.children[i].className == "pawn") {
                tile.children[i].id = ""
            }
        }
    }
}
function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector)
        if (this.contains(targetElement)) handler.call(targetElement, event)
    })
}