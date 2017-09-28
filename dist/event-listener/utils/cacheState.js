'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = cacheState;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonfile = (0, _bluebird.promisifyAll)(require('jsonfile'));

function cacheState(_ref) {
  var _this = this;

  var data = _ref.data;

  return new _bluebird2.default(function (resolve, reject) {
    jsonfile.writeFileAsync(_this.cacheFile, JSON.parse((0, _stringify2.default)(data)), { flag: 'w' }).then(function () {
      resolve(true);
    }).catch(function (error) {
      reject(error);
    });
  });
}