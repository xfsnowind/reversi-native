jest.dontMock("../../src/js/components/PieceSection.react");
jest.dontMock("../../src/js/components/FlipperSection.react");
jest.dontMock("../../src/js/components/GridSection.react");
jest.dontMock("../../src/js/actions/PlayerActionCreators");
jest.dontMock("../../src/js/constants/ReversiConstants");

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from "react-addons-test-utils";
import Immutable from 'immutable';

const GridSection = require('../../src/js/components/GridSection.react');

describe("GridSection", function() {
    it("get right class with given grid", function() {

        var emptyGrid = Immutable.fromJS({"value": "EMPTY"}),
            whiteGrid = Immutable.fromJS({"value": "WHITE"}),
            availableGrid = Immutable.fromJS({"value": "AVAILABLE"});

        var emptyGridSection = TestUtils.renderIntoDocument(<GridSection grid={emptyGrid} />),
            whiteGridSection = TestUtils.renderIntoDocument(<GridSection grid={whiteGrid} />),
            availableGridSection = TestUtils.renderIntoDocument(<GridSection grid={availableGrid} />);

        var emptyGridNode = TestUtils.findRenderedDOMComponentWithClass(emptyGridSection, "grid");
        expect(ReactDOM.findDOMNode(emptyGridNode).className).toEqual("grid");

        var availableGridNode = TestUtils.findRenderedDOMComponentWithClass(availableGridSection, "grid");
        expect(ReactDOM.findDOMNode(availableGridNode).className).toEqual("grid grid--available");


        var whiteGridNode = TestUtils.findRenderedDOMComponentWithClass(whiteGridSection, "grid"),
            flipperNode = TestUtils.scryRenderedDOMComponentsWithClass(whiteGridSection, "flipper__piece");
        expect(flipperNode.length).toEqual(2);
        expect(ReactDOM.findDOMNode(flipperNode[0]).className).toEqual("flipper__piece flipper__white flipper__front");
        expect(ReactDOM.findDOMNode(flipperNode[1]).className).toEqual("flipper__piece flipper__black flipper__back");
        expect(ReactDOM.findDOMNode(whiteGridNode).className).toEqual("grid");
    });
});
