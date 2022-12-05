'use strict';

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/**
 * Main Component
 */
function Index(props) {
    var _a, _b;
    return ((_a = props.render) !== null && _a !== void 0 ? _a : (React__default["default"].createElement("button", { className: props.className }, (_b = props.message) !== null && _b !== void 0 ? _b : 'No Message')));
}

module.exports = Index;
//# sourceMappingURL=index.js.map
