'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = Dashboard;

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _blessedContrib = require('blessed-contrib');

var _blessedContrib2 = _interopRequireDefault(_blessedContrib);

var _defaultOptions = require('./defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Dashboard(_ref) {
  var _this = this;

  var options = _ref.options;
  var onSelect = _ref.onSelect;

  var dashboard = _blessed2.default.box((0, _extends3.default)({}, options, _defaultOptions2.default));

  this.gittoken.on('data', function (data) {
    var _JSON$parse = JSON.parse(data);

    var event = _JSON$parse.event;
    var result = _JSON$parse.result;

    if (event == 'get_contract') {
      var items = (0, _keys2.default)(result[0]).filter(function (item) {
        if (item) {
          return true;
        }
      }).map(function (item) {
        return [String(item), String(result[0][item])];
      });
      var rows = [].concat((0, _toConsumableArray3.default)(items));

      _this.Table({
        options: {
          parent: dashboard,
          left: 'center',
          align: 'left',
          height: '50%',
          width: '50%',
          title: 'GitToken Contract Details',
          draggable: true,
          noCellBorders: true,
          pad: 1,
          rows: rows
        },
        onSelect: function onSelect(item, index) {
          console.log(index);
        }
      }

      // this.List({
      //   options: {
      //     parent: dashboard,
      //     left: 'center',
      //     height: '50%',
      //     width: '50%',
      //     title: 'GitToken Contract Details',
      //     draggable: true,
      //     items
      //   },
      //   onSelect: (item, index) => { console.log(index) }
      // })
      );
    }
  });

  this.screen.render();
}