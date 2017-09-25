'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = SideNav;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SideNav(_ref) {
  var _this = this;

  var state = _ref.state;
  var views = state.views;

  this.sidenav = this.List({
    options: (0, _extends3.default)({}, this.defaultOptions, {
      parent: this.screen,
      label: 'GitToken',
      left: '0%',
      width: '10%',
      title: 'GitToken Contract Details',
      draggable: false,
      items: views
    }),
    select: function select(item, index) {
      _this.store.dispatch({ type: 'SET_VIEW', result: views[index] });
    }
  });
  this.screen.render();
}