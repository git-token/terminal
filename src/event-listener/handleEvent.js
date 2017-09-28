import Promise from 'bluebird'

export default function handleEvent({ data, organization, decimals }) {
  return new Promise((resolve, reject) => {
    const { event, args, transactionHash, blockNumber } = data

    const payload = {
      type: 'ORGANIZATION_DATA_UPDATE',
      event: data['event'],
      org: organization,
      id: data['transactionHash'],
      data
    }

    this.store.dispatch(payload)
    process.send(payload)

    const highestBlock = {
      type: 'ORGANIZATION_HIGHEST_BLOCK',
      org: organization,
      data: blockNumber
    }

    this.store.dispatch(highestBlock)
    process.send(highestBlock)

    switch(event) {
      case 'Contribution':
        resolve(this.handleContribution({ data, organization, decimals }))
        break;
      default:
        console.log(`Unhandled Event ${event}`)
        return null
    }
  })
}
