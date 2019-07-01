import React, {Component} from 'react'

import ResultMessage from './ResultMessage.js'
import PointCounter from './PointCounter.js'
import FieldTable from './FieldTable.js'
import ResetButton from './ResetButton.js'

import Globals from './globals.js'

class Game extends Component {

    state = {
        gameTable: [["", "", ""],
                    ["", "", ""],
                    ["", "", ""]],
        humanStarts: Globals.X,
        pointsX: 0,
        points0: 0,
        roundResult: undefined,
        disabled: false
    }



    render(){
        const result = this.state.roundResult != undefined ? <ResultMessage roundResult={this.state.roundResult} /> : "";

        return (
            <div className="container">
                <PointCounter pointsX={this.state.pointsX} points0={this.state.points0} />
                <div className="field-container" >
                    <FieldTable 
                        gameTable={this.state.gameTable}
                        continueGame={this.continueGame} 
                        humanStarts={this.state.humanStarts} 
                        disabled={this.state.disabled} />
                    {result}
                </div>
                <ResetButton reset={this.reset}/>
            </div>

        );
    }



    reset = () => {
        let compMove = "";
        if(this.state.humanStarts){
            compMove = "X";
        }
        this.setState({
            gameTable: [ ["", "", ""],
                        ["", compMove, ""],
                        ["", "", ""]],
            humanStarts: !this.state.humanStarts,
            roundResult: undefined,
            disabled: false
                            });
    }


    continueGame = (rowCell) => {
        
        this.makeMove(rowCell, this.state.humanStarts); 
        
        if(this.gameOver(rowCell)){
            const pointsXInc = this.state.humanStarts ? 1 : 0;
            const points0Inc = this.state.humanStarts ? 0 : 1;
            this.setState({
                roundResult: Globals.HUMAN_WON,
                pointsX: this.state.pointsX + pointsXInc,
                points0: this.state.points0 + points0Inc,
                disabled: true
            });
            return;
        };

        rowCell = this.calcMove(rowCell);
        this.makeMove(rowCell, !this.state.humanStarts);
        
        if(this.gameOver(rowCell)){
            const pointsXInc = this.state.humanStarts ? 0 : 1;
            const points0Inc = this.state.humanStarts ? 1 : 0;
            this.setState({
                roundResult: Globals.COMPUTER_WON,
                pointsX: this.state.pointsX + pointsXInc,
                points0: this.state.points0 + points0Inc,
                disabled: true
            });
            return;
        };
    }

    makeMove = (rowCell, role) => {
        let matrix = this.state.gameTable;

        let cellValue = "";
        switch(role){
            case Globals.X: cellValue="X"; break;
            case Globals.O: cellValue="0"; break;
            default: break;
        } 
        matrix[rowCell.i][rowCell.j] = cellValue;
        this.setState({gameTable: matrix});
    }




    //------------логика игры------------

    gameOver = (rowCell) => {
        return (this.checkHorizontal(rowCell.i) ||
        this.checkVertical(rowCell.j) || 
        this.checkLeftDiagonal() ||
        this.checkRightDiagonal() );    
    }

    calcMove(prevMove) {//расчитывает ход компьютера. Пока берет первую попавшуюся свободную клетку
        const matrix = this.state.gameTable;
        let currentFreeCell;

        /*const rowNeighbour = (prevMove.i === prevMove.i+1 || prevMove.i === prevMove.i-1);
        const cellNeighbour = (prevMove.j === prevMove.j+1 || prevMove.j === prevMove.j-1);
        const sameRow = (prevMove.i === prevMove.i);
        const sameCell = (prevMove.j === prevMove.j);*/

        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if(matrix[i][j] !== ""){continue;}
                currentFreeCell = {i, j};
                /*if((rowNeighbour && cellNeighbour) ||
                    (rowNeighbour && sameCell) ||
                    (cellNeighbour && sameRow))*/
                    return currentFreeCell;
            }
        }
        return currentFreeCell;
    }

	checkHorizontal(rowIndex){
        const row = this.state.gameTable[rowIndex];
        for(let i=0; i<row.length; i++){
            for(let j=i+1; j<row.length; j++){
                if (row[i]!==row[j]) return false;
            }
        }
        return true;
    }

    checkVertical(cellIndex){
        const matrix = this.state.gameTable;
        for(let i=0; i < matrix.length; i++){
            for(let j=i+1; j < matrix.length; j++){
                if(matrix[i][cellIndex] !== matrix[j][cellIndex])
                    return false;
            }
        }
        return true;
    }

    checkLeftDiagonal(){
        const matrix = this.state.gameTable;
        return (matrix[0][0] && matrix[1][1] && matrix[2][2] &&
            matrix[0][0] === matrix[1][1] && matrix[0][0] === matrix[2][2] && matrix[1][1] === matrix[2][2]);
    }

    checkRightDiagonal(){
        const matrix = this.state.gameTable;
        return (matrix[0][2] && matrix[1][1] && matrix[2][0] &&
            matrix[0][2] === matrix[1][1] && matrix[0][2] === matrix[2][0] && matrix[1][1] === matrix[2][0]);
    }

}

export default Game