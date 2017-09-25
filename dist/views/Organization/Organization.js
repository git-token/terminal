'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
  var currentOrganization = state.currentOrganization;
  var organization = currentOrganization.organization,
      token_address = currentOrganization.token_address,
      symbol = currentOrganization.symbol,
      name = currentOrganization.name,
      decimals = currentOrganization.decimals;


  this.screen.remove(this.registry);
  this.orgDetails = this.Table({
    options: (0, _extends3.default)({
      parent: this.screen,
      label: 'Details for ' + organization,
      top: '6%',
      height: '20%',
      width: '25%',
      align: 'left'
    }, this.defaultOptions, {
      rows: [['Organization', 'https://github.com/' + organization], ['Token Address', token_address], ['Token Symbol', symbol], ['Token Name', name], ['Token Decimals', String(decimals)], ['Token Supply', String(0)], ['']]
    })
  });

  this.leaderBoard = this.Table({
    options: (0, _extends3.default)({
      parent: this.screen,
      label: 'Leader Board for ' + organization,
      top: '26%',
      height: '20%',
      width: '25%',
      align: 'left'
    }, this.defaultOptions, {
      rows: [['Username', symbol + ' Balance', 'Percentage Contributed']]
    })
  });

  this.contributionHistory = this.Table({
    options: (0, _extends3.default)({
      parent: this.screen,
      label: 'Contribution History for ' + organization,
      top: '46%',
      height: '56%',
      width: '25%',
      align: 'left'
    }, this.defaultOptions, {
      rows: [['Username', 'Type', symbol + ' Awarded', 'Date']]
    })
  });

  this.screen.append(this.orgDetails);
  this.screen.append(this.leaderBoard);
  this.screen.append(this.contributionHistory);
  this.screen.render();
}