import { fork } from 'child_process'

export default function listener({ }) {
  this.eventListener = fork(`${__dirname}/../../dist/event-listener/server.js`)
  this.eventListener.on('message', (msg) => {
    this.store.dispatch(msg)
  })

  process.on('exit', () => {
    this.eventListener.kill()
  })
}
