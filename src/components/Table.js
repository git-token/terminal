import blessed from 'blessed';
import contrib from 'blessed-contrib'

import defaultOpts from './defaultOptions'

export default function Table({ options, onSelect }) {
  const table = blessed.table({
    parent: this.screen,
    ...options,
    ...defaultOpts
  });

  table.on('select', onSelect)

  // Allow scrolling with the mousewheel (manually).
  // table.on('wheeldown', function() {
  //   table.down();
  // });
  //
  // table.on('wheelup', function() {
  //   table.up();
  // });

  this.screen.render();
}
