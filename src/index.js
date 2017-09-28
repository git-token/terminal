import blessed from 'blessed';
import contrib from 'blessed-contrib';

import {
  subscribe
} from './actions/index'

import {
  List,
  BarList,
  Table,
} from './components/index'

import {
  Dashboard,
  SideNav,
  TopNav,
  Registry
} from './views/Dashboard/index'

import ViewManager from './views/ViewManager'

import {
  Organization,
} from './views/Organization/index'

import Welcome from './views/Welcome'

import listener from './event-listener/listener'
import GitTokenSocketClient from 'gittoken-socket/dist/client'
import defaultOpts from './components/defaultOptions'

import store from './redux/store'

export default class GitTokenTerminal {
  constructor({ title, socketUri, web3Provider }) {
    this.web3Provider = web3Provider ? web3Provider : `https://torvalds.gittoken.io`
    this.screen = blessed.screen({
      title: title,
      smartCSR: true,
      height: 600,
      width: 800
    })

    this.store = store
    this.currentView = ''

    // Action Methods
    this.subscribe = subscribe.bind(this)

    // Components
    this.List           = List.bind(this)
    this.BarList        = BarList.bind(this)
    this.Table          = Table.bind(this)
    this.defaultOptions = defaultOpts

    // Views
    this.Dashboard    = Dashboard.bind(this)
    this.Organization = Organization.bind(this)
    this.TopNav       = TopNav.bind(this)
    this.SideNav      = SideNav.bind(this)
    this.ViewManager  = ViewManager.bind(this)
    this.Registry     = Registry.bind(this)
    this.Welcome      = Welcome.bind(this)


    // Quit on Escape, q, or Control-C.
    this.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
      return process.exit(0);
    });

    this.listener = listener.bind(this)
    this.listener({})

    // Connect To GitToken WebSocket Server
    this.websocket = new GitTokenSocketClient({ socketUri })
    this.websocket.on('connect', () => {
      this.websocket.socket.send(JSON.stringify({ type: 'GET_REGISTERED' }))
      this.render()
    })

    this.websocket.on('data', (data) => {
      const msg = JSON.parse(data.toString('utf8'))
      // this.store.dispatch(msg)
      // console.log('msg', msg)
      if(msg.type == 'GET_REGISTERED') {
        this.store.dispatch(msg)
      }
    })

    // Render the screen.
    this.screen.render();
  }

  render() {
    // List for updates to the state and render views if necessary
    const unsubscribe = this.store.subscribe(() => {
      const state = this.store.getState()
      // console.log('state.organizations', state.organizations)
      const { currentView } = state
      if (this.currentView != currentView) {
        this.currentView = currentView
      }
      this.ViewManager({ state, view: this.currentView })
    })
  }



}
