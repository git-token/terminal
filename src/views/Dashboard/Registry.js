export default function Registry({ state }) {
  const { registered } = state
  const registryRows = ({ registered }) => {
    const items = registered.filter((item) => {
      const { deployed } = item
      if (deployed == 1) { return true }
    }).map((item) => {
      const {
        organization,
        token_address,
        name,
        symbol
      } = item
      return [
        String(organization),
        String(token_address),
        String(name),
        String(symbol)
      ]
    })

    const rows = [
      ['Organization', 'Token Address', 'Token Name', 'Symbol'],
      ...items
    ]

    return rows
  }

  this.SideNav({ state })
  this.registry ? this.screen.remove(this.registry) : null
  this.registry = this.Table({
    options: {
      ...this.defaultOptions,
      parent: this.screen,
      label: `GitHub Organizations Registered with GitToken`,
      left: '10%',
      align: 'left',
      width: '90%',
      height: '100%',
      title: 'GitToken Registry',
      rows: registryRows({ registered })
    },
    select: (item, index) => {
      const result = registered[index - 1]
      this.store.dispatch({ type: 'SET_ORGANIZATION', result  })
      this.store.dispatch({ type: 'SET_VIEW', result: 'Organization'  })
      this.screen.remove(this.sidenav)
    }
  })

  this.screen.remove(this.welcome)
  this.screen.append(this.registry)
  this.screen.remove(this.sidenav)
  this.screen.render()
}
