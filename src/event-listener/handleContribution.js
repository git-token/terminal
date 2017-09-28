import Promise from 'bluebird'

export default function handleContribution({ data, organization }) {
  return new Promise((resolve, reject) => {
    this.store.dispatch({
      type: 'WATCH_TOKEN',
      event: data['event'],
      org: organization,
      id: data['transactionHash'],
      data
    })

  })
}
