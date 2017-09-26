export default function TopNav({ state }) {
  const { views } = state
  this.topnav = this.BarList({
    options: {
      ...this.defaultOptions,
      parent: this.screen,
      label: `GitToken`,
      height: '20%',
      draggable: false,
      items: views
    },
    select: (item, index) => {
      this.store.dispatch({ type: 'SET_VIEW', result: views[index] })
    }
  })
  this.screen.render()
}
