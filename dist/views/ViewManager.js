'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ViewManager;
function ViewManager(_ref) {
  var view = _ref.view,
      state = _ref.state;

  switch (view) {
    case 'Organization':
      return this.Organization({ state: state });
      break;
    case 'Registry':
      return this.Registry({ state: state });
      break;
    case 'Welcome':
      return this.Welcome({ state: state });
      break;
    default:
      return null;
  }
}