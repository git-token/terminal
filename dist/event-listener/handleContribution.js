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
      organization = _ref.organization,
      decimals = _ref.decimals;

  return new _bluebird2.default(function (resolve, reject) {
    (0, _bluebird.join)(
    // this.ContributionHistory({ data, organization, decimals }),
    _this.TokenSupply({ organization: organization, decimals: decimals }),
    // this.SupplyGrowth({ data, organization, decimals }),
    _this.Leaderboard({ data: data, organization: organization })).then(function () {
      resolve(true);
    }).catch(function (error) {
      reject(error);
    });
  });
}