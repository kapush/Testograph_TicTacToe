import React from 'react';

function ResultMessage({ roundResult }) {
    let message = "";

    switch(roundResult){
        case -1: message = "Вы проиграли!"; break;
        case 0: message = "Ничья!"; break;
        case 1: message = "Вы выиграли!"; break;
        default: break;
    }
    
    return <div className="result-message">
          {message}
    </div>;
}


export default ResultMessage;