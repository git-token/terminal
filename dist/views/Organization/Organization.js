'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = Organization;

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [Organization description]
 * @param {[type]} options      [description]
 * @param {[type]} organization [description]
 */
function Organization(_ref) {
  var state = _ref.state;
  var currentOrganization = state.currentOrganization,
      organizations = state.organizations;
  var organization = currentOrganization.organization,
      token_address = currentOrganization.token_address,
      symbol = currentOrganization.symbol,
      name = currentOrganization.name,
      decimals = currentOrganization.decimals;


  this.screen.remove(this.registry);
  this.orgDetails ? this.screen.remove(this.orgDetails) : null;
  this.leaderBoard ? this.screen.remove(this.leaderBoard) : null;
  this.contributionHistory ? this.screen.remove(this.contributionHistory) : null;

  this.orgDetails = this.Table({
    options: (0, _extends3.default)({
      parent: this.screen,
      label: 'Details for ' + organization,
      top: '20%',
      height: '20%',
      width: '33%',
      align: 'left'
    }, this.defaultOptions, {
      rows: [['Organization', 'https://github.com/' + organization], ['Token Address', token_address], ['Token Symbol', symbol], ['Token Name', name], ['Token Decimals', String(decimals)], ['Token Supply', String(0)], ['']]
    })
  });

  this.leaderBoard = this.Table({
    options: (0, _extends3.default)({
      parent: this.screen,
      label: 'Leader Board for ' + organization,
      top: '40%',
      height: '20%',
      width: '33%',
      align: 'left'
    }, this.defaultOptions, {
      rows: [['Username', symbol + ' Balance', 'Percentage Contributed']]
    })
  });

  var contributionHistory = [];
  if (organizations[organization] && organizations[organization]['Contribution']) {
    var Contribution = organizations[organization].Contribution;


    contributionHistory = (0, _keys2.default)(Contribution).sort(function (a, b) {
      return Contribution[b]['data']['date'] - Contribution[a]['data']['date'];
    }).filter(function (c, i) {
      if (i < 25) {
        return true;
      }
    }).map(function (c) {
      var _Contribution$c$data = Contribution[c].data,
          username = _Contribution$c$data.username,
          rewardType = _Contribution$c$data.rewardType,
          reservedType = _Contribution$c$data.reservedType,
          value = _Contribution$c$data.value,
          date = _Contribution$c$data.date;

      return [String(username), String(rewardType + ' ' + reservedType), String(value / Math.pow(10, decimals)), String(new Date(date * 1000).toLocaleString())];
    });
  }

  this.contributionHistory = this.Table({
    options: (0, _extends3.default)({
      parent: this.screen,
      label: 'Contribution History for ' + organization,
      top: '60%',
      height: '40%',
      width: '33%',
      align: 'left'
    }, this.defaultOptions, {
      rows: [['Username', 'Type', symbol + ' Awarded', 'Date']].concat((0, _toConsumableArray3.default)(contributionHistory))
    })
  });

  this.screen.append(this.orgDetails);
  this.screen.append(this.leaderBoard);
  this.screen.append(this.contributionHistory);
  this.screen.render();
}