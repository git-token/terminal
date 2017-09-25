'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = reducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_STATE = {
  views: ['Registry', 'Torvalds Network', 'Account'],
  currentView: 'Welcome',
  currentOrganization: {},
  registered: [],
  contributions: []
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case 'SET_ORGANIZATION':
      return (0, _extends3.default)({}, state, {
        currentOrganization: action.result
      });
      break;
    case 'SET_VIEW':
      return (0, _extends3.default)({}, state, {
        currentView: action.result
      });
      break;
    case 'GET_REGISTERED':
      return (0, _extends3.default)({}, state, {
        registered: action.result
      });
      break;
    default:
      state;
  }
}