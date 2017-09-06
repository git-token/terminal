'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = List;

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _blessedContrib = require('blessed-contrib');

var _blessedContrib2 = _interopRequireDefault(_blessedContrib);

var _defaultOptions = require('./defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function List(_ref) {
  var options = _ref.options;
  var onSelect = _ref.onSelect;

  var list = _blessed2.default.list((0, _extends3.default)({}, options, _defaultOptions2.default));

  list.on('select', onSelect

  // Allow scrolling with the mousewheel (manually).
  // list.on('wheeldown', function() {
  //   list.down();
  // });
  //
  // list.on('wheelup', function() {
  //   list.up();
  // });

  // Select the first item.
  );list.select(0);

  this.screen.render();
}