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

  this.TopNav({ state })
  this.registry ? this.screen.remove(this.registry) : null
  this.registry = this.Table({
    options: {
      ...this.defaultOptions,
      parent: this.screen,
      label: `GitHub Organizations Registered with GitToken`,
      align: 'left',
      width: '100%',
      top: '6%',
      height: '95%',
      rows: registryRows({ registered })
    },
    select: (item, index) => {
      const result = registered[index - 1]
      const { organization, token_address } = result

      this.store.dispatch({ type: 'SET_ORGANIZATION', result  })
      this.store.dispatch({ type: 'SET_VIEW', result: 'Organization'  })
      this.websocket.socket.send(JSON.stringify({
        type: 'WATCH_TOKEN',
        data: { organization, token: token_address }
      }))
      this.screen.remove(this.topnav)
    }
  })

  this.screen.remove(this.welcome)
  this.screen.append(this.registry)
  this.screen.remove(this.topnav)
  this.screen.render()
}
