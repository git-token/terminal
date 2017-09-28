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
      organization = _ref.organization,
      decimals = _ref.decimals;

  return new _bluebird2.default(function (resolve, reject) {
    var event = data.event,
        args = data.args,
        transactionHash = data.transactionHash,
        blockNumber = data.blockNumber;


    var payload = {
      type: 'ORGANIZATION_DATA_UPDATE',
      event: data['event'],
      org: organization,
      id: data['transactionHash'],
      data: data
    };

    _this.store.dispatch(payload);
    process.send(payload);

    var highestBlock = {
      type: 'ORGANIZATION_HIGHEST_BLOCK',
      org: organization,
      data: blockNumber
    };

    _this.store.dispatch(highestBlock);
    process.send(highestBlock);

    switch (event) {
      case 'Contribution':
        resolve(_this.handleContribution({ data: data, organization: organization, decimals: decimals }));
        break;
      default:
        console.log('Unhandled Event ' + event);
        return null;
    }
  });
}