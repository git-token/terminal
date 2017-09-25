import blessed from 'blessed';
import contrib from 'blessed-contrib';
import {
  List,
  Table,
} from './components/index'

import {
  Dashboard,
  SideNav,
  Registry
} from './views/Dashboard/index'

import ViewManager from './views/ViewManager'

import {
  Organization,
} from './views/Organization/index'

import Welcome from './views/Welcome'

import GitTokenSocketClient from 'gittoken-socket/dist/client'
import defaultOpts from './components/defaultOptions'

import store from './store'

export default class GitTokenTerminal {
  constructor({ title, socketUri }) {
    this.screen = blessed.screen({
      title: title,
      smartCSR: true,
      height: 600,
      width: 800
    })

    this.store = store
    this.currentView = ''
    
    // Components
    this.List           = List.bind(this)
    this.Table          = Table.bind(this)
    this.defaultOptions = defaultOpts

    // Views
    this.Dashboard    = Dashboard.bind(this)
    this.Organization = Organization.bind(this)
    this.SideNav      = SideNav.bind(this)
    this.ViewManager  = ViewManager.bind(this)
    this.Registry     = Registry.bind(this)
    this.Welcome      = Welcome.bind(this)


    // Quit on Escape, q, or Control-C.
    this.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
      return process.exit(0);
    });

    // Connect To GitToken WebSocket Server
    this.gittoken = new GitTokenSocketClient({ socketUri })
    this.gittoken.on('connect', () => {
      this.gittoken.socket.send(JSON.stringify({ event: 'get_registered' }))
      this.render()
    })

    // Hook Redux Store to incoming socket messages
    this.gittoken.on('data', (data) => {
      const msg = JSON.parse(data.toString('utf8'))
      const { event, result } = msg
      this.store.dispatch({type: event.toUpperCase(), result })
    })

    // Render the screen.
    this.screen.render();

  }

  render() {

    // List for updates to the state and render views if necessary
    const unsubscribe = this.store.subscribe(() => {
      const state = this.store.getState()
      const { currentView } = state
      if (this.currentView != currentView) {
        this.currentView = currentView
        this.ViewManager({ state, view: this.currentView })
      }

    })
  }



}
