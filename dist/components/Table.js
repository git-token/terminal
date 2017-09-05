'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = Table;

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _blessedContrib = require('blessed-contrib');

var _blessedContrib2 = _interopRequireDefault(_blessedContrib);

var _defaultOptions = require('./defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Table(_ref) {
  var options = _ref.options;
  var onSelect = _ref.onSelect;

  var table = _blessed2.default.table((0, _extends3.default)({
    parent: this.screen
  }, options, _defaultOptions2.default));

  table.on('select', onSelect

  // Allow scrolling with the mousewheel (manually).
  // table.on('wheeldown', function() {
  //   table.down();
  // });
  //
  // table.on('wheelup', function() {
  //   table.up();
  // });

  );this.screen.render();
}