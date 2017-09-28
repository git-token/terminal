'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends7 = require('babel-runtime/helpers/extends');

var _extends8 = _interopRequireDefault(_extends7);

exports.default = reducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_STATE = {
  views: ['Registry', 'Torvalds Network', 'Account', 'Exchange', 'Home'],
  currentView: 'Home',
  currentOrganization: {},
  registered: [],
  organizations: {}
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case 'ORGANIZATION_DATA_UPDATE':

      state['organizations'][action.org] = !state['organizations'][action.org] ? {} : state['organizations'][action.org];

      return (0, _extends8.default)({}, state, {
        organizations: (0, _extends8.default)({}, state['organizations'], (0, _defineProperty3.default)({}, action.org, (0, _extends8.default)({}, state['organizations'][action.org], (0, _defineProperty3.default)({}, action.event, (0, _extends8.default)({}, state['organizations'][action.org][action.event], (0, _defineProperty3.default)({}, action.id, action.data))))))
      });
      break;
    case 'ORGANIZATION_HIGHEST_BLOCK':
      return (0, _extends8.default)({}, state, {
        organizations: (0, _extends8.default)({}, state['organizations'], (0, _defineProperty3.default)({}, action.org, (0, _extends8.default)({}, state['organizations'][action.org], {
          fromBlock: action.data
        })))
      });
      break;
    case 'ORGANIZATION_DATA':
      return (0, _extends8.default)({}, state, {
        organizations: (0, _extends8.default)({}, state['organizations'], (0, _defineProperty3.default)({}, action.org, action.data))
      });
      break;
    case 'CACHED_ORGANIZATIONS':
      return (0, _extends8.default)({}, state, {
        organizations: action.data
      });
      break;
    case 'SET_ORGANIZATION':
      return (0, _extends8.default)({}, state, {
        currentOrganization: action.result
      });
      break;
    case 'SET_VIEW':
      return (0, _extends8.default)({}, state, {
        currentView: action.result
      });
      break;
    case 'GET_REGISTERED':
      return (0, _extends8.default)({}, state, {
        registered: action.result
      });
      break;
    default:
      return state;
  }
}