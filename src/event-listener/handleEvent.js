import Promise from 'bluebird'

export default function handleEvent({ data, organization }) {
  return new Promise((resolve, reject) => {
    const { event, args, transactionHash } = data
    switch(event) {
      case 'Contribution':
        resolve(this.handleContribution({ data, organization }))
        break;
      default:
        console.log(`Unhandled Event ${event}`)
        return null
    }
  })
}
