const buttonSetBoardSize = document.getElementById("setBoardSize")
const buttonPlaceHovers = document.getElementById("placeHovers")
const buttonMoveHovers = document.getElementById("moveHovers")
const message = document.getElementById("msgArea")

const rows = document.getElementById("boardRows")
const columns = document.getElementById("boardColumns")
class Game {
    constructor(){
    }

    drawArea(){
        for (let i = this.matrix.length-1; i >= 0 ; i--) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                let newSquare = document.createElement("div")
                newSquare.setAttribute("id", `${i}+${j}`)
                newSquare.setAttribute("class", "square") 
                
                document.getElementById("board").appendChild(newSquare)
                newSquare.innerHTML = `${i}, ${j}`  
            };
            document.getElementById("board").innerHTML += "<br>"
        }
    }

    setGridSize(row, column){
        let matrixLength = new Array()
        let matrixcolumn = new Array()
        
        for (let j = 0; j < column; j++) {
            matrixcolumn.push(0)
        }
    
        for (let i = 0; i < row; i++) {
            matrixLength.push(matrixcolumn)
        }

        this.matrix = matrixLength
    }

    setFirstHover(row, column, direction){
        const div = document.createElement("div")
        const hoverPos = document.getElementById(`${row}+${column}`)

        this.firstHover = {
            row:  row,
            column: column,
            facing: direction
        }

        if(direction == 'N'){
            
            div.setAttribute("class", "arrow-up")  
        }else if(direction == 'S'){
            div.setAttribute("class", "arrow-down")  
        }else if (direction == 'W'){
            div.setAttribute("class", "arrow-left")  
        }else{
            div.setAttribute("class", "arrow-right")  
        }
        
        hoverPos.style.backgroundColor = 'green'
        hoverPos.innerHTML = "H1"
        hoverPos.appendChild(div)


    }

    setSecondHover(row, column, direction){
        const div = document.createElement("div")
        const hoverPos = document.getElementById(`${row}+${column}`)

        this.secondHover = {
            row:  row,
            column: column,
            facing: direction
        }

        if(direction == 'N'){
            div.setAttribute("class", "arrow-up")  
        }else if(direction == 'S'){
            div.setAttribute("class", "arrow-down")  
        }else if (direction == 'W'){
            div.setAttribute("class", "arrow-left")  
        }else{
            div.setAttribute("class", "arrow-right")  
        }
        
        hoverPos.style.backgroundColor = 'green'
        hoverPos.innerHTML = "H2"
        hoverPos.appendChild(div)
    }

    moveHoverOne(moveSet, rows, columns){
        document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).style.backgroundColor = "lightgreen"
        let err
        const div1 = document.createElement("div")
        const div = document.getElementById("resultHoverOne")
        let cordinates = [`HOVER ONE MOVE LOG:   R:${this.firstHover.row}-C:${this.firstHover.column}-F:${this.firstHover.facing}   `]
        for (let i = 0; i < moveSet.length; i++) {
            if(moveSet[i] == 'M'){
                if(this.firstHover.facing == 'N'){
                    if(this.firstHover.row+1 <= rows){
                        this.firstHover.row += 1
                        document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).style.backgroundColor = "lightgreen"
                        err = false
                    }else{
                        cordinates.push(`Hover got out of range! LastKnownPos: ${this.firstHover.row}, ${this.firstHover.column}`)
                        div.innerHTML = cordinates
                        document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).style.backgroundColor = "red"
                        document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).innerHTML = "H1?"
                        err = true
                        break;  
                    }
                }else if(this.firstHover.facing == 'S'){
                    if(this.firstHover.row - 1 >= 0 ){
                        this.firstHover.row -= 1
                        document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).style.backgroundColor = "lightgreen"
                        err = false
                    }else{
                        cordinates.push(`   Hover got out of range! LastKnownPos: ${this.firstHover.row}, ${this.firstHover.column}`)
                        div.innerHTML = cordinates
                        document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).style.backgroundColor = "red"
                        document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).innerHTML = "H1?"
                        err = true
                        break;
                    }
                }else if(this.firstHover.facing == 'W'){
                    if(this.firstHover.column - 1 >= 0 ){
                        this.firstHover.column -= 1
                        document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).style.backgroundColor = "lightgreen"
                        err = false
                    }else{
                        cordinates.push(`Hover got out of range! LastKnownPos: ${this.firstHover.row}, ${this.firstHover.column}`)
                        div.innerHTML = cordinates
                        document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).style.backgroundColor = "red"
                        document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).innerHTML = "H1?"
                        err = true
                        break;
                    }
                }else{
                    if(this.firstHover.column + 1 <= columns ){
                        this.firstHover.column += 1
                        document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).style.backgroundColor = "lightgreen"
                        err = false
                    }else{
                        cordinates.push(`   Hover got out of range! LastKnownPos: ${this.firstHover.row}, ${this.firstHover.column}`)
                        div.innerHTML = cordinates
                        document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).style.backgroundColor = "red"
                        document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).innerHTML = "H1?"
                        err = true
                        break;
                    }
                }
                
            }else if(moveSet[i] == 'L'){
                if(this.firstHover.facing == 'N'){
                    this.firstHover.facing = 'W'
                }else if(this.firstHover.facing == 'S'){
                    this.firstHover.facing = 'E'
                }else if(this.firstHover.facing == 'W'){
                    this.firstHover.facing = 'S'
                }else{
                    this.firstHover.facing = 'N'
                }
            }else{
                if(this.firstHover.facing == 'N'){
                    this.firstHover.facing = 'E'
                }else if(this.firstHover.facing == 'S'){
                    this.firstHover.facing = 'W'
                }else if(this.firstHover.facing == 'W'){
                    this.firstHover.facing = 'N'
                }else{
                    this.firstHover.facing = 'S'
                }
            }
            
            document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).style.backgroundColor = "lightgreen"
            if(document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).innerHTML == 'H2'){
                document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).innerHTML += 'H2H1'
            } else{
                document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`).innerHTML = 'H1'
            }
            cordinates.push(`   R:${this.firstHover.row}-C:${this.firstHover.column}-F:${this.firstHover.facing}   `)
            
        }

        if(!err){
            
            div.innerHTML = cordinates
            const finalPos = document.getElementById(`${this.firstHover.row}+${this.firstHover.column}`)
            if(finalPos.innerHTML[0] == 'H' && finalPos.innerHTML[1] == '2'){
                finalPos.innerHTML = "!!!"
                finalPos.style.backgroundColor = "red"
                cordinates.push(`Hovers crashed at: ${this.firstHover.row}+${this.firstHover.column}`)
            } else{

                if(this.firstHover.facing == 'N'){
                    div1.setAttribute("class", "arrow-up")  
                }else if(this.firstHover.facing == 'S'){
                    div1.setAttribute("class", "arrow-down")  
                }else if (this.firstHover.facing == 'W'){
                    div1.setAttribute("class", "arrow-left")  
                }else{
                    div1.setAttribute("class", "arrow-right")  
                }
                finalPos.innerHTML = 'H1'
                finalPos.appendChild(div1)
            }
            
            finalPos.style.backgroundColor = 'green'
        }
    }


    moveHoverTwo(moveSet, rows, columns ){
        document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).style.backgroundColor = "lightgreen"
        let err
        const div1 = document.createElement("div")
        const div = document.getElementById("resultHoverTwo")
        let cordinates = [`HOVER TWO MOVE LOG:   R:${this.secondHover.row}-C:${this.secondHover.column}-F:${this.secondHover.facing}   `]
        for (let i = 0; i < moveSet.length; i++) {
            if(moveSet[i] == 'M'){
                if(this.secondHover.facing == 'N'){
                    if(this.secondHover.row+1 <= rows){
                        this.secondHover.row += 1
                        document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).style.backgroundColor = "lightgreen"
                        err = false
                    }else{
                        cordinates.push(`Hover got out of range! LastKnownPos: ${this.secondHover.row}, ${this.secondHover.column}`)
                        div.innerHTML = cordinates
                        document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).style.backgroundColor = "red"
                        document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).innerHTML = "H2?"
                        err = true
                        break;  
                    }
                }else if(this.secondHover.facing == 'S'){
                    if(this.secondHover.row - 1 >= 0 ){
                        this.secondHover.row -= 1
                        document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).style.backgroundColor = "lightgreen"
                        err = false
                    }else{
                        cordinates.push(`   Hover got out of range! LastKnownPos: ${this.secondHover.row}, ${this.secondHover.column}`)
                        div.innerHTML = cordinates
                        document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).style.backgroundColor = "red"
                        document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).innerHTML = "H2?"
                        err = true
                        break;
                    }
                }else if(this.secondHover.facing == 'W'){
                    if(this.secondHover.column - 1 >= 0 ){
                        this.secondHover.column -= 1
                        document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).style.backgroundColor = "lightgreen"
                        err = false
                    }else{
                        cordinates.push(`Hover got out of range! LastKnownPos: ${this.secondHover.row}, ${this.secondHover.column}`)
                        div.innerHTML = cordinates
                        document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).style.backgroundColor = "red"
                        document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).innerHTML = "H2?"
                        err = true
                        break;
                    }
                }else{
                    if(this.secondHover.column + 1 <= columns ){
                        this.secondHover.column += 1
                        document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).style.backgroundColor = "lightgreen"
                        err = false
                    }else{
                        cordinates.push(`   Hover got out of range! LastKnownPos: ${this.secondHover.row}, ${this.secondHover.column}`)
                        div.innerHTML = cordinates
                        document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).style.backgroundColor = "red"
                        document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).innerHTML = "H2?"
                        err = true
                        break;
                    }
                }
                
            }else if(moveSet[i] == 'L'){
                if(this.secondHover.facing == 'N'){
                    this.secondHover.facing = 'W'
                }else if(this.secondHover.facing == 'S'){
                    this.secondHover.facing = 'E'
                }else if(this.secondHover.facing == 'W'){
                    this.secondHover.facing = 'S'
                }else{
                    this.secondHover.facing = 'N'
                }
            }else{
                if(this.secondHover.facing == 'N'){
                    this.secondHover.facing = 'E'
                }else if(this.secondHover.facing == 'S'){
                    this.secondHover.facing = 'W'
                }else if(this.secondHover.facing == 'W'){
                    this.secondHover.facing = 'N'
                }else{
                    this.secondHover.facing = 'S'
                }
            }

            
            document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).style.backgroundColor = "lightgreen"
            if(document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).innerHTML == 'H1'){
                
                document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).innerHTML = 'H1H2'
            } else{
                document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`).innerHTML = 'H2'
            }
            cordinates.push(`   R:${this.secondHover.row}-C:${this.secondHover.column}-F:${this.secondHover.facing}   `)
            
        }

        if(!err){

            
            const finalPos = document.getElementById(`${this.secondHover.row}+${this.secondHover.column}`)
            
            if(finalPos.innerHTML[0] == 'H' && finalPos.innerHTML[1] == '1'){
                finalPos.innerHTML = "!!!"
                finalPos.style.backgroundColor = "red"
                cordinates.push(`Hovers crashed at: ${this.secondHover.row}+${this.secondHover.column}`)
            } else{

                if(this.secondHover.facing == 'N'){
                    div1.setAttribute("class", "arrow-up")  
                }else if(this.secondHover.facing == 'S'){
                    div1.setAttribute("class", "arrow-down")  
                }else if (this.secondHover.facing == 'W'){
                    div1.setAttribute("class", "arrow-left")  
                }else{
                    div1.setAttribute("class", "arrow-right")  
                }
                finalPos.style.backgroundColor = 'green'
                finalPos.innerHTML = 'H2'
                finalPos.appendChild(div1)
            }

            
            div.innerHTML = cordinates
        }
    }   
}

const startNewGame = new Game()

buttonMoveHovers.addEventListener("click", () => {
    if(document.getElementById("hoverMsgArea")){
        let a = document.getElementById("hoverMsgArea")
        a.remove()
    } 
    let err
    let div = document.createElement("div")
    div.setAttribute("id", "hoverMsgArea")
    
    hoverOneMoveSet = [...document.getElementById("hoverOneMove").value]
    hoverTwoMoveSet = [...document.getElementById("hoverTwoMove").value]

    hoverOneMoveSet = hoverOneMoveSet.map(command => command.toUpperCase());
    hoverTwoMoveSet = hoverTwoMoveSet.map(command => command.toUpperCase());

    hoverOneMoveSet = hoverOneMoveSet.filter((value) => {
        return value != " "
    })
    hoverTwoMoveSet = hoverTwoMoveSet.filter((value) => {
        return value != " "
    })
    if(hoverOneMoveSet.length > 0 && hoverTwoMoveSet.length > 0){
        for (let i = 0; i < hoverOneMoveSet.length; i++) {
            const element = hoverOneMoveSet[i];
            if(element == 'M' || element == 'L' || element == 'R'){
                err = false
            }else{
                err = true
                document.getElementById("hoverMoveSet").appendChild(div)
                div.innerHTML = "You must use only M for move forward, L to turn left and R to turn Right!"
            }
        }
        for (let i = 0; i < hoverTwoMoveSet.length; i++) {
            const element = hoverTwoMoveSet[i];
            if(element == 'M' || element == 'L' || element == 'R'){
                err = false
            }else{
                err = true
                document.getElementById("hoverMoveSet").appendChild(div)
                div.innerHTML = "You must use only M for move forward, L to turn left and R to turn Right!"
            }
        }

        if(!err){
            startNewGame.moveHoverOne(hoverOneMoveSet, rows.value-1, columns.value-1)
            startNewGame.moveHoverTwo(hoverTwoMoveSet, rows.value-1, columns.value-1)
            document.getElementById("hoverMoveSet").style.visibility = "hidden"
        }
    }else{
        document.getElementById("hoverMoveSet").appendChild(div)
        div.innerHTML = "Waiting for Values.."
    }
    

})
buttonPlaceHovers.addEventListener(("click"),() => {
   
    if(document.getElementById("hoverMsgArea")){
        let a = document.getElementById("hoverMsgArea")
        a.remove()
    } 
    let div = document.createElement("div")
    div.setAttribute("id", "hoverMsgArea")
    
    let hoverOnePos = document.getElementById("firstHover").value.split(" ")
    let hoverTwoPos = document.getElementById("secondHover").value.split(" ")

    hoverOnePos = hoverOnePos.filter((value) => {
        return value != ""
    })

    hoverTwoPos = hoverTwoPos.filter((value) => {
        return value != ""
    })

    if(hoverOnePos.length == 3 && hoverTwoPos.length == 3){

        hoverTwoPos[0] = parseInt(hoverTwoPos[0], 10)
        hoverTwoPos[1] = parseInt(hoverTwoPos[1], 10)
        hoverTwoPos[2] = hoverTwoPos[2].toUpperCase()
    
        hoverOnePos[0] = parseInt(hoverOnePos[0], 10)
        hoverOnePos[1] = parseInt(hoverOnePos[1], 10)
        hoverOnePos[2] = hoverOnePos[2].toUpperCase()
       
            if(!isNaN(hoverOnePos[1]) && !isNaN(hoverOnePos[0]) && !isNaN(hoverTwoPos[1]) && !isNaN(hoverTwoPos[0])){
                if(hoverOnePos[0] <= rows.value-1 && hoverOnePos[0] >= 0 && hoverOnePos[1] <= columns.value-1 && hoverOnePos[1] >= 0 && hoverTwoPos[0] <= rows.value-1 && hoverTwoPos[0] >= 0 && hoverTwoPos[1] <= columns.value-1 && hoverTwoPos[1] >= 0){
                    if((hoverOnePos[2] == 'N' || hoverOnePos[2] == 'S' || hoverOnePos[2] == 'E' || hoverOnePos[2] == 'W') && (hoverTwoPos[2] == 'N' || hoverTwoPos[2] == 'S' || hoverTwoPos[2] == 'E' || hoverTwoPos[2] == 'W') ){
                        startNewGame.setFirstHover(hoverOnePos[0], hoverOnePos[1], hoverOnePos[2])
                        startNewGame.setSecondHover(hoverTwoPos[0], hoverTwoPos[1], hoverTwoPos[2])
                        document.getElementById("hoverController").style.visibility = "hidden" 
                        document.getElementById("hoverMoveSet").style.visibility = "visible" 
                        
                    }else{
                        document.getElementById("hoverController").appendChild(div)
                        div.innerHTML = "You didnt insert 1 Letter (N, S, W, E)"+ "<br>"+" (rembember to separate with space!)"
                    }
            }else{
                document.getElementById("hoverController").appendChild(div)
                div.innerHTML = `You need to insert a row smaller than ${rows.value} and bigger than 0 and a column smaller than ${columns.value} and bigger than 0`
            }
        }else{
            document.getElementById("hoverController").appendChild(div)
            div.innerHTML = "You didnt insert 2 Numbers"+ "<br>"+" (rembember to separate with space!)"  
            
        }
    }else{
        document.getElementById("hoverController").appendChild(div)
        div.innerHTML = "You inserted more than and/or less than 2 numbers and 1 letter!" 
    }

     
})

buttonSetBoardSize.addEventListener("click", () => {
    if(!rows.value || !columns.value){ 
        message.innerHTML = "Must Insert row and column!"
    }else{
        document.getElementById("formForTheArea").style.display = "none"    
        document.getElementById("hoverController").style.visibility = "visible"   
        message.innerHTML = ""
        
        startNewGame.setGridSize(rows.value, columns.value)

        startNewGame.drawArea()
    }
    
})
