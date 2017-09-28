'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ContributionHistory;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ContributionHistory(_ref) {
  var _this = this;

  var data = _ref.data,
      organization = _ref.organization,
      decimals = _ref.decimals;

  return new _bluebird2.default(function (resolve, reject) {
    var _data$args = data.args,
        username = _data$args.username,
        value = _data$args.value,
        date = _data$args.date,
        rewardType = _data$args.rewardType,
        reservedType = _data$args.reservedType;

    var _store$getState = _this.store.getState(),
        organizations = _store$getState.organizations;

    var contributionHistory = [];

    if (organizations[organization] && organizations[organization]['ContributionHistory']) {
      contributionHistory = organizations[organization]['ContributionHistory']['data'];
    }

    var updatedHistory = [String(username), String(rewardType + ' ' + reservedType), String(value.toNumber() / Math.pow(10, decimals)), String(new Date(date.toNumber() * 1000).toLocaleString())];

    // Cleanup contributionHistory when over 50 items in array
    contributionHistory.length > 50 ?
    // Remove first (oldest) element in the array
    contributionHistory.shift() : null;

    contributionHistory.push(updatedHistory);

    var payload = {
      type: 'ORGANIZATION_DATA_UPDATE',
      event: 'ContributionHistory',
      org: organization,
      id: 'data',
      data: contributionHistory
    };

    _this.store.dispatch(payload);
    process.send(payload);

    resolve(true);
  });
}