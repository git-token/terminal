const GitTokenTerminal = require('../dist/index').default

const terminal = new GitTokenTerminal({
  title: 'GitToken Terminal',
  socketUri: 'ws://localhost:3003'
})
