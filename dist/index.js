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

var _index = require('./components/index');

var _index2 = require('./views/Dashboard/index');

var _ViewManager = require('./views/ViewManager');

var _ViewManager2 = _interopRequireDefault(_ViewManager);

var _index3 = require('./views/Organization/index');

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

    // Components
    this.List = _index.List.bind(this);
    this.Table = _index.Table.bind(this);
    this.defaultOptions = _defaultOptions2.default;

    // Views
    this.Dashboard = _index2.Dashboard.bind(this);
    this.Organization = _index3.Organization.bind(this);
    this.SideNav = _index2.SideNav.bind(this);
    this.ViewManager = _ViewManager2.default.bind(this);
    this.Registry = _index2.Registry.bind(this);
    this.Welcome = _Welcome2.default.bind(this);

    // Quit on Escape, q, or Control-C.
    this.screen.key(['escape', 'q', 'C-c'], function (ch, key) {
      return process.exit(0);
    });

    // Connect To GitToken WebSocket Server
    this.gittoken = new _client2.default({ socketUri: socketUri });
    this.gittoken.on('connect', function () {
      _this.gittoken.socket.send((0, _stringify2.default)({ event: 'get_registered' }));
      _this.render();
    });

    // Hook Redux Store to incoming socket messages
    this.gittoken.on('data', function (data) {
      var msg = JSON.parse(data.toString('utf8'));
      var event = msg.event,
          result = msg.result;

      _this.store.dispatch({ type: event.toUpperCase(), result: result });
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
        var currentView = state.currentView;

        if (_this2.currentView != currentView) {
          _this2.currentView = currentView;
          _this2.ViewManager({ state: state, view: _this2.currentView });
        }
      });
    }
  }]);
  return GitTokenTerminal;
}();

exports.default = GitTokenTerminal;