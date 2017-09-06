'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _blessedContrib = require('blessed-contrib');

var _blessedContrib2 = _interopRequireDefault(_blessedContrib);

var _index = require('./components/index');

var _client = require('gittoken-socket/dist/client');

var _client2 = _interopRequireDefault(_client);

var _defaultOptions = require('./components/defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitTokenTerminal = function GitTokenTerminal(_ref) {
  var _this = this;

  var title = _ref.title;
  var socketUri = _ref.socketUri;
  (0, _classCallCheck3.default)(this, GitTokenTerminal);

  this.screen = _blessed2.default.screen({
    title: title,
    smartCSR: true,
    height: 600,
    width: 800
  });

  this.List = _index.List.bind(this);
  this.Table = _index.Table.bind(this);
  this.Dashboard = _index.Dashboard.bind(this

  // Quit on Escape, q, or Control-C.
  );this.screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
  });

  this.gittoken = new _client2.default({ socketUri: socketUri });
  this.gittoken.on('connect', function () {
    _this.gittoken.socket.send((0, _stringify2.default)({ event: 'get_contract' }));
    _this.Dashboard({
      options: {
        parent: _this.screen,
        width: '100%',
        draggable: true
      }
    });
  }

  // Render the screen.
  );this.screen.render();
};

exports.default = GitTokenTerminal;