import Promise from 'bluebird'

export default function TokenSupply({ organization }) {
  return new Promise((resolve, reject) => {
    try {
      const { organizations } = this.store.getState()
      const { Contribution } = organizations[organization]

      const total = Object.keys(Contribution).map((c) => {
        const { value, reservedValue } = Contribution[c]['args']
        return Number(+value + +reservedValue)
      }).reduce((t, v) => {
        return t + v
      })

      const reserved = Object.keys(Contribution).map((c) => {
        const { value, reservedValue } = Contribution[c]['args']
        return Number(reservedValue)
      }).reduce((t, v) => {
        return t + v
      })


      const payloadTotal = {
        type: 'ORGANIZATION_DATA_UPDATE',
        org: organization,
        event: 'TokenSupply',
        id: 'total',
        data: total
      }

      const payloadReserved = {
        type: 'ORGANIZATION_DATA_UPDATE',
        event: 'TokenSupply',
        org: organization,
        id: 'reserved',
        data: reserved
      }

      this.store.dispatch(payloadTotal)
      this.store.dispatch(payloadReserved)

      process.send(payloadTotal)
      process.send(payloadReserved)

      resolve(true)

    } catch (error) {
      reject(error)
    }
  })
}
