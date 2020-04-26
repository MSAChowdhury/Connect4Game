var name1 = prompt("You are the Player1 and your color will be green. Enter your name");
var color1 = 'rgb(0, 128, 0)';
var name2 = prompt("You are the Player2 and your color will be red. Enter your name");
var color2 = 'rgb(237, 45, 73)';

var game_on = true;
// This is for selecting all tags under table, tr
// var table = document.querySelectorAll('table tr');
var table = $('table tr');

function reportWin(rowNum, colNum){
    console.log("You won starting at this row,column");
    console.log(rowNum);
    console.log(colNum);
}

function changeColor(rowIndex,colIndex,color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}
// this for setting up cellindex
/* const table = document.querySelector('table');
const rows = document.querySelectorAll('tr');
const rowsArray = Array.from(rows);

table.addEventListener('click', (event) => {
  const rowIndex = rowsArray.findIndex(row => row.contains(event.target));
  const columns = Array.from(rowsArray[rowIndex].querySelectorAll('td'));
  const columnIndex = columns.findIndex(column => column == event.target);
  console.log(rowIndex, columnIndex)
}) */
function returnColor(rowIndex,colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}
// checking the bottom color to returncolor 
function checkBottom(colIndex){
    var colorReport = returnColor(5,colIndex);
    for(var row = 5; row > -2; row--){
        colorReport = returnColor(row,colIndex);
        if(colorReport === 'rgb(135, 248, 229)'){
            return row 
        }
        
    }
}

function colorMatchCheck(one,two,three,four){
    return (one === two && one === three && one === four && one !== 'rgb(135, 248, 229)' && one !== undefined)
}
// check for horizontal win
function horizontalWinCheck(){
    for(var row = 0; row < 6; row++){
        for(var col = 0; col < 3; col++){
            if(colorMatchCheck(returnColor(row,col), returnColor(row,col+1), returnColor(row, col+2), returnColor(row,col+3))){
                console.log('horiz');
                reportWin(row,col);
                return true;
            }
            else {
                continue;
            }

        }
    }
}

// check for Vertical win
function verticalWinCheck(){
    for(var col = 0; col < 6; col++){
        for(var row = 0; row < 3; row++){
            if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col), returnColor(row+2, col), returnColor(row+3,col))){
                console.log('vertex');
                reportWin(row,col);
                return true;
            }
            else {
                continue;
            }

        }
    }
}

// diagonal wins
function diagonalWinCheck(){
    for(var col = 0; col < 5; col++){
        for(var row = 0; row < 7; row++){
            if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1), returnColor(row+2, col+2), returnColor(row+3,col+3))){
                console.log('diag');
                reportWin(row,col);
                return true;
            }
            else if(colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1), returnColor(row-2, col+2), returnColor(row-3,col+3))){
                console.log('diag');
                reportWin(row,col);
                return true;
            }
            else {
                continue;
            }

        }
    }
}

// player 1
var currentplayer = 1;
var currentName = name1;
var currentcolor = color1;

$('p').text(name1+" it is your turn, pick a column to drop in!")

$('#content button').on('click', function(){
    var col = $(this).closest('td').index();

    var bottomAvail = checkBottom(col);

    changeColor(bottomAvail,col,currentcolor);

    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
        $('h1').text(currentName+", You have won the game!");
        $('h5').text("Please Refresh the page to play again.");
        $('h3').fadeOut('fast');
        $('p').fadeOut('fast');
        
    }

    currentplayer = currentplayer * -1;

    if(currentplayer === 1){
        currentName = name1;
        $('p').text(currentName+", it is your turn");
        currentcolor = color1;
    }
    else {
        currentName = name2;
        $('p').text(currentName+", it is your turn");
        currentcolor = color2;
    }
})