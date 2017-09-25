import blessed from 'blessed';
import contrib from 'blessed-contrib'

export default function contractDetails() {

  // Create a box perfectly centered horizontally and vertically.
  const box1 = blessed.box({
    top: 0,
    left: 0,
    width: '50%',
    height: '50%',
    content: '{bold}GitToken Dashboard{/bold}!',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: '#17082b',
      border: {
        fg: '#cc5333'
      },
      hover: {
        bg: '#0b0216'
      },
      click: {
        bg: '#17082b'
      }
    }
  });

  const box = blessed.box({
    top: 0,
    left: '50%',
    width: '50%',
    height: '50%',
    content: '{bold}GitToken Dashboard{/bold}!',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: '#17082b',
      border: {
        fg: '#cc5333'
      },
      hover: {
        bg: '#0b0216'
      },
      click: {
        bg: '#17082b'
      }
    }
  });


  // // Add a png icon to the box
  // const icon = blessed.image({
  //   parent: box,
  //   top: 0,
  //   left: 0,
  //   type: 'ansi',
  //   height: 15,
  //   width: 35,
  //   file: `/Users/ryan/Projects/GitToken/assets/GitTokenLogo2sm.png`,
  //   search: false
  // });

  // If our box is clicked, change the content.
  box1.on('click', function(data) {
    box1.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
    if (box1.width == box.width) {
      box1.width = '100%'
    } else {
      box1.width = '50%'
    }

    this.screen.render();
  });

  // If box is focused, handle `enter`/`return` and give us some more content.
  box1.key('enter', function(ch, key) {
    box1.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
    box1.setLine(1, 'bar');
    box1.insertLine(1, 'foo');
    this.screen.render();
  });

  // Focus our element.
  box1.focus();
  box.focus();
  // Append our box to the screen.
  this.screen.append(box);
  this.screen.append(box1);
}
