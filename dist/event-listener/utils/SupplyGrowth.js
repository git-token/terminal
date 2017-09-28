'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SupplyGrowth;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SupplyGrowth(_ref) {
  var _this = this;

  var data = _ref.data,
      organization = _ref.organization;

  return new _bluebird2.default(function (resolve, reject) {
    _this.TokenSupply({ data: data, organization: organization }).then(function (_ref2) {
      var date = _ref2.date,
          value = _ref2.value;
      var reservedValue = data.args.reservedValue,
          transactionHash = data.transactionHash;

      var payload = {
        type: 'ORGANIZATION_DATA_UPDATE',
        event: 'SupplyGrowth',
        org: organization,
        id: transactionHash,
        data: { value: value, date: date }
      };

      _this.store.dispatch(payload);
      process.send(payload);

      resolve(true);
    }).catch(function (error) {
      reject(error);
    });
  });
}