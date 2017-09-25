import blessed from 'blessed';
import contrib from 'blessed-contrib'

import defaultOpts from '../../components/defaultOptions'

export default function Dashboard({ options }) {
  this.dashboard = blessed.box({
    ...options,
    ...defaultOpts
  });

  this.sidenav = this.SideNav({
    options: {
      ...options, ...defaultOpts
    }
  })

  this.Welcome({
    options: {
      ...options, ...defaultOpts
    }
  })

  this.screen.render()
}
