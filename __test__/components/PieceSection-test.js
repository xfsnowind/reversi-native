jest.dontMock("../../src/js/components/PieceSection.react");
jest.dontMock("../../src/js/components/FlipperSection.react");
jest.dontMock("../../src/js/constants/ReversiConstants");

import React from 'react-native';
import ReactDOM from 'react-dom';
import TestUtils from "react-addons-test-utils";

const PieceSection = require('../../src/js/components/PieceSection.react');

describe("PieceSection", function() {
    it("get right class with given white grid", function() {
        var pieceSection = TestUtils.renderIntoDocument(<PieceSection player="WHITE" />),
            pieceWhiteNode = TestUtils.findRenderedDOMComponentWithClass(pieceSection, 'flipper__white');
        expect(ReactDOM.findDOMNode(pieceWhiteNode).className).toEqual("flipper__piece flipper__white flipper__front");

        pieceSection = TestUtils.renderIntoDocument(<PieceSection player="BLACK" />);
        var pieceBlackNode = TestUtils.findRenderedDOMComponentWithClass(pieceSection, 'flipper__black');
        expect(ReactDOM.findDOMNode(pieceBlackNode).className).toEqual("flipper__piece flipper__black flipper__front");
    });

    it("no dom node with empty grid", function() {
        var pieceSection = TestUtils.renderIntoDocument(<PieceSection player="EMPTY" />),
            pieceEmptyNodes = TestUtils.scryRenderedDOMComponentsWithTag(pieceSection, 'div');
        expect(pieceEmptyNodes.length).toEqual(0);

    })

    it("no dom node with available grid", function() {
        var pieceSection = TestUtils.renderIntoDocument(<PieceSection player="AVAILABLE" />),
            pieceAvailableNodes = TestUtils.scryRenderedDOMComponentsWithTag(pieceSection, 'div');
        expect(pieceAvailableNodes.length).toEqual(0);
    });
});
