'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SupplyGrowth;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SupplyGrowth(_ref) {
  var data = _ref.data,
      organization = _ref.organization;

  return new _bluebird2.default(function (resolve, reject) {
    // const { args: { reservedValue }, transactionHash } = data
    // const payload = {
    //   type: 'ORGANIZATION_DATA_UPDATE',
    //   event: 'SupplyGrowth',
    //   org: organization,
    //   id: transactionHash,
    //   data: { value, date }
    // }
    //
    // this.store.dispatch(payload)
    // process.send(payload)
    //
    // resolve(true)
  });
}