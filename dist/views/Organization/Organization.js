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
  var _state$currentOrganiz = state.currentOrganization,
      organization = _state$currentOrganiz.organization,
      token_address = _state$currentOrganiz.token_address;


  this.screen.remove(this.registry);
  this.orgDetails = this.Table({
    options: (0, _extends3.default)({
      parent: this.screen,
      label: 'Details for ' + organization,
      left: '10%',
      width: '20%',
      align: 'left'
    }, this.defaultOptions, {
      rows: [['Organization', organization], ['Token Address', token_address]]
    })
  });
  this.screen.append(this.orgDetails);
  this.screen.render();
}