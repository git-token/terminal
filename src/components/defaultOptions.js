const options = {
  // content: '{bold}GitToken Dashboard{/bold}!',
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
    },
    line: 202,
    text: 15
  },
  // Allow mouse support
  mouse: true,

  // Allow key support (arrow keys + enter)
  keys: true,

  // Use vi built-in keys
  vi: true
}

export default options
