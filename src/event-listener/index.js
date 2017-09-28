import Web3 from 'web3'
import store from '../redux/store'

import handleEvent from './handleEvent'
import handleContribution from './handleContribution'


const {
  abi,
  unlinked_binary
} = require('gittoken-contracts/build/contracts/GitToken.json')

export default class GitTokenTerminalEventListener {
  constructor({ web3Provider }) {

    this.contracts = {}
    this.contractEvents = {}

    this.web3Provider = web3Provider ? web3Provider : `https://torvalds.gittoken.io`
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.web3Provider));
    this.store = store

    this.handleEvent = handleEvent.bind(this)
    this.handleContribution = handleContribution.bind(this)

    process.on('message', (msg) => {
      const { type, data } = JSON.parse(msg)
      switch(type) {
        case 'WATCH_TOKEN':
          this.watchToken(data)
        default:
          console.log(`Invalid ${type} Requested`)
          return null
      }
    })

    this.store.subscribe(() => {
      console.log(`State: ${JSON.stringify(this.store.getState())}`)
    })
  }

  watchToken({ token, organization }) {
    this.contracts[token] = this.web3.eth.contract(abi).at(token)
    this.contractEvents[token] = this.contracts[token].allEvents({ fromBlock: 0, toBlock: 'latest' });
    this.contractEvents[token].watch((error, result) => {
      this.handleEvent({ data: result, organization })
        .then((details) => { console.log('details', details) })
        .catch((error) => { console.log('error', error) })
    })
  }

}
