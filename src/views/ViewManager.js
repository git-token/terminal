export default function ViewManager({ view, state }) {
  switch(view) {
    case 'Home':
      return this.Welcome({ state })
      break;
    case 'Organization':
      return this.Organization({ state })
      break;
    case 'Registry':
      return this.Registry({ state })
      break;
    default:
      return null
  }
}
