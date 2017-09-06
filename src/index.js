import blessed from 'blessed';
import contrib from 'blessed-contrib';
import { Dashboard, List, Table } from './components/index'
import GitTokenSocketClient from 'gittoken-socket/dist/client'
import defaultOpts from './components/defaultOptions'


export default class GitTokenTerminal {
  constructor({ title, socketUri }) {
    this.screen = blessed.screen({
      title: title,
      smartCSR: true,
      height: 600,
      width: 800
    })

    this.List = List.bind(this)
    this.Table = Table.bind(this)
    this.Dashboard = Dashboard.bind(this)

    // Quit on Escape, q, or Control-C.
    this.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
      return process.exit(0);
    });

    this.gittoken = new GitTokenSocketClient({ socketUri })
    this.gittoken.on('connect', () => {
      this.gittoken.socket.send(JSON.stringify({ event: 'get_contract' }))
      this.Dashboard({
        options: {
          parent: this.screen,
          width: '100%',
          draggable: true
        }
      })
    })

    // Render the screen.
    this.screen.render();

  }
}
