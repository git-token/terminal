'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TokenSupply;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TokenSupply(_ref) {
  var _this = this;

  var data = _ref.data,
      organization = _ref.organization;

  return new _bluebird2.default(function (resolve, reject) {
    try {
      var _data$args = data.args,
          value = _data$args.value,
          reservedValue = _data$args.reservedValue,
          date = _data$args.date,
          transactionHash = data.transactionHash;

      var _store$getState = _this.store.getState(),
          organizations = _store$getState.organizations;

      var total = void 0,
          reserved = void 0;

      if (organizations[organization] && organizations[organization]['TokenSupply']) {
        total = organizations[organization]['TokenSupply'].total + Number(value.toNumber() + reservedValue.toNumber());

        reserved = organizations[organization]['TokenSupply'].reserved + Number(reservedValue.toNumber());
      } else {
        total = Number(value.toNumber() + reservedValue.toNumber());
        reserved = Number(reservedValue.toNumber());
      }

      var payloadTotal = {
        type: 'ORGANIZATION_DATA_UPDATE',
        org: organization,
        event: 'TokenSupply',
        id: 'total',
        data: total
      };

      var payloadReserved = {
        type: 'ORGANIZATION_DATA_UPDATE',
        event: 'TokenSupply',
        org: organization,
        id: 'reserved',
        data: reserved
      };

      _this.store.dispatch(payloadTotal);
      _this.store.dispatch(payloadReserved);

      process.send(payloadTotal);
      process.send(payloadReserved);

      resolve({
        date: new Date(date.toNumber() * 1000).getTime(),
        organization: organization,
        value: {
          total: total,
          reserved: reserved
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}