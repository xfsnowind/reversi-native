import EventEmitter from 'events';
import Immutable from 'immutable';
import assign from 'object-assign';
import Dispatcher from "../dispatcher/ReversiDispatcher";
import SettingsStore from "./SettingsStore";
import BoardUtil from "../utils/ReversiBoardUtil";
import Constants from "../constants/ReversiConstants";

var ActionTypes = Constants.get("ActionTypes"),
    GridStatus = Constants.get("GridStatus"),
    CHANGE_EVENT = "change",
    WHITE = GridStatus.get("WHITE"),
    BLACK = GridStatus.get("BLACK"),
    AVAILABLE = GridStatus.get("AVAILABLE"),
    EMPTY = GridStatus.get("EMPTY");

var _player = null,
    _history = null,
    _player_history = null,
    _board = [];

function init() {
    var rowColLength = SettingsStore.getRowColumnLength(),
        halfRowColLength = rowColLength / 2,
        initPieces = [{"row"   : halfRowColLength - 1,
                       "col"   : halfRowColLength - 1,
                       "value" : WHITE},
                      {"row"   : halfRowColLength,
                       "col"   : halfRowColLength - 1,
                       "value" : BLACK},
                      {"row"   : halfRowColLength - 1,
                       "col"   : halfRowColLength,
                       "value" : BLACK},
                      {"row"   : halfRowColLength,
                       "col"   : halfRowColLength,
                       "value" : WHITE}];
    _player = WHITE;
    _board = [];
    _history = Immutable.fromJS([]);
    _player_history = Immutable.fromJS([]);

    for (var i = 0; i < rowColLength; i++) {
        var row = [];
        for (var j = 0; j < rowColLength; j++) {
            row.push({"row"   : i,
                      "col"   : j,
                      "value" : GridStatus.get("EMPTY")});
        }
        _board.push(Immutable.fromJS(row));
    }

    _board = BoardUtil.fillPieces(Immutable.fromJS(_board), initPieces);
    var availableGrids = BoardUtil.allAvailableGrids(_board, _player);
    _board = BoardUtil.fillPieces(_board, availableGrids);
}

var BoardStore = assign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getBoard: function() {
        return _board;
    },

    getNumberPieces: function() {
        var rowColLength = SettingsStore.getRowColumnLength(),
            whitePlayer = 0,
            blackPlayer = 0;

        for(var i = 0; i < rowColLength; i++) {
            for(var j = 0; j < rowColLength; j++) {
                var grid = _board.getIn([i, j]);
                if (BoardUtil.verifyGridStatus(grid, WHITE)) {
                    whitePlayer++;
                }
                if (BoardUtil.verifyGridStatus(grid, BLACK)) {
                    blackPlayer++;
                }
            }
        }
        return [whitePlayer, blackPlayer];
    },

    getPlayer: function() {
        return _player;
    },

    gameOver: function() {
        /*when the board is full, nomore one players' piece*/
        var rowColLength = SettingsStore.getRowColumnLength(),
            emptyNum = 0;

        for(var i = 0; i < rowColLength; i++) {
            for(var j = 0; j < rowColLength; j++) {
                var grid = _board.getIn([i, j]);
                if (BoardUtil.verifyGridStatus(grid, EMPTY) ||
                    BoardUtil.verifyGridStatus(grid, AVAILABLE)) {
                    emptyNum++;
                }
            }
        }

        if (0 === emptyNum) {
            return true;
        } else {
            var cleanBoard = BoardUtil.clearAvailableGrids(_board),
                currentAvailableGrids = BoardUtil.allAvailableGrids(cleanBoard, _player),
                reverseAvailableGrids = BoardUtil.allAvailableGrids(cleanBoard, BoardUtil.changePlayer(_player));
            return 0 == currentAvailableGrids.length && 0 == reverseAvailableGrids.length;
        }
    },

    canRegret: function() {
        return !_history.isEmpty();
    }
});

BoardStore.dispatchToken = Dispatcher.register(function(action) {
    var content = action.content;

    switch (action.type) {
        case ActionTypes.get("CLICK_THREAD"):
            _history = _history.push(_board);
            _player_history = _player_history.push(_player);

            _board = BoardUtil.fillPiece(_board, content.get("row"), content.get("col"), _player);
            _board = BoardUtil.clearAvailableGrids(_board);
            _board = BoardUtil.reverseGrids(content, _board, _player);

            _player = BoardUtil.changePlayer(_player);

            var availableGrids = BoardUtil.allAvailableGrids(_board, _player);
            if (availableGrids.length === 0) {
                _player = BoardUtil.changePlayer(_player);
                _board = BoardUtil.clearAvailableGrids(_board);
                availableGrids = BoardUtil.allAvailableGrids(_board, _player);
                if (availableGrids.length != 0) {
                    _board = BoardUtil.fillPieces(_board, availableGrids);
                }
            } else {
                _board = BoardUtil.fillPieces(_board, availableGrids);
            }
            BoardStore.emitChange();
            break;

        case ActionTypes.get("START_THREAD"):
            init();
            BoardStore.emitChange();
            break;

        case ActionTypes.get("REGRET_THREAD"):
            if(BoardStore.canRegret()) {
                _board = _history.last();
                _history = _history.pop();
                _player = _player_history.last();
                _player_history = _player_history.pop();
                BoardStore.emitChange();
            }
            break;

        default:
    }
});

init();

export default BoardStore;
