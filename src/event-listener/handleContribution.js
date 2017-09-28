import Promise, { join } from 'bluebird'

export default function handleContribution({ data, organization, decimals }) {
  return new Promise((resolve, reject) => {
    join(
      // this.ContributionHistory({ data, organization, decimals }),
      this.SupplyGrowth({ data, organization, decimals })
    )
    .then(() => {
      resolve(true)
    })
    .catch((error) => {
      reject(error)
    })

  })
}
