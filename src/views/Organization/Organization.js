import blessed from 'blessed';

/**
 * [Organization description]
 * @param {[type]} options      [description]
 * @param {[type]} organization [description]
 */
export default function Organization({ state }) {
  const { currentOrganization: { organization, token_address } } = state

  this.screen.remove(this.registry)
  this.orgDetails = this.Table({
    options: {
      parent: this.screen,
      label: `Details for ${organization}`,
      left: '10%',
      width: '20%',
      align: 'left',
      ...this.defaultOptions,
      rows: [
        ['Organization', organization ],
        ['Token Address', token_address, ]
      ],
    }
  });
  this.screen.append(this.orgDetails)
  this.screen.render()
}
