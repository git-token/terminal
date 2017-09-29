import Promise, { join } from 'bluebird'

export default function handleContribution({ data, organization, decimals }) {
  return new Promise((resolve, reject) => {
    join(
      // this.ContributionHistory({ data, organization, decimals }),
      this.TokenSupply({ organization, decimals }),
      // this.SupplyGrowth({ data, organization, decimals }),
      this.Leaderboard({ data, organization })
    )
    .then(() => {
      resolve(true)
    })
    .catch((error) => {
      reject(error)
    })

  })
}
