import blessed from 'blessed';
import contrib from 'blessed-contrib'

/**
 * [Organization description]
 * @param {[type]} options      [description]
 * @param {[type]} organization [description]
 */
export default function Organization({ state }) {
  const { currentOrganization, organizations } = state

  const {
    organization,
    token_address,
    symbol,
    name,
    decimals
  } = currentOrganization

  if (
    organizations[organization] &&
    organizations[organization]['Contribution'] &&
    organizations[organization]['TokenSupply'] &&
    organizations[organization]['Leaderboard']
  ) {

    const { Contribution, TokenSupply, Leaderboard } = organizations[organization]

    this.screen.remove(this.registry)

    this.auctions ? this.screen.remove(this.auctions) : null
    this.orgDetails ? this.screen.remove(this.orgDetails) : null
    this.supplyChart ? this.screen.remove(this.supplyChart) : null
    this.leaderBoard ? this.screen.remove(this.leaderBoard) : null
    this.milestones ? this.milestones.remove(this.milestones) : null
    this.contributionHistory ? this.screen.remove(this.contributionHistory) : null

    this.orgDetails = this.Table({
      options: {
        parent: this.screen,
        label: `Details for ${organization}`,
        top: '10%',
        height: '20%',
        width: '33%',
        align: 'left',
        ...this.defaultOptions,
        rows: [
          ['Organization',          `https://github.com/${organization}` ],
          ['Token Address',         token_address ],
          ['Token Symbol',          symbol ],
          ['Token Name',            name ],
          // ['Token Decimals',     String(decimals) ],
          ['Total Token Supply',    `${Number(TokenSupply.total / Math.pow(10, decimals)).toLocaleString()} ${symbol}` ],
          ['Reserved Token Supply', `${Number(TokenSupply.reserved / Math.pow(10, decimals)).toLocaleString()} ${symbol}` ],
          ['Reserved Ratio', `${Number((TokenSupply.reserved/TokenSupply.total) * 100).toFixed(3)} %` ]
        ],
      }
    });

    this.leaderBoard = this.Table({
      options: {
        parent: this.screen,
        label: `Leader Board for ${organization}`,
        top: '29%',
        height: '21%',
        width: '33%',
        align: 'left',
        ...this.defaultOptions,
        rows: [
          ['Username', `${symbol} Balance`, `Percentage Tokens Awarded`],
          ...Object.keys(Leaderboard['data']).sort((a, b) => {
            return Leaderboard['data'][b] - Leaderboard['data'][a]
          }).map((username) => {
            const balance = Number(Leaderboard['data'][username]/Math.pow(10, decimals))
            const total = Number(Leaderboard['data']['total']/Math.pow(10, decimals))
            const percentage = Number((balance / total) * 100).toFixed(6)
            return [
              String(username),
              String(`${balance.toLocaleString()} ${symbol}`),
              String(`${percentage} %`)
            ]
          })
        ],
      }
    });


    let contributionHistory = Object.keys(Contribution)
      .sort((a, b) => {
        return Contribution[b]['args']['date'] - Contribution[a]['args']['date']
      })
      .filter((c, i) => {
        if (Contribution[c]) {
          return true
        }
      })
      .map((c) => {
        const { username, rewardType, reservedType, value, reservedValue, date } = Contribution[c]['args']
        return [
          String(username),
          String(`${rewardType} ${reservedType}`),
          String(value / Math.pow(10, decimals)),
          String(reservedValue / Math.pow(10, decimals)),
          String(new Date(date * 1000).toLocaleString())
        ]
      })

    this.contributionHistory = this.Table({
      options: {
        parent: this.screen,
        label: `Contribution History for ${organization}`,
        top: '49%',
        height: '51%',
        width: '67%',
        left: '33%',
        align: 'left',
        ...this.defaultOptions,
        rows: [
          ['Username', `Type`, `${symbol} Rewarded`, `${symbol} Reserved`, `Date`],
          ...contributionHistory
        ],
      }
    });

    this.milestones = this.Table({
      options: {
        parent: this.screen,
        label: `Milestones for ${organization}`,
        top: '49%',
        height: '21%',
        width: '33%',
        align: 'left',
        ...this.defaultOptions,
        rows: [
          ['Title', `Completion Date`]
        ],
      },
      select: (item, index) => {

      }
    });

    this.auctions = this.Table({
      options: {
        parent: this.screen,
        label: `${symbol} Auctions for ${organization}`,
        top: '69%',
        height: '31%',
        width: '33%',
        align: 'left',
        ...this.defaultOptions,
        rows: [
          [`Initial Exchange Rate`, `${symbol} Available`, `Auction Date`]
        ],
      },
      select: (item, index) => {

      }
    });

    this.supplyChart = contrib.line({
      ...this.defaultOptions,
      xLabelPadding: 10,
      xPadding: 5,
      showLegend: true,
      top: '10%',
      left: '33%',
      height: '40%',
      width: '67%',
      wholeNumbersOnly: true,
      label: `Supply of ${symbol} Token | ${Number(TokenSupply.total / Math.pow(10, decimals)).toLocaleString()} ${symbol}`
    })

    this.screen.append(this.supplyChart)

    let tS = 0
    let rS = 0

    var totalSupply = {
      title: `${symbol} Total`,
      x: Object.keys(Contribution).sort((a,b) => {
        return Contribution[a]['args']['date'] - Contribution[a]['args']['date']
      }).map((s) => {
        return new Date(Contribution[s]['args'].date * 1000).toDateString()
      }),
      y: Object.keys(Contribution).sort((a,b) => {
        return Contribution[a]['args']['date'] - Contribution[a]['args']['date']
      }).map((s) => {
        let v = Number(Contribution[s]['args']['value'] / Math.pow(10, decimals))
        v += Number(Contribution[s]['args']['reservedValue'] / Math.pow(10, decimals))
        tS += v
        return tS
      }),
      style: { line: 202 }
    }

    var reservedSupply = {
      title: `${symbol} Reserved`,
      x: Object.keys(Contribution).sort((a,b) => {
        return Contribution[a]['args']['date'] - Contribution[a]['args']['date']
      }).map((s) => {
        return new Date(Contribution[s]['args'].date * 1000).toDateString()
      }),
      y: Object.keys(Contribution).sort((a,b) => {
        return Contribution[a]['args']['date'] - Contribution[a]['args']['date']
      }).map((s) => {
        let v = (Contribution[s]['args']['reservedValue']) / Math.pow(10, decimals)
        rS = rS + v
        return rS
      }),
      style: { line: 34 }
    }

    this.supplyChart.setData([totalSupply, reservedSupply])

    this.screen.append(this.orgDetails)
    this.screen.append(this.leaderBoard)
    this.screen.append(this.contributionHistory)
    this.screen.append(this.auctions)
    this.screen.append(this.milestones)
    this.screen.render()
  }
}
