'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleEvent;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleEvent(_ref) {
  var _this = this;

  var data = _ref.data,
      organization = _ref.organization;

  return new _bluebird2.default(function (resolve, reject) {
    var event = data.event,
        args = data.args,
        transactionHash = data.transactionHash;

    switch (event) {
      case 'Contribution':
        resolve(_this.handleContribution({ data: data, organization: organization }));
        break;
      default:
        console.log('Unhandled Event ' + event);
        return null;
    }
  });
}