import blessed from 'blessed';
import contrib from 'blessed-contrib'

import defaultOpts from './defaultOptions'

export default function Table({ options, select }) {
  const table = blessed.listtable({
    draggable: false,
    noCellBorders: true,
    pad: 1,
    ...options,
    ...defaultOpts
  });

  table.on('select', select)

  // Allow scrolling with the mousewheel (manually).
  // table.on('wheeldown', function() {
  //   table.down();
  // });
  //
  // table.on('wheelup', function() {
  //   table.up();
  // });
  //
  // table.focus();

  return table;
}
