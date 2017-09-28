import Promise, { promisifyAll } from 'bluebird'
const jsonfile = promisifyAll(require('jsonfile'))

export default function cacheState({ data }) {
  return new Promise((resolve, reject) => {
    jsonfile.writeFileAsync(this.cacheFile, JSON.parse(JSON.stringify(data)), { flag: 'w' })
      .then(() => {
        resolve(true)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
