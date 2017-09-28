'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _store = require('../redux/store');

var _store2 = _interopRequireDefault(_store);

var _handleEvent = require('./handleEvent');

var _handleEvent2 = _interopRequireDefault(_handleEvent);

var _handleContribution = require('./handleContribution');

var _handleContribution2 = _interopRequireDefault(_handleContribution);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('gittoken-contracts/build/contracts/GitToken.json'),
    abi = _require.abi,
    unlinked_binary = _require.unlinked_binary;

var GitTokenTerminalEventListener = function () {
  function GitTokenTerminalEventListener(_ref) {
    var _this = this;

    var web3Provider = _ref.web3Provider;
    (0, _classCallCheck3.default)(this, GitTokenTerminalEventListener);


    this.contracts = {};
    this.contractEvents = {};

    this.web3Provider = web3Provider ? web3Provider : 'https://torvalds.gittoken.io';
    this.web3 = new _web2.default(new _web2.default.providers.HttpProvider(this.web3Provider));
    this.store = _store2.default;

    this.handleEvent = _handleEvent2.default.bind(this);
    this.handleContribution = _handleContribution2.default.bind(this);

    process.on('message', function (msg) {
      var _JSON$parse = JSON.parse(msg),
          type = _JSON$parse.type,
          data = _JSON$parse.data;

      switch (type) {
        case 'WATCH_TOKEN':
          _this.watchToken(data);
        default:
          console.log('Invalid ' + type + ' Requested');
          return null;
      }
    });

    this.store.subscribe(function () {
      console.log('State: ' + (0, _stringify2.default)(_this.store.getState()));
    });
  }

  (0, _createClass3.default)(GitTokenTerminalEventListener, [{
    key: 'watchToken',
    value: function watchToken(_ref2) {
      var _this2 = this;

      var token = _ref2.token,
          organization = _ref2.organization;

      this.contracts[token] = this.web3.eth.contract(abi).at(token);
      this.contractEvents[token] = this.contracts[token].allEvents({ fromBlock: 0, toBlock: 'latest' });
      this.contractEvents[token].watch(function (error, result) {
        _this2.handleEvent({ data: result, organization: organization }).then(function (details) {
          console.log('details', details);
        }).catch(function (error) {
          console.log('error', error);
        });
      });
    }
  }]);
  return GitTokenTerminalEventListener;
}();

exports.default = GitTokenTerminalEventListener;