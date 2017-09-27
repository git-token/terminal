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
    top: '10%',
    height: '91%',
    width: '100%',
    align: 'center',
    value,
    ...this.defaultOptions,
  });

  figlet(value, {
    font: `block`
  }, (error, result) => {
    if (!error) {
      this.welcome.setValue(`\n\n\n
        ${value} (alpha)\n\n\n
        Hello! Thank You for using GitToken!\n
        Please review our Terms of Service (ToS) before continuing\n
        https://github.com/git-token/documentation/blob/master/tos/terms_of_services.md\n\n\n
        Happy Coding!
      `)
      this.screen.append(this.welcome)
      this.screen.render()
    }
  })

}
