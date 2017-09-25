export default function ViewManager({ view, state }) {
  switch(view) {
    case 'Organization':
      return this.Organization({ state })
      break;
    case 'Registry':
      return this.Registry({ state })
      break;
    case 'Welcome':
      return this.Welcome({ state })
      break;
    default:
      return null
  }
}
