import { fork } from 'child_process'

export default function listener({ }) {
  this.eventListener = fork('./dist/event-listener/server.js')
}
