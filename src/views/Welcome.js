import blessed from 'blessed';
import figlet from 'figlet'

export default function Welcome({ state }) {
  const value = `GitToken Terminal v${require('../../package.json').version}`

  this.sidenav ? this.screen.remove(this.sidenav) : null

  this.SideNav({ state })
  this.welcome = blessed.textarea({
    parent: this.screen,
    label: `${value}`,
    height: '100%',
    width: '90%',
    align: 'center',
    left: '10%',
    top: 'center',
    value,
    ...this.defaultOptions,
  });

  figlet(value, {
    font: `block`
  }, (error, result) => {
    if (!error) {
      this.welcome.setValue(result)
    }
  })


  this.screen.append(this.welcome)
  this.screen.render()
}
