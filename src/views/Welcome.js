import blessed from 'blessed';
import figlet from 'figlet'

export default function Welcome({ state }) {
  const value = `GitToken Terminal v${require('../../package.json').version}`

  this.topnav ? this.screen.remove(this.topnav) : null

  this.TopNav({ state })
  // this.SideNav({ state })
  this.welcome = blessed.textarea({
    parent: this.screen,
    label: value,
    height: '95%',
    width: '100%',
    align: 'center',
    top: '6%',
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
