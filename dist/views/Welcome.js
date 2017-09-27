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

  this.topnav ? this.screen.remove(this.topnav) : null;

  this.TopNav({ state: state });
  // this.SideNav({ state })
  this.welcome = _blessed2.default.textarea((0, _extends3.default)({
    parent: this.screen,
    label: value,
    top: '10%',
    height: '91%',
    width: '100%',
    align: 'center',
    value: value
  }, this.defaultOptions));

  (0, _figlet2.default)(value, {
    font: 'block'
  }, function (error, result) {
    if (!error) {
      _this.welcome.setValue('\n\n\n\n        ' + value + ' (alpha)\n\n\n\n        Hello! Thank You for using GitToken!\n\n        Please review our Terms of Service (ToS) before continuing\n\n        https://github.com/git-token/documentation/blob/master/tos/terms_of_services.md\n\n\n\n        Happy Coding!\n      ');
      _this.screen.append(_this.welcome);
      _this.screen.render();
    }
  });
}