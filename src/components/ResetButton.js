import React, {PureComponent} from 'react'

class ResetButton extends PureComponent {

    render() {
        return (
            <button type="button" onClick={this.handleClick}>Начать сначала</button>
        );
    }

    handleClick = e => {
        this.props.reset();
    }
}

export default ResetButton

