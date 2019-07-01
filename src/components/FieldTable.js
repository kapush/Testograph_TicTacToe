import React, {Component} from 'react'

class FieldTable extends Component {

    render() {

        const gameTable = this.props.gameTable;
        const tableContent = gameTable.map((row, index) => {
            return <tr key={index}>{row.map((cell, index) => <td key={index}>{cell}</td> )}</tr>;
        });
        return (
            <table onClick={this.handleClick} >
            <tbody>
                {tableContent}
            </tbody>
            </table>
        );
    }

    handleClick = e => {
        const {disabled, 
            continueGame} = this.props;

        if(disabled) return false;
        
        const i = e.target.parentNode.rowIndex;
        const j = e.target.cellIndex;
        continueGame({i, j});
    }
}

export default FieldTable