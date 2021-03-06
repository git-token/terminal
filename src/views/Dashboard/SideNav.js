export default function SideNav({ state }) {
  const { views } = state
  this.sidenav = this.List({
    options: {
      ...this.defaultOptions,
      parent: this.screen,
      label: `GitToken`,
      left: '0%',
      top: '10%',
      width: '10%',
      draggable: false,
      items: views
    },
    select: (item, index) => {
      this.store.dispatch({ type: 'SET_VIEW', result: views[index] })
    }
  })
  this.screen.render()
}
