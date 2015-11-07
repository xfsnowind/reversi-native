import React from 'react';
import Immutable from 'immutable';
import FootbarActionCreators from "../actions/FootbarActionCreators";
import BoardStore from "../stores/BoardStore";

function getStateFromStores() {
    return {data: Immutable.Map({
        "canRegret": BoardStore.canRegret(),
        "gameOver": BoardStore.gameOver(),
    })};
}

var FootbarSection = React.createClass({

    mixins: [PureRenderMixin],

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        BoardStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        BoardStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var regretDisable = !this.state.data.get("canRegret"),
            gameOver = this.state.data.get("gameOver"),
            regretButton;

        if (regretDisable || gameOver) {
            regretButton = <input type="Button" className="footbar__right button button--danger" onClick={this._regret} disabled="disabled" value="Regret"/>
        } else {
            regretButton = <input type="Button" className="footbar__right button button--danger" onClick={this._regret} value="Regret"/>
        }

        return (
            <div className="footbar">
                <input type="button" className="footbar__left button button--success" onClick={this._start} value="New Game"/>
                {regretButton}
            </div>
        );
    },

    _start: function() {
        FootbarActionCreators.startGame();
    },

    _regret: function() {
        FootbarActionCreators.regret();
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

export default FootbarSection;
