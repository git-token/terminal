import Promise, { promisifyAll } from 'bluebird'
const jsonfile = promisifyAll(require('jsonfile'))

export default function retrieveState() {
  return new Promise((resolve, reject) => {
    jsonfile.readFileAsync(this.cacheFile)
      .then((data) => {
        const payload = {
          type: 'CACHED_ORGANIZATIONS',
          data
        }
        process.send(payload)
        this.store.dispatch(payload)
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
