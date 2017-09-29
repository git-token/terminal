'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = TokenSupply;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TokenSupply(_ref) {
  var _this = this;

  var organization = _ref.organization;

  return new _bluebird2.default(function (resolve, reject) {
    try {
      var _store$getState = _this.store.getState(),
          organizations = _store$getState.organizations;

      var Contribution = organizations[organization].Contribution;


      var total = (0, _keys2.default)(Contribution).map(function (c) {
        var _Contribution$c$args = Contribution[c]['args'],
            value = _Contribution$c$args.value,
            reservedValue = _Contribution$c$args.reservedValue;

        return Number(+value + +reservedValue);
      }).reduce(function (t, v) {
        return t + v;
      });

      var reserved = (0, _keys2.default)(Contribution).map(function (c) {
        var _Contribution$c$args2 = Contribution[c]['args'],
            value = _Contribution$c$args2.value,
            reservedValue = _Contribution$c$args2.reservedValue;

        return Number(reservedValue);
      }).reduce(function (t, v) {
        return t + v;
      });

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

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}