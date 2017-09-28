'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleContribution;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleContribution(_ref) {
  var _this = this;

  var data = _ref.data,
      organization = _ref.organization;

  return new _bluebird2.default(function (resolve, reject) {
    _this.store.dispatch({
      type: 'WATCH_TOKEN',
      event: data['event'],
      org: organization,
      id: data['transactionHash'],
      data: data
    });
  });
}