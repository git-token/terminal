'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _index = require('./utils/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonfile = (0, _bluebird.promisifyAll)(require('jsonfile'));

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
    this.cacheFile = __dirname + '/../../cache/cache.json';

    this.web3Provider = web3Provider ? web3Provider : 'https://torvalds.gittoken.io';
    this.web3 = new _web2.default(new _web2.default.providers.HttpProvider(this.web3Provider));
    this.store = _store2.default;

    this.handleEvent = _handleEvent2.default.bind(this);
    this.handleContribution = _handleContribution2.default.bind(this);
    this.ContributionHistory = _index.ContributionHistory.bind(this);
    this.SupplyGrowth = _index.SupplyGrowth.bind(this);
    this.TokenSupply = _index.TokenSupply.bind(this);
    this.cacheState = _index.cacheState.bind(this);
    this.retrieveState = _index.retrieveState.bind(this);

    this.retrieveState().then(function (state) {
      // console.log('Retrieved State: ', state)
    }).catch(function (error) {
      console.log('error', error);
    });

    process.on('message', function (msg) {
      var _JSON$parse = JSON.parse(msg),
          type = _JSON$parse.type,
          data = _JSON$parse.data;

      switch (type) {
        case 'WATCH_TOKEN':
          _this.watchToken(data);
          break;
        default:
          console.log('Invalid ' + type + ' Requested');
          return null;
      }
    });

    this.store.subscribe(function () {
      _this.cacheState({
        data: _this.store.getState()['organizations']
      }).then(function (cached) {
        // console.log(cached)
      }).catch(function (error) {
        console.log('error');
      });
    });
  }

  (0, _createClass3.default)(GitTokenTerminalEventListener, [{
    key: 'watchToken',
    value: function watchToken(data) {
      var _this2 = this;

      var token = data.token,
          organization = data.organization,
          decimals = data.decimals;


      var fromBlock = data['fromBlock'] ? data['fromBlock'] : 0;
      var toBlock = data['toBlock'] ? data['toBlock'] : 'latest';

      this.contracts[token] = this.web3.eth.contract(abi).at(token);
      this.contractEvents[token] = this.contracts[token].allEvents({ fromBlock: fromBlock, toBlock: toBlock });
      this.contractEvents[token].watch(function (error, result) {
        _this2.handleEvent({ data: result, organization: organization, decimals: decimals }).then(function (details) {/*console.log('details', details)*/}).catch(function (error) {
          console.log('error', error);
        });
      });
    }
  }]);
  return GitTokenTerminalEventListener;
}();

exports.default = GitTokenTerminalEventListener;