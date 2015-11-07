import React from 'react-native';
import Immutable from 'immutable';
import Constants from "../constants/ReversiConstants";
import SettingsStore from "../stores/SettingsStore";

const Direction = Constants.get("Direction"),
      GridStatus = Constants.get("GridStatus"),
      EMPTY = GridStatus.get("EMPTY"),
      WHITE = GridStatus.get("WHITE");

const BoardUtil = {
    compact: function(array) {
        return array.filter((x) => {return null !== x && undefined !== x;});
    },

    unique: function(array) {
        return array.filter((x, i) => {
            return array.indexOf(x) === i;
        });
    },

    changePlayer: function(player) {
        if (Immutable.is(player, WHITE)) {
            return GridStatus.get("BLACK");
        }
        return WHITE;
    },

    fillPiece: function(board, row, col, value) {
        return board.setIn([row, col, "value"], value);
    },

    fillPieces: function(board, pieces) {
        var immutablePieces = Immutable.fromJS(pieces);
        return immutablePieces.reduce((preVal, currVal) => {
            return BoardUtil.fillPiece(preVal, currVal.get("row"), currVal.get("col"), currVal.get("value"));
        }, board);
    },

    verifyGridStatus: function(grid, value) {
        return grid.get("value") === value;
    },

    isGridLegal: function(row, col) {
        var rowColLength = SettingsStore.getRowColumnLength();
        if (row > -1 && row < rowColLength && col > -1 && col < rowColLength) {
            return true;
        }
        return false;
    },

    // get the grids on the reversed direction. If it exceed the border, return [];
    // if it's empty, it means these exist no the same player on this direction;
    // if it's the reversed player, save this grid and keep searching until finding the 
    // same player, then return the saved grids.
    flipGridsOnReversedDirection: function(grid, board, player, direction, returnedGrids) {
        var rowReversed = grid.get("row") - direction.get("row"),
            colReversed = grid.get("col") - direction.get("col");

        if (BoardUtil.isGridLegal(rowReversed, colReversed)) {
            var reversedDirectionGrid = board.getIn([rowReversed, colReversed]);

            if (BoardUtil.verifyGridStatus(reversedDirectionGrid, EMPTY)) {
                return [];
            } else if (BoardUtil.verifyGridStatus(reversedDirectionGrid, player)) {
                return returnedGrids;
            } else if (BoardUtil.verifyGridStatus(reversedDirectionGrid, BoardUtil.changePlayer(player))) {
                returnedGrids.push(reversedDirectionGrid.set("value", player));
                return BoardUtil.flipGridsOnReversedDirection(reversedDirectionGrid, board, player, direction, returnedGrids);
            }
        }
        return [];
    },

    // check if the grid on the direction is available
    checkReverseDirectionAvailable: function(grid, board, player, direction) {
        var row = grid.get("row") - direction.get("row"),
            col = grid.get("col") - direction.get("col");

        if (BoardUtil.isGridLegal(row, col)) {
            var reversedDirectionGrid = board.getIn([row, col]);

            if (BoardUtil.verifyGridStatus(reversedDirectionGrid, EMPTY)) {
                return false;
            } else if (BoardUtil.verifyGridStatus(reversedDirectionGrid, player)) {
                return true;
            } else if (BoardUtil.verifyGridStatus(reversedDirectionGrid, BoardUtil.changePlayer(player))) {
                return BoardUtil.checkReverseDirectionAvailable(reversedDirectionGrid, board, player, direction);
            }
        }
        return false;
    },

    getAvailableGridsGivenDirection: function(grid, board, player, direction) {
        var row = grid.get("row") + direction.get("row"),
            col = grid.get("col") + direction.get("col"),
            directionGrid = board.getIn([row, col]);

        if (BoardUtil.isGridLegal(row, col) &&
            BoardUtil.verifyGridStatus(directionGrid, EMPTY) &&
            BoardUtil.checkReverseDirectionAvailable(grid, board, player, direction)) {
            return [directionGrid.set("value", GridStatus.get("AVAILABLE"))];
        }
    },

    getAvailableGridsGivenGrid: function(grid, board, player) {
        return Direction.reduce((availableGrids, direction) => {
            return availableGrids.concat(BoardUtil.getAvailableGridsGivenDirection(grid, board, player, direction));
        }, []);
    },

    getReversableGrids: function(grid, board, player) {
        return Direction.reduce((availableGrids, direction) => {
            return availableGrids.concat(BoardUtil.flipGridsOnReversedDirection(grid, board, player, direction, []));
        }, []);
    },

    /* Get the available grids and fill the status to them. */
    allAvailableGrids: function(board, player) {
        var rowColLength = SettingsStore.getRowColumnLength(),
            reversePlayer = BoardUtil.changePlayer(player),
            availableGrids = [];

        for(var i = 0; i < rowColLength; i++) {
            for(var j = 0; j < rowColLength; j++) {
                var grid = board.getIn([i, j]);
                if (BoardUtil.verifyGridStatus(grid, reversePlayer)) {
                    availableGrids = availableGrids.concat(BoardUtil.getAvailableGridsGivenGrid(grid, board, player, false));
                }
            }
        }
        return BoardUtil.unique(BoardUtil.compact(availableGrids));
    },

    /* Get the grids those should be reversed and reverse them. */
    reverseGrids: function(piece, board, player) {
        var reversedGrids = BoardUtil.getReversableGrids(piece, board, player),
            puredGrids = BoardUtil.unique(BoardUtil.compact(reversedGrids));

        return BoardUtil.fillPieces(board, puredGrids);
    },

    clearAvailableGrids: function(board) {
        var rowColLength = SettingsStore.getRowColumnLength(),
            availableGrids = [];
        for(var i = 0; i < rowColLength; i++) {
            for(var j = 0; j < rowColLength; j++) {
                var grid = board.getIn([i, j]);
                if (BoardUtil.verifyGridStatus(grid, GridStatus.get("AVAILABLE"))) {
                    availableGrids.push(grid.set("value", EMPTY));
                }
            }
        }
        return BoardUtil.fillPieces(board, availableGrids);
    }
};

export default BoardUtil;
