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

var _blessedContrib = require('blessed-contrib');

var _blessedContrib2 = _interopRequireDefault(_blessedContrib);

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


  if (organizations[organization] && organizations[organization]['Contribution'] && organizations[organization]['TokenSupply'] && organizations[organization]['SupplyGrowth']) {
    var _organizations$organi = organizations[organization],
        Contribution = _organizations$organi.Contribution,
        TokenSupply = _organizations$organi.TokenSupply,
        SupplyGrowth = _organizations$organi.SupplyGrowth;

    // console.log('SupplyGrowth', SupplyGrowth)

    this.screen.remove(this.registry);
    this.orgDetails ? this.screen.remove(this.orgDetails) : null;
    this.leaderBoard ? this.screen.remove(this.leaderBoard) : null;
    this.contributionHistory ? this.screen.remove(this.contributionHistory) : null;
    this.supplyChart ? this.screen.remove(this.supplyChart) : null;

    this.orgDetails = this.Table({
      options: (0, _extends3.default)({
        parent: this.screen,
        label: 'Details for ' + organization,
        top: '10%',
        height: '20%',
        width: '33%',
        align: 'left'
      }, this.defaultOptions, {
        rows: [['Organization', 'https://github.com/' + organization], ['Token Address', token_address], ['Token Symbol', symbol], ['Token Name', name], ['Token Decimals', String(decimals)], ['Token Supply', String(TokenSupply.total / Math.pow(10, decimals))], ['']]
      })
    });

    this.leaderBoard = this.Table({
      options: (0, _extends3.default)({
        parent: this.screen,
        label: 'Leader Board for ' + organization,
        top: '30%',
        height: '20%',
        width: '33%',
        align: 'left'
      }, this.defaultOptions, {
        rows: [['Username', symbol + ' Balance', 'Percentage Contributed']]
      })
    });

    var contributionHistory = (0, _keys2.default)(Contribution).sort(function (a, b) {
      return Contribution[b]['args']['date'] - Contribution[a]['args']['date'];
    }).filter(function (c, i) {
      if (Contribution[c] && i < 50) {
        return true;
      }
    }).map(function (c) {
      var _Contribution$c$args = Contribution[c]['args'],
          username = _Contribution$c$args.username,
          rewardType = _Contribution$c$args.rewardType,
          reservedType = _Contribution$c$args.reservedType,
          value = _Contribution$c$args.value,
          date = _Contribution$c$args.date;

      return [String(username), String(rewardType + ' ' + reservedType), String(value / Math.pow(10, decimals)), String(new Date(date * 1000).toLocaleString())];
    });

    this.contributionHistory = this.Table({
      options: (0, _extends3.default)({
        parent: this.screen,
        label: 'Contribution History for ' + organization,
        top: '50%',
        height: '50%',
        width: '33%',
        align: 'left'
      }, this.defaultOptions, {
        rows: [['Username', 'Type', symbol + ' Awarded', 'Date']].concat((0, _toConsumableArray3.default)(contributionHistory))
      })
    });

    this.supplyChart = _blessedContrib2.default.line((0, _extends3.default)({}, this.defaultOptions, {
      xLabelPadding: 10,
      xPadding: 5,
      showLegend: true,
      top: '10%',
      left: '33%',
      height: '40%',
      width: '67%',
      wholeNumbersOnly: true,
      label: 'Supply of ' + symbol + ' Token'
    }));

    this.screen.append(this.supplyChart);

    var totalSupply = {
      title: '' + symbol,
      x: (0, _keys2.default)(SupplyGrowth).map(function (s) {
        return new Date(SupplyGrowth[s].date).toDateString();
      }),
      y: (0, _keys2.default)(SupplyGrowth).map(function (s) {
        return SupplyGrowth[s]['value']['total'] / Math.pow(10, decimals);
      })
    };

    this.supplyChart.setData(totalSupply);

    this.screen.append(this.orgDetails);
    this.screen.append(this.leaderBoard);
    this.screen.append(this.contributionHistory);
    this.screen.render();
  }
}