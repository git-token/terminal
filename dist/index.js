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

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _blessedContrib = require('blessed-contrib');

var _blessedContrib2 = _interopRequireDefault(_blessedContrib);

var _index = require('./actions/index');

var _index2 = require('./components/index');

var _index3 = require('./views/Dashboard/index');

var _ViewManager = require('./views/ViewManager');

var _ViewManager2 = _interopRequireDefault(_ViewManager);

var _index4 = require('./views/Organization/index');

var _Welcome = require('./views/Welcome');

var _Welcome2 = _interopRequireDefault(_Welcome);

var _client = require('gittoken-socket/dist/client');

var _client2 = _interopRequireDefault(_client);

var _defaultOptions = require('./components/defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitTokenTerminal = function () {
  function GitTokenTerminal(_ref) {
    var _this = this;

    var title = _ref.title,
        socketUri = _ref.socketUri;
    (0, _classCallCheck3.default)(this, GitTokenTerminal);

    this.screen = _blessed2.default.screen({
      title: title,
      smartCSR: true,
      height: 600,
      width: 800
    });

    this.store = _store2.default;
    this.currentView = '';

    // Action Methods
    this.subscribe = _index.subscribe.bind(this);

    // Components
    this.List = _index2.List.bind(this);
    this.BarList = _index2.BarList.bind(this);
    this.Table = _index2.Table.bind(this);
    this.defaultOptions = _defaultOptions2.default;

    // Views
    this.Dashboard = _index3.Dashboard.bind(this);
    this.Organization = _index4.Organization.bind(this);
    this.TopNav = _index3.TopNav.bind(this);
    this.SideNav = _index3.SideNav.bind(this);
    this.ViewManager = _ViewManager2.default.bind(this);
    this.Registry = _index3.Registry.bind(this);
    this.Welcome = _Welcome2.default.bind(this);

    // Quit on Escape, q, or Control-C.
    this.screen.key(['escape', 'q', 'C-c'], function (ch, key) {
      return process.exit(0);
    });

    // Connect To GitToken WebSocket Server
    this.websocket = new _client2.default({ socketUri: socketUri });
    this.websocket.on('connect', function () {
      _this.websocket.socket.send((0, _stringify2.default)({ type: 'GET_REGISTERED' }));
      _this.render();
    });

    this.websocket.on('data', function (data) {
      var msg = JSON.parse(data.toString('utf8'));
      _this.store.dispatch(msg);
      // console.log('msg', msg)
      // if(msg.type == 'GET_REGISTERED') {
      //   this.store.dispatch(msg)
      // }
    });

    // Render the screen.
    this.screen.render();
  }

  (0, _createClass3.default)(GitTokenTerminal, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      // List for updates to the state and render views if necessary
      var unsubscribe = this.store.subscribe(function () {
        var state = _this2.store.getState();
        // console.log('state.organizations', state.organizations)
        var currentView = state.currentView;

        if (_this2.currentView != currentView) {
          _this2.currentView = currentView;
        }
        _this2.ViewManager({ state: state, view: _this2.currentView });
      });
    }
  }]);
  return GitTokenTerminal;
}();

exports.default = GitTokenTerminal;