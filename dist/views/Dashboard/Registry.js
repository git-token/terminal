'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = Registry;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Registry(_ref) {
  var _this = this;

  var state = _ref.state;
  var registered = state.registered;

  var registryRows = function registryRows(_ref2) {
    var registered = _ref2.registered;

    var items = registered.filter(function (item) {
      var deployed = item.deployed;

      if (deployed == 1) {
        return true;
      }
    }).map(function (item) {
      var organization = item.organization,
          token_address = item.token_address,
          name = item.name,
          symbol = item.symbol;

      return [String(organization), String(token_address), String(name), String(symbol)];
    });

    var rows = [['Organization', 'Token Address', 'Token Name', 'Symbol']].concat((0, _toConsumableArray3.default)(items));

    return rows;
  };

  this.TopNav({ state: state });
  this.registry ? this.screen.remove(this.registry) : null;
  this.registry = this.Table({
    options: (0, _extends3.default)({}, this.defaultOptions, {
      parent: this.screen,
      label: 'GitHub Organizations Registered with GitToken',
      align: 'left',
      width: '100%',
      top: '6%',
      height: '95%',
      rows: registryRows({ registered: registered })
    }),
    select: function select(item, index) {
      var result = registered[index - 1];
      var organization = result.organization,
          token_address = result.token_address;


      _this.store.dispatch({ type: 'SET_ORGANIZATION', result: result });
      _this.store.dispatch({ type: 'SET_VIEW', result: 'Organization' });
      _this.websocket.socket.send((0, _stringify2.default)({
        type: 'WATCH_TOKEN',
        data: { organization: organization, token: token_address }
      }));
      _this.screen.remove(_this.topnav);
    }
  });

  this.screen.remove(this.welcome);
  this.screen.append(this.registry);
  this.screen.remove(this.topnav);
  this.screen.render();
}