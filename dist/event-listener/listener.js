'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectDestructuringEmpty2 = require('babel-runtime/helpers/objectDestructuringEmpty');

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

exports.default = listener;

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function listener(_ref) {
  (0, _objectDestructuringEmpty3.default)(_ref);

  this.eventListener = (0, _child_process.fork)('./dist/event-listener/server.js');
}