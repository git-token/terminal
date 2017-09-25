'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = Dashboard;

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _blessedContrib = require('blessed-contrib');

var _blessedContrib2 = _interopRequireDefault(_blessedContrib);

var _defaultOptions = require('../../components/defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Dashboard(_ref) {
  var options = _ref.options;

  this.dashboard = _blessed2.default.box((0, _extends3.default)({}, options, _defaultOptions2.default));

  this.sidenav = this.SideNav({
    options: (0, _extends3.default)({}, options, _defaultOptions2.default)
  });

  this.Welcome({
    options: (0, _extends3.default)({}, options, _defaultOptions2.default)
  });

  this.screen.render();
}