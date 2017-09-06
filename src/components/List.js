import blessed from 'blessed';
import contrib from 'blessed-contrib'

import defaultOpts from './defaultOptions'

export default function List({ options, onSelect }) {
  const list = blessed.list({
    ...options,
    ...defaultOpts
  });

  list.on('select', onSelect)

  // Allow scrolling with the mousewheel (manually).
  // list.on('wheeldown', function() {
  //   list.down();
  // });
  //
  // list.on('wheelup', function() {
  //   list.up();
  // });

  // Select the first item.
  list.select(0);


  this.screen.render();
}
