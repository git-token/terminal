'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = TopNav;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TopNav(_ref) {
  var _this = this;

  var state = _ref.state;
  var views = state.views;

  this.topnav = this.BarList({
    options: (0, _extends3.default)({}, this.defaultOptions, {
      parent: this.screen,
      label: 'GitToken',
      height: '10%',
      draggable: false,
      items: views
    }),
    select: function select(item, index) {
      // disabled
      // this.store.dispatch({ type: 'SET_VIEW', views[index] })
    }
  });

  this.topnav.key(views.map(function (v, i) {
    return String(i + 1);
  }), function (v, key) {
    var result = views[+v - 1];
    _this.store.dispatch({ type: 'SET_VIEW', result: result });
  });

  this.screen.append(this.topnav);
  this.screen.render();
}