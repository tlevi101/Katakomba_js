function paintFreePath(i, j) {
    if (i >= 1 && i <= 7 && j >= 1 && j <= 7) {
        let tile0 = table.rows[i].cells[j].children[0].children[0]
        let tile2 = table.rows[i].cells[j + 1].children[0].children[0]
        if (isConnectedTo(tile0, tile2) && !(tile0.style.filter != "" && tile2.style.filter != "")) {
            tile0.style.filter = "hue-rotate(32deg)"
            tile2.style.filter = "hue-rotate(32deg)"
            paintFreePath(i, j + 1)
        }
        let tile3 = table.rows[i].cells[j - 1].children[0].children[0]
        if (isConnectedTo(tile0, tile3) && !(tile0.style.filter != "" && tile3.style.filter != "")) {
            tile0.style.filter = "hue-rotate(32deg)"
            tile3.style.filter = "hue-rotate(32deg)"
            paintFreePath(i, j - 1)
        }
        let tile4 = table.rows[i + 1].cells[j].children[0].children[0]
        if (isConnectedTo(tile0, tile4) && !(tile0.style.filter != "" && tile4.style.filter != "")) {
            tile0.style.filter = "hue-rotate(32deg)"
            tile4.style.filter = "hue-rotate(32deg)"
            paintFreePath(i + 1, j)
        }
        let tile5 = table.rows[i - 1].cells[j].children[0].children[0]
        if (isConnectedTo(tile0, tile5) && !(tile0.style.filter != "" && tile5.style.filter != "")) {
            tile0.style.filter = "hue-rotate(32deg)"
            tile5.style.filter = "hue-rotate(32deg)"
            paintFreePath(i - 1, j)
        }

    }
    return
}
function isConnectedTo(tile0, tile1) {
    let i0 = tile0.parentElement.parentElement.parentElement.rowIndex
    let j0 = tile0.parentElement.parentElement.cellIndex
    let i1 = tile1.parentElement.parentElement.parentElement.rowIndex
    let j1 = tile1.parentElement.parentElement.cellIndex
    if (i0 == i1) {
        if (j0 < j1) {
            return tile0.className.includes("right") && tile1.className.includes("left")
        }
        else if (j0 > j1) {
            return tile1.className.includes("right") && tile0.className.includes("left")
        }
    }
    else if (j0 == j1) {
        if (i0 < i1) {
            return tile0.className.includes("bot") && tile1.className.includes("top")
        }
        else if (i0 > i1) {
            return tile1.className.includes("bot") && tile0.className.includes("top")
        }
    }
    return false
}
function removeFreePath() {
    for (let i = 1; i < 8; i++) {
        for (let j = 1; j < 8; j++) {
            table.rows[i].cells[j].children[0].children[0].style.filter = ""
        }
    }
}
function stepTo(pawn, tile) {
    pawn.parentElement.removeChild(pawn)
    tile.appendChild(pawn)
    if (hasTreasure(tile)) {
        collectTreasue(tile, activePlayer)
    }
    if(gameIsEnd(pawn,activePlayer)){
        whenGameIsEnd()
    }
}
function hasTreasure(tile) {
    for (let i = 0; i < tile.children.length; i++) {
        if (tile.children[i].className == "treasure") {
            return true
        }
    }
    return false
}
function collectTreasue(tile, player) {
    for (let i = 0; i < tile.children.length; i++) {
        if (tile.children[i].className == "treasure") {
            if (thisIsMine(player, tile.children[i].src)) {
                changeTreasureOnCard(player, tile.children[i].src)
                tile.removeChild(tile.children[i])
            }
        }
    }
}
function thisIsMine(player, treasure) {
    const card = document.getElementById(player)
    for (let i = 0; i < card.children.length; i++) {
        if(card.children[i].src==treasure&&card.children[i].style.display!="none"){
            return true
        }
    }
    return false
}
function changeTreasureOnCard(player, treasure) {
    const card = document.getElementById(player)
    let collected
    for (let i = 0; i < card.children.length; i++) {
        if (card.children[i].className == "playerp collected") {
            collected = card.children[i]
        }
    }
    for (let i = 0; i < card.children.length; i++) {
        if (card.children[i].src == treasure) {
            let countCollected = parseInt(collected.innerText.split("/")[0])
            if (countCollected != count.valueAsNumber - 1) {
                card.children[i - 1].style.display = ""
            }
            countCollected++
            console.log(collected)
            collected.innerText=countCollected+"/"+count.value
            card.children[i].style.display = "none"
            return
        }
    }
}