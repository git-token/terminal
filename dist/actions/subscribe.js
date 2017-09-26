'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = subscribe;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function subscribe(_ref) {
  var _this = this;

  var organization = _ref.organization,
      token = _ref.token;

  return function (dispatch) {
    _this.websocket.socket.send((0, _stringify2.default)({
      event: 'watch_token',
      data: {
        organization: organization,
        token: token
      }
    }));

    _this.websocket.on('data', function (msg) {
      console.log('msg', msg);
    });
  };
}