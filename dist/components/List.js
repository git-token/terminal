'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = List;

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function List(_ref) {
  var options = _ref.options,
      select = _ref.select;

  var list = _blessed2.default.list((0, _extends3.default)({}, options));
  list.on('select', select);
  return list;
}