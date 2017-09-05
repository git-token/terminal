import blessed from 'blessed';
import contrib from 'blessed-contrib';
import { contractDetails, List, Table } from './components/index'
import GitTokenSocketClient from 'gittoken-socket/dist/client'
import defaultOpts from './components/defaultOptions'


export default class GitTokenTerminal {
  constructor({ title, socketUri }) {
    this.screen = blessed.screen({
      smartCSR: true,
      height: 600,
      width: 800
    })

    this.screen.title = title

    this.contractDetails = contractDetails.bind(this)
    // this.contractDetails()

    this.List = List.bind(this)
    this.Table = Table.bind(this)

    this.grid = new contrib.grid({
      rows: 12,
      cols: 12,
      screen: this.screen
    })

    // Quit on Escape, q, or Control-C.
    this.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
      return process.exit(0);
    });

    this.gittoken = new GitTokenSocketClient({ socketUri })

    this.gittoken.on('data', (data) => {
      const { event, result } = JSON.parse(data)



      const headers = Object.keys(result[0])
      const items = Object.keys(result[0]).map((item) => { return String(result[0][item]) })
      const rows = [ headers, items ]

      this.grid.set(0,0,2,12, blessed.table, {
        ...defaultOpts,
        align: 'left',
        title: 'GitToken Contract Details',
        rows
      })

      this.grid.set(1,0,8,4, blessed.list, {
        ...defaultOpts,
        title: 'GitToken Contract Details',
        items
      })

      this.screen.render();

      // this.Table({
      //   options: {
      //     top: "80%",
      //     width: '100%',
      //     height: '100%',
      //     title: 'GitToken Contract Details',
      //     rows
      //   },
      //   onSelect: (item, index) => { console.log(index) }
      // })

      // this.List({
      //   options: {
      //     bottom: "60%",
      //     height: '100%',
      //     width: '100%',
      //     title: 'GitToken Contract Details',
      //     items
      //   },
      //   onSelect: (item, index) => { console.log(index) }
      // })
    })

    // Render the screen.
    this.screen.render();

  }
}
