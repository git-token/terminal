'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = Welcome;

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _figlet = require('figlet');

var _figlet2 = _interopRequireDefault(_figlet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Welcome(_ref) {
  var _this = this;

  var state = _ref.state;

  var value = 'GitToken Terminal v' + require('../../package.json').version;

  this.sidenav ? this.screen.remove(this.sidenav) : null;

  this.SideNav({ state: state });
  this.welcome = _blessed2.default.textarea((0, _extends3.default)({
    parent: this.screen,
    label: '' + value,
    height: '100%',
    width: '90%',
    align: 'center',
    left: '10%',
    top: 'center',
    value: value
  }, this.defaultOptions));

  (0, _figlet2.default)(value, {
    font: 'block'
  }, function (error, result) {
    if (!error) {
      _this.welcome.setValue(result);
    }
  });

  this.screen.append(this.welcome);
  this.screen.render();
}