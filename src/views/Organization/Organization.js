import blessed from 'blessed';

/**
 * [Organization description]
 * @param {[type]} options      [description]
 * @param {[type]} organization [description]
 */
export default function Organization({ state }) {
  const { currentOrganization } = state
  const {
    organization,
    token_address,
    symbol,
    name,
    decimals
  } = currentOrganization

  this.screen.remove(this.registry)
  this.orgDetails = this.Table({
    options: {
      parent: this.screen,
      label: `Details for ${organization}`,
      top: '6%',
      height: '20%',
      width: '25%',
      align: 'left',
      ...this.defaultOptions,
      rows: [
        ['Organization',    `https://github.com/${organization}` ],
        ['Token Address',   token_address ],
        ['Token Symbol',    symbol ],
        ['Token Name',      name ],
        ['Token Decimals',  String(decimals) ],
        ['Token Supply',    String(0) ],
        ['']
      ],
    }
  });

  this.leaderBoard = this.Table({
    options: {
      parent: this.screen,
      label: `Leader Board for ${organization}`,
      top: '26%',
      height: '20%',
      width: '25%',
      align: 'left',
      ...this.defaultOptions,
      rows: [
        ['Username', `${symbol} Balance`, `Percentage Contributed`]
      ],
    }
  });

  this.contributionHistory = this.Table({
    options: {
      parent: this.screen,
      label: `Contribution History for ${organization}`,
      top: '46%',
      height: '56%',
      width: '25%',
      align: 'left',
      ...this.defaultOptions,
      rows: [
        ['Username', `Type`, `${symbol} Awarded`, `Date`]
      ],
    }
  });

  this.screen.append(this.orgDetails)
  this.screen.append(this.leaderBoard)
  this.screen.append(this.contributionHistory)
  this.screen.render()
}
