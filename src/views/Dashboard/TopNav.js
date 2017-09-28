export default function TopNav({ state }) {
  const { views } = state
  this.topnav = this.BarList({
    options: {
      ...this.defaultOptions,
      parent: this.screen,
      label: `GitToken`,
      height: '10%',
      draggable: false,
      items: views
    },
    select: (item, index) => {
      // disabled
      // this.store.dispatch({ type: 'SET_VIEW', views[index] })
    }
  })

  this.topnav.key(views.map((v, i) => { return String(i+1) }), (v, key) => {
    const result = views[+v-1]
    this.store.dispatch({ type: 'SET_VIEW', result })
  })

  this.screen.append(this.topnav)
  this.screen.render()
}
