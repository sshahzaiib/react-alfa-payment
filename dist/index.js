'use strict';

var React = require('react');

/**
 * Main Component
 */
function Index(props) {
    var _a, _b;
    return ((_a = props.render) !== null && _a !== void 0 ? _a : (React.createElement("button", { className: props.className }, (_b = props.message) !== null && _b !== void 0 ? _b : 'No Message')));
}

module.exports = Index;
//# sourceMappingURL=index.js.map
