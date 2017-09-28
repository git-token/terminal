import Promise from 'bluebird'

export default function SupplyGrowth({ data, organization }) {
  return new Promise((resolve, reject) => {
    this.TokenSupply({ data, organization })
      .then(({ date, value }) => {
        const { args: { reservedValue }, transactionHash } = data
        const payload = {
          type: 'ORGANIZATION_DATA_UPDATE',
          event: 'SupplyGrowth',
          org: organization,
          id: transactionHash,
          data: { value, date }
        }

        this.store.dispatch(payload)
        process.send(payload)

        resolve(true)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
