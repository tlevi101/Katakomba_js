const game = document.querySelector("#game")
let table = document.createElement("table")
let rotateP90 = document.createElement("img")
let rotateN90 = document.createElement("img")
let OK = document.createElement("img")
let freeTile
table.id = "table"
table.cellSpacing = 0
table.id = "gameArea"
let activePlayer
let pics = {
    name: [
        "pics/TRoom.jpg",
        "pics/egyenes.jpg",
        "pics/kanyar.jpg"
    ],
    count: [
        6,
        13,
        15
    ]
}
let fixelems = {
    paths: [
        "pics/kanyar.jpg",
        "pics/TRoom.jpg",
        "pics/TRoom.jpg",
        "pics/kanyar.jpg",
        "pics/TRoom.jpg",
        "pics/TRoom.jpg",
        "pics/TRoom.jpg",
        "pics/TRoom.jpg",
        "pics/TRoom.jpg",
        "pics/TRoom.jpg",
        "pics/TRoom.jpg",
        "pics/TRoom.jpg",
        "pics/kanyar.jpg",
        "pics/TRoom.jpg",
        "pics/TRoom.jpg",
        "pics/kanyar.jpg"
    ],
    styles: [
        "rotate(0deg)",
        "rotate(0deg)",
        "rotate(0deg)",
        "rotate(90deg)",
        "rotate(270deg)",
        "rotate(270deg)",
        "rotate(0deg)",
        "rotate(90deg)",
        "rotate(270deg)",
        "rotate(180deg)",
        "rotate(90deg)",
        "rotate(90deg)",
        "rotate(270deg)",
        "rotate(180deg)",
        "rotate(180deg)",
        "rotate(180deg)",
    ]

}
function createTable() {
    let k = 0
    let l = 1
    let p = document.createElement("p")
    game.appendChild(p)
    for (let i = 0; i < 9; i++) {
        let tr = document.createElement("tr")
        for (let j = 0; j < 9; j++) {
            let tile = document.createElement("div")
            let td = document.createElement("td")
            let img = document.createElement("img")
            if (i == 0 || j == 0 || i == 8 || j == 8) {
                img.src = "pics/border.jpg"
                tile.className = "border"
                if (!isAngle(i, j) && i % 2 == 0 && j % 2 == 0) {
                    tile.className = "arrow"
                    img.src = "pics/nyíl.jpg"
                    if (l < 4)
                        img.style.transform = "rotate(0deg)"
                    else if (l > 9)
                        img.style.transform = "rotate(180deg)"
                    else {
                        if (l % 2 == 0) {
                            img.style.transform = "rotate(270deg)"
                        }
                        else
                            img.style.transform = "rotate(90deg)"

                    }
                    l++
                }
                else if (isAngle(i, j)) {
                    if (i == 0 && j == 0) { img.style.borderTopLeftRadius = "20px" }
                    else if (i == 0 && j == 8) { img.style.borderTopRightRadius = "20px" }
                    else if (i == 8 && j == 0) { img.style.borderBottomLeftRadius = "20px" }
                    else { img.style.borderBottomRightRadius = "20px" }
                }
            }
            else if (j % 2 == 1 && i % 2 == 1) {
                img.src = fixelems.paths[k]
                img.style.transform = fixelems.styles[k]
                k++
                tile.className = "fixTile"
            }
            else {
                img.src = chooseRoom()
                x = Math.floor(Math.random() * 4)
                img.style.transform = "rotate(" + x * 90 + "deg)"
                tile.className = "moveAble"
            }
            tile.appendChild(img)
            td.appendChild(tile)
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    let j = pics.count.findIndex(x => x != 0)
    freeTile = document.createElement("div")
    let img = document.createElement("img")
    img.src = pics.name[j]
    img.style.transform = "rotate(0deg)"
    freeTile.appendChild(img)
    freeTile.className = "freeTile"
    rotateP90.src = "pics/controles/rotate.png"
    rotateP90.id = "P90"
    rotateN90.src = "pics/controles/rotate.png"
    rotateN90.style.transform = "scaleX(-1)"
    rotateN90.id = "N90"
    OK.src = "pics/controles/ok.png"
    OK.id = "OK"
    game.appendChild(table)
    game.style.display = ""
    placeTreasures()
    placePawns()
    setDoors()
    main.appendChild(freeTile)
    main.appendChild(rotateN90)
    main.appendChild(rotateP90)
    main.appendChild(OK)
}
function isAngle(i, j) {
    return (i == 0 && j == 8 || i == 8 && j == 0 || i == 8 && j == 8 || i == 0 && j == 0)
}
function chooseRoom() {
    let k = [0, 1, 2]
    k = k.filter(x => pics.count[x] != 0)
    let x = Math.floor((Math.random() * k.length))
    pics.count[k[x]] = pics.count[k[x]] - 1
    return pics.name[k[x]];
}
function placePawns() {

    let countOfPlayer = 24 / count.max
    for (let i = 0; i < countOfPlayer; i++) {
        let player = document.createElement("div")
        let img = document.createElement("img")
        let pawnOnTable = document.createElement("img")
        pawnOnTable.className = "pawn"
        let p = document.createElement("p")
        let collectedTreasure = document.createElement("p")
        collectedTreasure.className = "playerp collected"
        collectedTreasure.innerText = "0/" + count.valueAsNumber
        p.innerText = "Player no. " + (i + 1)
        p.className = "playerp"
        switch (i) {
            case 0:
                img.src = "./pics/pawns/blue.png"
                pawnOnTable.src = "./pics/pawns/blue.png"
                table.rows[1].cells[1].children[0].appendChild(pawnOnTable)
                player.style.left = "1%"
                player.style.top = "1%"
                player.id = "blue"
                player.appendChild(img)
                player.appendChild(p)
                creatreTreasureCards()
                player.appendChild(collectedTreasure)
                break;
            case 1:
                img.src = "./pics/pawns/red.png"
                player.className = "inactive"
                pawnOnTable.src = "./pics/pawns/red.png"
                table.rows[1].cells[7].children[0].appendChild(pawnOnTable)
                player.style.right = "1%"
                player.style.top = "1%"
                player.id = "red"
                player.appendChild(img)
                player.appendChild(p)
                creatreTreasureCards()
                player.appendChild(collectedTreasure)
                break;
            case 2:
                img.src = "./pics/pawns/green.png"
                player.className = "inactive"
                pawnOnTable.src = "./pics/pawns/green.png"
                table.rows[7].cells[1].children[0].appendChild(pawnOnTable)
                player.style.left = "1%"
                player.style.bottom = "1%"
                player.id = "green"
                player.appendChild(collectedTreasure)
                creatreTreasureCards()
                player.appendChild(p)
                player.appendChild(img)
                break;
            case 3:
                img.src = "./pics/pawns/lightGreen.png"
                player.className = "inactive"
                pawnOnTable.src = "./pics/pawns/lightGreen.png"
                table.rows[7].cells[7].children[0].appendChild(pawnOnTable)
                player.style.right = "1%"
                player.style.bottom = "1%"
                player.id = "lightGreen"
                player.appendChild(collectedTreasure)
                creatreTreasureCards()
                player.appendChild(p)
                player.appendChild(img)
                break;
        }
        function creatreTreasureCards() {
            for (let j = 0; j < count.valueAsNumber; j++) {
                let treasurecard = document.createElement("img")
                treasurecard.src = players.treasure[i][j]
                treasurecard.style.display = "none"
                player.appendChild(treasurecard)
            }
            player.lastChild.style.display = ""
        }
        main.insertBefore(player, game)
        activePlayer = "blue"
    }
}
let players = {
    id: ["blue", "red", "green", "lightGreen"],
    startLoc: [[1, 1], [1, 7], [7, 1], [7, 7]],
    treasure: [[], [], [], []]
}
let teraseres = {
    name: [
        "pics/treasures/diamond",
        "pics/treasures/ring",
    ]
}
function placeTreasures() {
    let treasureCount = count.valueAsNumber
    let tileCoords = []
    let k = 0
    function isnotAngle(i, j) {
        return !(i == 1 && j == 1 || i == 1 && j == 7 || i == 7 && j == 7 || i == 7 && j == 1)
    }
    for (let i = 0; i < 9; i++) {
        let row = { coords: [] }
        let l = 0;
        if (i != 0 && i != 8) {
            for (let j = 0; j < 9; j++) {
                if (j != 0 && j != 8 && isnotAngle(i, j)) {
                    let coord = { coordx: i, coordy: j }
                    row.coords[l] = coord
                    l++
                }
            }
            tileCoords[k] = row
            k++
        }
    }
    let countOfPlayer = 24 / count.max
    for (let i = 0; i < countOfPlayer; i++) {
        for (let j = 0; j < treasureCount; j++) {
            let which = Math.floor(Math.random() * 4) + 1
            let from = Math.floor(Math.random() * 2)
            players.treasure[i][j] = teraseres.name[from] + which + ".png"
            let cx = Math.floor(Math.random() * tileCoords.length)
            let cy = Math.floor(Math.random() * tileCoords[cx].coords.length)
            let img = document.createElement("img")
            img.src = players.treasure[i][j]
            img.className = "treasure"
            let x = tileCoords[cx].coords[cy].coordx
            let y = tileCoords[cx].coords[cy].coordy
            tileCoords[cx].coords.splice(cy, 1)
            tileCoords = tileCoords.filter(x => x.coords.length != 0)
            table.rows[x].cells[y].children[0].appendChild(img)
        }
    }


}
function setDoor(tile) {
    for (let k = 0; k < 4; k++) {
        let deg = k * 90
        if (tile.style.transform.includes("(" + deg + "deg)")) {
            if (tile.src.includes("kanyar")) {
                switch (deg) {
                    case 0:
                        tile.className = "bot right"
                        break;
                    case 90:
                        tile.className = "bot left"
                        break;
                    case 180:
                        tile.className = "top left"
                        break;
                    case 270:
                        tile.className = "top right"
                        break;

                }
            }
            else if (tile.src.includes("egyenes")) {
                if (deg == 0 || deg == 180) {
                    tile.className = "left right"
                    break;
                }
                else {
                    tile.className = "bot top"
                    break;
                }
            }
            else {
                switch (deg) {
                    case 0:
                        tile.className = "right left bot"
                        break;
                    case 90:
                        tile.className = "top left bot"
                        break;
                    case 180:
                        tile.className = "right top left"
                        break;
                    case 270:
                        tile.className = "right top bot"
                        break;

                }
            }
        }
    }
}
function setDoors() {
    for (let i = 1; i < 8; i++) {
        for (let j = 1; j < 8; j++) {
            let tile = table.rows[i].cells[j].children[0].children[0]
            setDoor(tile)
        }
    }
}
rotateP90.addEventListener("click", function (e) {
    let deg = parseInt(freeTile.children[0].style.transform.split("(")[1].split("d")[0])
    if (deg + 90 == 360) {
        freeTile.children[0].style.transform = "rotate(0deg)"
    }
    else {
        freeTile.children[0].style.transform = "rotate(" + (deg + 90) + "deg)"
    }
})
rotateN90.addEventListener("click", function (e) {
    let deg = parseInt(freeTile.children[0].style.transform.split("(")[1].split("d")[0])
    if (deg == 0) {
        freeTile.children[0].style.transform = "rotate(270deg)"
    }
    else {
        freeTile.children[0].style.transform = "rotate(" + (deg - 90) + "deg)"
    }
})