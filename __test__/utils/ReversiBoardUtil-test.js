jest.dontMock("../../src/constants/ReversiConstants");
jest.dontMock("../../src/js/stores/SettingsStore");
jest.dontMock("../../src/js/utils/ReversiBoardUtil");

import Immutable from 'immutable';
import BoardUtil from "../../src/js/utils/ReversiBoardUtil";
import SettingsStore from "../../src/js/stores/SettingsStore";
import GridSection from '../../src/js/components/GridSection.react';
import Constants from "../../src/js/constants/ReversiConstants";

const GridStatus = Constants.get("GridStatus"),
      WHITE = GridStatus.get("WHITE"),
      BLACK = GridStatus.get("BLACK"),
      DIRECTION = Constants.get("Direction"),
      rowColLength = SettingsStore.getRowColumnLength();

var boardInit = [];

function initialBoard(board) {
    for (var i = 0; i < rowColLength; i++) {
        var row = [];
        for (var j = 0; j < rowColLength; j++) {
            row.push({row:i, col:j, value: GridStatus.get("EMPTY")});
        }
        board.push(Immutable.fromJS(row));
    }
    return Immutable.fromJS(board);
}

boardInit = initialBoard(boardInit);

/*          0   00000000
 *          1   00000000
 *          2   00000000
 *          3   000wbbw0
 *          4   000bw000
 *          5   000bw000
 *          6   000wbb00
 *          7   00000000*/
var pieces = Immutable.fromJS([{row: 3, col: 3, value: "WHITE"},
                               {row: 3, col: 4, value: "BLACK"},
                               {row: 3, col: 5, value: "BLACK"},
                               {row: 3, col: 6, value: "WHITE"},
                               {row: 4, col: 3, value: "BLACK"},
                               {row: 4, col: 4, value: "WHITE"},
                               {row: 5, col: 3, value: "BLACK"},
                               {row: 5, col: 4, value: "WHITE"},
                               {row: 6, col: 3, value: "WHITE"},
                               {row: 6, col: 4, value: "BLACK"},
                               {row: 6, col: 5, value: "BLACK"}]),
    testBoard = BoardUtil.fillPieces(boardInit, pieces);

describe("ReversiBoardUtil", () => {
    var filledBoard = Immutable.fromJS([[{"row": 0,"col": 0,"value": "EMPTY"},
                                         {"row": 0,"col": 1,"value": "EMPTY"},
                                         {"row": 0,"col": 2,"value": "EMPTY"},
                                         {"row": 0,"col": 3,"value": "EMPTY"},
                                         {"row": 0,"col": 4,"value": "EMPTY"},
                                         {"row": 0,"col": 5,"value": "EMPTY"},
                                         {"row": 0,"col": 6,"value": "EMPTY"},
                                         {"row": 0,"col": 7,"value": "EMPTY"}],
                                        [{"row": 1,"col": 0,"value": "EMPTY"},
                                         {"row": 1,"col": 1,"value": "EMPTY"},
                                         {"row": 1,"col": 2,"value": "EMPTY"},
                                         {"row": 1,"col": 3,"value": "EMPTY"},
                                         {"row": 1,"col": 4,"value": "EMPTY"},
                                         {"row": 1,"col": 5,"value": "EMPTY"},
                                         {"row": 1,"col": 6,"value": "EMPTY"},
                                         {"row": 1,"col": 7,"value": "EMPTY"}],
                                        [{"row": 2,"col": 0,"value": "EMPTY"},
                                         {"row": 2,"col": 1,"value": "EMPTY"},
                                         {"row": 2,"col": 2,"value": "EMPTY"},
                                         {"row": 2,"col": 3,"value": "WHITE"},
                                         {"row": 2,"col": 4,"value": "EMPTY"},
                                         {"row": 2,"col": 5,"value": "EMPTY"},
                                         {"row": 2,"col": 6,"value": "EMPTY"},
                                         {"row": 2,"col": 7,"value": "EMPTY"}],
                                        [{"row": 3,"col": 0,"value": "EMPTY"},
                                         {"row": 3,"col": 1,"value": "EMPTY"},
                                         {"row": 3,"col": 2,"value": "EMPTY"},
                                         {"row": 3,"col": 3,"value": "EMPTY"},
                                         {"row": 3,"col": 4,"value": "EMPTY"},
                                         {"row": 3,"col": 5,"value": "EMPTY"},
                                         {"row": 3,"col": 6,"value": "EMPTY"},
                                         {"row": 3,"col": 7,"value": "EMPTY"}],
                                        [{"row": 4,"col": 0,"value": "EMPTY"},
                                         {"row": 4,"col": 1,"value": "EMPTY"},
                                         {"row": 4,"col": 2,"value": "EMPTY"},
                                         {"row": 4,"col": 3,"value": "EMPTY"},
                                         {"row": 4,"col": 4,"value": "EMPTY"},
                                         {"row": 4,"col": 5,"value": "EMPTY"},
                                         {"row": 4,"col": 6,"value": "EMPTY"},
                                         {"row": 4,"col": 7,"value": "EMPTY"}],
                                        [{"row": 5,"col": 0,"value": "EMPTY"},
                                         {"row": 5,"col": 1,"value": "EMPTY"},
                                         {"row": 5,"col": 2,"value": "EMPTY"},
                                         {"row": 5,"col": 3,"value": "EMPTY"},
                                         {"row": 5,"col": 4,"value": "EMPTY"},
                                         {"row": 5,"col": 5,"value": "EMPTY"},
                                         {"row": 5,"col": 6,"value": "EMPTY"},
                                         {"row": 5,"col": 7,"value": "EMPTY"}],
                                        [{"row": 6,"col": 0,"value": "EMPTY"},
                                         {"row": 6,"col": 1,"value": "EMPTY"},
                                         {"row": 6,"col": 2,"value": "EMPTY"},
                                         {"row": 6,"col": 3,"value": "EMPTY"},
                                         {"row": 6,"col": 4,"value": "EMPTY"},
                                         {"row": 6,"col": 5,"value": "EMPTY"},
                                         {"row": 6,"col": 6,"value": "EMPTY"},
                                         {"row": 6,"col": 7,"value": "EMPTY"}],
                                        [{"row": 7,"col": 0,"value": "EMPTY"},
                                         {"row": 7,"col": 1,"value": "EMPTY"},
                                         {"row": 7,"col": 2,"value": "EMPTY"},
                                         {"row": 7,"col": 3,"value": "EMPTY"},
                                         {"row": 7,"col": 4,"value": "EMPTY"},
                                         {"row": 7,"col": 5,"value": "EMPTY"},
                                         {"row": 7,"col": 6,"value": "EMPTY"},
                                         {"row": 7,"col": 7,"value": "EMPTY"}]]);

    describe("changePlayer", () => {
        it("change player", () => {
            expect(BoardUtil.changePlayer(WHITE)).toEqual(BLACK);
            expect(BoardUtil.changePlayer(BLACK)).toEqual(WHITE);
        });
    });

    describe("fillPiece", () => {
        it("fill piece when given row and col are available", () => {
            expect(Immutable.is(BoardUtil.fillPiece(boardInit, 2, 3, "WHITE"), filledBoard)).toEqual(true);
        });
    });

    describe("fillPieces", () => {
        it("fill pieces to board with given grids", () => {
            expect(Immutable.is(BoardUtil.fillPieces(boardInit, [{row: 2, col: 3, value: "WHITE"}]), filledBoard)).toEqual(true);
        });
    });

    describe("verifyGridStatus", () => {
        it("verify grid status", () => {
            expect(BoardUtil.verifyGridStatus(Immutable.fromJS({value: "BLACK"}), BLACK)).toEqual(true);
            expect(BoardUtil.verifyGridStatus(Immutable.fromJS({value: "BLACK"}), WHITE)).toEqual(false);
        });
    });

    describe("isGridLegal", () => {
        it("is given grid legal", () => {
            expect(BoardUtil.isGridLegal(2, 4)).toEqual(true);
            expect(BoardUtil.isGridLegal(-2, 4)).toEqual(false);
            expect(BoardUtil.isGridLegal(2, -4)).toEqual(false);
            expect(BoardUtil.isGridLegal(2, 9)).toEqual(false);
            expect(BoardUtil.isGridLegal(9, 4)).toEqual(false);
        });
    });

    describe("checkReverseDirectionAvailableAvailable", () => {
        it("return true if there exists the grid whose value is same with player on reversed direction with given direction", () => {
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 3}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 4, col: 3}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("DOWN"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 3}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("LEFT"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 4}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("RIGHT"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 4, col: 3}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("UP_LEFT"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 4, col: 4}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP_RIGHT"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 5, col: 3}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("DOWN_LEFT"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 5, col: 4}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("DOWN_RIGHT"))).toEqual(true);
        });

        it("return false if grid on the reversed direction exceed the borders", () => {
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 7, col: 3}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 0, col: 3}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("DOWN"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 7}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("LEFT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 0}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("RIGHT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 7, col: 3}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("UP_LEFT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 7}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("UP_LEFT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 7, col: 4}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP_RIGHT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 4, col: 0}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP_RIGHT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 0, col: 3}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("DOWN_LEFT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 5, col: 7}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("DOWN_LEFT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 0, col: 4}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("DOWN_RIGHT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 5, col: 0}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("DOWN_RIGHT"))).toEqual(false);
        });
    });

    describe("flipGridsOnReversedDirection", () => {
        describe("return an array grids if there exists the grid whose value is same with player on reversed direction with direction", () => {
            var result, expectedResult;

            it("UP", () => {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 3, col: 3}),
                                                                testBoard,
                                                                "WHITE",
                                                                DIRECTION.get("UP"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 4, col: 3, value: "WHITE"}),
                                  Immutable.fromJS({row: 5, col: 3, value: "WHITE"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });

            it("DOWN", () => {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 6, col: 3}),
                                                                testBoard,
                                                                "WHITE",
                                                                DIRECTION.get("DOWN"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 5, col: 3, value: "WHITE"}),
                                  Immutable.fromJS({row: 4, col: 3, value: "WHITE"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });

            it("LEFT", () => {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 3, col: 3}),
                                                                testBoard,
                                                                "WHITE",
                                                                DIRECTION.get("LEFT"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 3, col: 4, value: "WHITE"}),
                                  Immutable.fromJS({row: 3, col: 5, value: "WHITE"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });

            it("RIGHT", () => {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 3, col: 6}),
                                                                testBoard,
                                                                "WHITE",
                                                                DIRECTION.get("RIGHT"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 3, col: 5, value: "WHITE"}),
                                  Immutable.fromJS({row: 3, col: 4, value: "WHITE"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });

            it("UP_LEFT", () => {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 4, col: 3}),
                                                                testBoard,
                                                                "BLACK",
                                                                DIRECTION.get("UP_LEFT"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 5, col: 4, value: "BLACK"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });

            it("UP_RIGHT", () => {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 3, col: 5}),
                                                                testBoard,
                                                                "BLACK",
                                                                DIRECTION.get("UP_RIGHT"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 4, col: 4, value: "BLACK"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });

            it("DOWN_LEFT", () => {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 5, col: 3}),
                                                                testBoard,
                                                                "BLACK",
                                                                DIRECTION.get("DOWN_LEFT"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 4, col: 4, value: "BLACK"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });

            it("DOWN_RIGHT", () => {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 6, col: 5}),
                                                                testBoard,
                                                                "BLACK",
                                                                DIRECTION.get("DOWN_RIGHT"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 5, col: 4, value: "BLACK"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });
        });
    });

    describe("getAvailableGridsGivenDirection", () => {
        describe("return an array containing the grid that is available with direction", () => {
            var result, expectedResult;

            it("UP", () => {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 3, col: 3}),
                                                                   testBoard,
                                                                   "WHITE",
                                                                   DIRECTION.get("UP"));
                expectedResult = [Immutable.fromJS({row: 2, col: 3, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });

            it("DOWN", () => {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 6, col: 3}),
                                                                   testBoard,
                                                                   "WHITE",
                                                                   DIRECTION.get("DOWN"));
                expectedResult = [Immutable.fromJS({row: 7, col: 3, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });

            it("LEFT", () => {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 3, col: 3}),
                                                                   testBoard,
                                                                   "WHITE",
                                                                   DIRECTION.get("LEFT"));
                expectedResult = [Immutable.fromJS({row: 3, col: 2, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });

            it("RIGHT", () => {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 3, col: 6}),
                                                                   testBoard,
                                                                   "WHITE",
                                                                   DIRECTION.get("RIGHT"));
                expectedResult = [Immutable.fromJS({row: 3, col: 7, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });

            it("UP_LEFT", () => {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 4, col: 3}),
                                                                   testBoard,
                                                                   "BLACK",
                                                                   DIRECTION.get("UP_LEFT"));
                expectedResult = [Immutable.fromJS({row: 3, col: 2, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });

            it("UP_RIGHT", () => {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 3, col: 5}),
                                                                   testBoard,
                                                                   "BLACK",
                                                                   DIRECTION.get("UP_RIGHT"));
                expectedResult = [Immutable.fromJS({row: 2, col: 6, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });

            it("DOWN_LEFT", () => {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 5, col: 3}),
                                                                   testBoard,
                                                                   "BLACK",
                                                                   DIRECTION.get("DOWN_LEFT"));
                expectedResult = [Immutable.fromJS({row: 6, col: 2, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });

            it("DOWN_RIGHT", () => {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 6, col: 5}),
                                                                   testBoard,
                                                                   "BLACK",
                                                                   DIRECTION.get("DOWN_RIGHT"));
                expectedResult = [Immutable.fromJS({row: 7, col: 6, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });
        });
    });

    describe("getAvailableGridsGivenGrid", () => {
        it("return an array containing the grid that is available with given correct grid", () => {
            var result, expectedResult;
            result = BoardUtil.getAvailableGridsGivenGrid(Immutable.fromJS({row: 3, col: 3}),
                                                          testBoard,
                                                          "BLACK");
            expectedResult = [Immutable.fromJS({row: 2, col: 3, value: "AVAILABLE"}),
                              undefined,
                              Immutable.fromJS({row: 3, col: 2, value: "AVAILABLE"}),
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }

            result = BoardUtil.getAvailableGridsGivenGrid(Immutable.fromJS({row: 2, col: 2}),
                                                          testBoard,
                                                          "BLACK");
            expectedResult = [undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }
        });

        it("return an array containing the grid that is available with given exceed-border grid", () => {
            var result, expectedResult;
            result = BoardUtil.getAvailableGridsGivenGrid(Immutable.fromJS({row: 8, col: 3}),
                                                          testBoard,
                                                          "BLACK");
            expectedResult = [undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }

            result = BoardUtil.getAvailableGridsGivenGrid(Immutable.fromJS({row: 4, col: 8}),
                                                          testBoard,
                                                          "BLACK");
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }
        });
    });

    describe("getReversableGrids", () => {
        it("return an array containing the grid that is reversed according to given correct grid", () => {
            var result = BoardUtil.getReversableGrids(Immutable.fromJS({row: 3, col: 3}),
                                                      testBoard,
                                                      "WHITE"),
                expectedResult = [Immutable.fromJS({row: 4, col: 3, value: "WHITE"}),
                                  Immutable.fromJS({row: 5, col: 3, value: "WHITE"}),
                                  Immutable.fromJS({row: 3, col: 4, value: "WHITE"}),
                                  Immutable.fromJS({row: 3, col: 5, value: "WHITE"})];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }

            result = BoardUtil.getReversableGrids(Immutable.fromJS({row: 2, col: 2}),
                                                  testBoard,
                                                  "WHITE");
            expect(result.length).toEqual(0);

            result = BoardUtil.getReversableGrids(Immutable.fromJS({row: 8, col: 2}),
                                                  testBoard,
                                                  "WHITE");
            expect(result.length).toEqual(0);

            result = BoardUtil.getReversableGrids(Immutable.fromJS({row: 2, col: 8}),
                                                  testBoard,
                                                  "WHITE");
            expect(result.length).toEqual(0);
        });
    });

    describe("allAvailableGrids", () => {
        it("return an array containing the grid that is available in the board", () => {
            var result = BoardUtil.allAvailableGrids(testBoard, "WHITE"),
                expectedResult = [Immutable.fromJS({ "row": 2, "col": 4, "value": "AVAILABLE" }),
                                  Immutable.fromJS({ "row": 2, "col": 6, "value": "AVAILABLE" }),
                                  Immutable.fromJS({ "row": 4, "col": 2, "value": "AVAILABLE" }),
                                  Immutable.fromJS({ "row": 3, "col": 2, "value": "AVAILABLE" }),
                                  Immutable.fromJS({ "row": 5, "col": 2, "value": "AVAILABLE" }),
                                  Immutable.fromJS({ "row": 6, "col": 2, "value": "AVAILABLE" }),
                                  Immutable.fromJS({ "row": 7, "col": 4, "value": "AVAILABLE" }),
                                  Immutable.fromJS({ "row": 6, "col": 6, "value": "AVAILABLE" }),
                                  Immutable.fromJS({ "row": 7, "col": 6, "value": "AVAILABLE" })];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }
        });
    });

    describe("reverseGrids", () => {
        it("With given piece, board and player, return the board that the grids has been reversed.", () => {
            var result = BoardUtil.reverseGrids(Immutable.fromJS({row: 3, col: 3, value: "WHITE"}), testBoard, "WHITE"),
                expectedResult = [Immutable.fromJS({row: 4, col: 3, value: "WHITE"}),
                                  Immutable.fromJS({row: 5, col: 3, value: "WHITE"}),
                                  Immutable.fromJS({row: 3, col: 4, value: "WHITE"}),
                                  Immutable.fromJS({row: 3, col: 5, value: "WHITE"})],
                expectedBoard = BoardUtil.fillPieces(testBoard, expectedResult);
            expect(Immutable.is(expectedBoard, result)).toEqual(true);
        });
    });

    describe("clearAvailableGrids", () => {
        it("clear all the available grids from board", () => {
            var availableGrids = BoardUtil.allAvailableGrids(testBoard, "WHITE"),
                boardWithAvailableGrids = BoardUtil.fillPieces(testBoard, availableGrids),
                boardRemovedAvailableGrids = BoardUtil.clearAvailableGrids(boardWithAvailableGrids);
            expect(Immutable.is(testBoard, boardRemovedAvailableGrids)).toEqual(true);
        });
    });
});
