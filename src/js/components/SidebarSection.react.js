import React from 'react';
import Immutable from 'immutable';

const BoardStore = require("../stores/BoardStore"),
      FlipperSection = require("./FlipperSection.react"),
      Constants = require("../constants/ReversiConstants"),
      FootbarActionCreators = require("../actions/FootbarActionCreators"),
      GridStatus = Constants.get("GridStatus");

function getStateFromStores() {
    return {data: Immutable.Map({
        "canRegret": BoardStore.canRegret(),
        "numWhite": BoardStore.getNumberPieces()[0],
        "numBlack": BoardStore.getNumberPieces()[1],
        "player": BoardStore.getPlayer(),
        "gameOver": BoardStore.gameOver(),
    })};
}

var SidebarSection = React.createClass({

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
            numWhite = this.state.data.get("numWhite"),
            numBlack = this.state.data.get("numBlack"),
            player = this.state.data.get("player"),
            middleText,
            regretButton;

        if (regretDisable || gameOver) {
            regretButton = <input type="Button" className="button button--danger sidebar__button-full" onClick={this._regret} disabled="disabled" value="Regret"/>
        } else {
            regretButton = <input type="Button" className="button button--danger sidebar__button-full" onClick={this._regret} value="Regret"/>
        }

        if (gameOver) {
            player = numWhite > numBlack ? GridStatus.get("WHITE") : GridStatus.get("BLACK");
            middleText = "Winner";
        } else {
            middleText = "Player";
        }

        return (
            <div className="sidebar">
                <div className="sidebar__header"></div>
                <table className="sidebar__content">
                    <tbody className="sidebar__row-groups">
                        <tr>
                            <td>
                                <div className="sidebar__grid">
                                    <FlipperSection player={GridStatus.get("WHITE")} />
                                </div>
                            </td>
                            <td>{numWhite}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="sidebar__grid">
                                    <FlipperSection player={GridStatus.get("BLACK")} />
                                </div>
                            </td>
                            <td>{numBlack}</td>
                        </tr>
                        <tr>
                            <td>{middleText}</td>
                            <td>
                                <div className="sidebar__grid">
                                    <FlipperSection player={player} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="button" className="button button--success sidebar__button-full" onClick={this._start} value="New Game"/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">{regretButton}</td>
                        </tr>
                    </tbody>
                </table>
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

export default SidebarSection;
