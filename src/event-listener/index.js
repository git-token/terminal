import Web3 from 'web3'
import store from '../redux/store'
import handleEvent from './handleEvent'
import handleContribution from './handleContribution'
import Promise, { promisifyAll } from 'bluebird'

const jsonfile = promisifyAll(require('jsonfile'))

const {
  abi,
  unlinked_binary
} = require('gittoken-contracts/build/contracts/GitToken.json')

import {
  SupplyGrowth,
  TokenSupply,
  cacheState,
  retrieveState,
  Leaderboard
} from './utils/index'


export default class GitTokenTerminalEventListener {
  constructor({ web3Provider }) {

    this.contracts = {}
    this.contractEvents = {}
    this.cacheFile = `${ __dirname }/../../cache/cache.json`

    this.web3Provider = web3Provider ? web3Provider : `https://torvalds.gittoken.io`
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.web3Provider));
    this.store = store

    this.handleEvent          = handleEvent.bind(this)
    this.handleContribution   = handleContribution.bind(this)
    this.SupplyGrowth         = SupplyGrowth.bind(this)
    this.TokenSupply          = TokenSupply.bind(this)
    this.Leaderboard          = Leaderboard.bind(this)
    this.cacheState           = cacheState.bind(this)
    this.retrieveState        = retrieveState.bind(this)



    this.retrieveState().then((state) => {
      // console.log('Retrieved State: ', state)
    }).catch((error) => {
      console.log('error', error)
    })

    process.on('message', (msg) => {
      const { type, data } = JSON.parse(msg)
      switch(type) {
        case 'WATCH_TOKEN':
          this.watchToken(data)
          break;
        default:
          console.log(`Invalid ${type} Requested`)
          return null
      }
    })

    this.store.subscribe(() => {
      this.cacheState({
        data: this.store.getState()['organizations']
      }).then((cached) => {
        // console.log(cached)
      }).catch((error) => {
        console.log('error')
      })
    })
  }

  watchToken(data) {
    const { token, organization, decimals } = data

    let fromBlock = data['fromBlock'] ? data['fromBlock'] : 0
    let toBlock   = data['toBlock']   ? data['toBlock']   : 'latest'

    this.contracts[token] = this.web3.eth.contract(abi).at(token)
    this.contractEvents[token] = this.contracts[token].allEvents({ fromBlock, toBlock });
    this.contractEvents[token].watch((error, result) => {
      this.handleEvent({ data: result, organization, decimals })
        .then((details) => { /*console.log('details', details)*/ })
        .catch((error) => { console.log('error', error) })
    })
  }

}
