import blessed from 'blessed';
import contrib from 'blessed-contrib'

import defaultOpts from './defaultOptions'

export default function Dashboard({ options, onSelect }) {
  const dashboard = blessed.box({
    ...options,
    ...defaultOpts
  });

  this.gittoken.on('data', (data) => {
    const { event, result } = JSON.parse(data)
    if (event == 'get_contract') {
      const items = Object.keys(result[0]).filter((item) => {
        if(item) { return true }
      }).map((item) => {
        return [
          String(item),
          String(result[0][item])
        ]
      })
      const rows = [ ...items ]

      this.Table({
        options: {
          parent: dashboard,
          left: 'center',
          align: 'left',
          height: '50%',
          width: '50%',
          title: 'GitToken Contract Details',
          draggable: true,
          noCellBorders: true,
          pad: 1,
          rows
        },
        onSelect: (item, index) => { console.log(index) }
      })

      // this.List({
      //   options: {
      //     parent: dashboard,
      //     left: 'center',
      //     height: '50%',
      //     width: '50%',
      //     title: 'GitToken Contract Details',
      //     draggable: true,
      //     items
      //   },
      //   onSelect: (item, index) => { console.log(index) }
      // })
    }
  })

  this.screen.render();
}
