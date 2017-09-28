import Promise from 'bluebird'

export default function TokenSupply({ data, organization }) {
  return new Promise((resolve, reject) => {
    try {
      const { args: { value, reservedValue, date }, transactionHash } = data

      const { organizations } = this.store.getState()

      let total, reserved;

      if (
        organizations[organization] &&
        organizations[organization]['TokenSupply']
      ) {
        total =
          organizations[organization]['TokenSupply'].total +
          Number(value.toNumber() + reservedValue.toNumber());

        reserved =
          organizations[organization]['TokenSupply'].reserved +
          Number(reservedValue.toNumber());
      } else {
        total = Number(value.toNumber() + reservedValue.toNumber());
        reserved = Number(reservedValue.toNumber());
      }

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

      resolve({
        date: new Date(date.toNumber() * 1000).getTime(),
        organization,
        value: {
          total,
          reserved
        }
      })

    } catch (error) {
      reject(error)
    }
  })
}
