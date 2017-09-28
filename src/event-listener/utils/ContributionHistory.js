import Promise from 'bluebird'

export default function ContributionHistory({ data, organization, decimals }) {
  return new Promise((resolve, reject) => {
    const { args: { username, value, date, rewardType, reservedType } } = data
    const { organizations } = this.store.getState()

    let contributionHistory = []

    if (
      organizations[organization] &&
      organizations[organization]['ContributionHistory']
    ) {
      contributionHistory = organizations[organization]['ContributionHistory']['data']
    }

    const updatedHistory = [
      String(username),
      String(`${rewardType} ${reservedType}`),
      String(value.toNumber() / Math.pow(10, decimals)),
      String(new Date(date.toNumber() * 1000).toLocaleString())
    ]

    // Cleanup contributionHistory when over 50 items in array
    contributionHistory.length > 50 ?
      // Remove first (oldest) element in the array
      contributionHistory.shift() : null

    contributionHistory.push(updatedHistory)

    const payload = {
      type: 'ORGANIZATION_DATA_UPDATE',
      event: 'ContributionHistory',
      org: organization,
      id: 'data',
      data: contributionHistory
    }

    this.store.dispatch(payload)
    process.send(payload)

    resolve(true)
  })
}
