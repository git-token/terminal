'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = Leaderboard;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Leaderboard(_ref) {
  var _this = this;

  var data = _ref.data,
      organization = _ref.organization;

  return new _bluebird2.default(function (resolve, reject) {
    var _store$getState = _this.store.getState(),
        organizations = _store$getState.organizations;

    var Contribution = organizations[organization].Contribution;


    var leaderboard = {};
    _bluebird2.default.resolve((0, _keys2.default)(Contribution)).map(function (c) {
      var _Contribution$c$args = Contribution[c]['args'],
          username = _Contribution$c$args.username,
          value = _Contribution$c$args.value;

      leaderboard['total'] ? leaderboard['total'] += Number(value) : leaderboard['total'] = Number(value);

      leaderboard[username] ? leaderboard[username] += Number(value) : leaderboard[username] = Number(value);
    }).then(function () {
      var payload = {
        type: 'ORGANIZATION_DATA_UPDATE',
        org: organization,
        event: 'Leaderboard',
        id: 'data',
        data: leaderboard
      };
      _this.store.dispatch(payload);
      process.send(payload);
      resolve();
    }).catch(function (error) {
      reject(error);
    });
  });
}