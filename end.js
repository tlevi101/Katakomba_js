const end = document.querySelector("#end")
end.style.display = "none"
let winnerPlayer
function gameIsEnd(pawn, player) {
    let i = pawn.parentElement.parentElement.parentElement.rowIndex
    let j = pawn.parentElement.parentElement.cellIndex

    for (let k = 0; k < 4; k++) {
        if (players.id[k] == player && players.startLoc[k][0] == i && players.startLoc[k][1] &&
            collectedEveryThing(player)) {
                winnerPlayer=player
                return true
        }
    }
}
function collectedEveryThing(player) {
    const card = document.getElementById(player)
    for (let i = 0; i < card.children.length; i++) {
        if(card.children[i].className=="playerp collected"){
            return card.children[i].innerText.split("/")[0] ==card.children[i].innerText.split("/")[1]
        }
    }
}   
function whenGameIsEnd(){
    let p
    if(winnerPlayer=="blue"){
        p="kék"
    }
    else if(winnerPlayer=="red"){
        p="piros"
    }
    else if(winnerPlayer=="green"){
        p="zöld"
    }
    else{
        p="világos zöld"
    }
    end.children[0].innerText="A győztes a "+ p+ "játékos!"
    end.children[1].addEventListener("click",function(){
        location.reload()
    })
    end.style.display=""
}