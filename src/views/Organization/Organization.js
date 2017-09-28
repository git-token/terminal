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
    organizations[organization]['SupplyGrowth']
  ) {

    const { Contribution, TokenSupply, SupplyGrowth } = organizations[organization]

    // console.log('SupplyGrowth', SupplyGrowth)

    this.screen.remove(this.registry)
    this.orgDetails ? this.screen.remove(this.orgDetails) : null
    this.leaderBoard ? this.screen.remove(this.leaderBoard) : null
    this.contributionHistory ? this.screen.remove(this.contributionHistory) : null
    this.supplyChart ? this.screen.remove(this.supplyChart) : null

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
          ['Organization',    `https://github.com/${organization}` ],
          ['Token Address',   token_address ],
          ['Token Symbol',    symbol ],
          ['Token Name',      name ],
          ['Token Decimals',  String(decimals) ],
          ['Token Supply',    String(TokenSupply.total / Math.pow(10, decimals)) ],
          ['']
        ],
      }
    });

    this.leaderBoard = this.Table({
      options: {
        parent: this.screen,
        label: `Leader Board for ${organization}`,
        top: '30%',
        height: '20%',
        width: '33%',
        align: 'left',
        ...this.defaultOptions,
        rows: [
          ['Username', `${symbol} Balance`, `Percentage Contributed`]
        ],
      }
    });


    let contributionHistory = Object.keys(Contribution)
      .sort((a, b) => {
        return Contribution[b]['args']['date'] - Contribution[a]['args']['date']
      })
      .filter((c, i) => {
        if (Contribution[c] && i < 50) {
          return true
        }
      })
      .map((c) => {
        const { username, rewardType, reservedType, value, date } = Contribution[c]['args']
        return [
          String(username),
          String(`${rewardType} ${reservedType}`),
          String(value / Math.pow(10, decimals)),
          String(new Date(date * 1000).toLocaleString())
        ]
      })

    this.contributionHistory = this.Table({
      options: {
        parent: this.screen,
        label: `Contribution History for ${organization}`,
        top: '50%',
        height: '50%',
        width: '33%',
        align: 'left',
        ...this.defaultOptions,
        rows: [
          ['Username', `Type`, `${symbol} Awarded`, `Date`],
          ...contributionHistory
        ],
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
      label: `Supply of ${symbol} Token`
    })

    this.screen.append(this.supplyChart)

    var totalSupply = {
      title: `${symbol}`,
      x: Object.keys(SupplyGrowth).map((s) => {
        return new Date(SupplyGrowth[s].date).toDateString()
      }),
      y: Object.keys(SupplyGrowth).map((s) => {
        return SupplyGrowth[s]['value']['total'] / Math.pow(10, decimals)
      })
    }

    this.supplyChart.setData(totalSupply)

    this.screen.append(this.orgDetails)
    this.screen.append(this.leaderBoard)
    this.screen.append(this.contributionHistory)
    this.screen.render()
  }
}
