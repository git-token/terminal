'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = retrieveState;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonfile = (0, _bluebird.promisifyAll)(require('jsonfile'));

function retrieveState() {
  var _this = this;

  return new _bluebird2.default(function (resolve, reject) {
    jsonfile.readFileAsync(_this.cacheFile).then(function (data) {
      var payload = {
        type: 'CACHED_ORGANIZATIONS',
        data: data
      };
      process.send(payload);
      _this.store.dispatch(payload);
      resolve(data);
    }).catch(function (error) {
      reject(error);
    });
  });
}