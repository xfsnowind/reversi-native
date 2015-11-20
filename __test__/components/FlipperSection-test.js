jest.dontMock("../../src/js/components/FlipperSection.react");

import React from 'react-native';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

let FlipperSection = require('../../src/js/components/FlipperSection.react');

describe("FlipperSection", function() {
    it("get right class with given player", function() {
        let flipperSection = TestUtils.renderIntoDocument(<FlipperSection player="WHITE" />),
            flipperWhiteNode = TestUtils.findRenderedDOMComponentWithClass(flipperSection, 'flipper__white');

        expect(ReactDOM.findDOMNode(flipperWhiteNode).className).toEqual("flipper__piece flipper__white flipper__front");
    });
});
