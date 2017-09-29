import Promise from 'bluebird'

export default function Leaderboard({ data, organization }) {
  return new Promise((resolve, reject) => {
    const { organizations } = this.store.getState()
    const { Contribution } = organizations[organization]

    let leaderboard = {}
    Promise.resolve(Object.keys(Contribution)).map((c) => {
      const { username, value } = Contribution[c]['args']
      leaderboard['total'] ?
        leaderboard['total'] += Number(value) :
        leaderboard['total'] = Number(value)

      leaderboard[username] ?
        leaderboard[username] += Number(value) :
        leaderboard[username] = Number(value)


    }).then(() => {
      const payload = {
        type: 'ORGANIZATION_DATA_UPDATE',
        org: organization,
        event: 'Leaderboard',
        id: 'data',
        data: leaderboard
      }
      this.store.dispatch(payload)
      process.send(payload)
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}
