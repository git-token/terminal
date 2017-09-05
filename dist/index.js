'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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
    smartCSR: true,
    height: 600,
    width: 800
  });

  this.screen.title = title;

  this.contractDetails = _index.contractDetails.bind(this
  // this.contractDetails()

  );this.List = _index.List.bind(this);
  this.Table = _index.Table.bind(this);

  this.grid = new _blessedContrib2.default.grid({
    rows: 12,
    cols: 12,
    screen: this.screen
  });

  // Quit on Escape, q, or Control-C.
  this.screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
  });

  this.gittoken = new _client2.default({ socketUri: socketUri });

  this.gittoken.on('data', function (data) {
    var _JSON$parse = JSON.parse(data);

    var event = _JSON$parse.event;
    var result = _JSON$parse.result;


    var headers = (0, _keys2.default)(result[0]);
    var items = (0, _keys2.default)(result[0]).map(function (item) {
      return String(result[0][item]);
    });
    var rows = [headers, items];

    _this.grid.set(0, 0, 2, 12, _blessed2.default.table, (0, _extends3.default)({}, _defaultOptions2.default, {
      align: 'left',
      title: 'GitToken Contract Details',
      rows: rows
    }));

    _this.grid.set(1, 0, 8, 4, _blessed2.default.list, (0, _extends3.default)({}, _defaultOptions2.default, {
      title: 'GitToken Contract Details',
      items: items
    }));

    _this.screen.render();

    // this.Table({
    //   options: {
    //     top: "80%",
    //     width: '100%',
    //     height: '100%',
    //     title: 'GitToken Contract Details',
    //     rows
    //   },
    //   onSelect: (item, index) => { console.log(index) }
    // })

    // this.List({
    //   options: {
    //     bottom: "60%",
    //     height: '100%',
    //     width: '100%',
    //     title: 'GitToken Contract Details',
    //     items
    //   },
    //   onSelect: (item, index) => { console.log(index) }
    // })
  }

  // Render the screen.
  );this.screen.render();
};

exports.default = GitTokenTerminal;