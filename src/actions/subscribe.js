export default function subscribe({ organization, token }) {
  return (dispatch) => {
    console.log('this.eventListener.connected', this.eventListener.connected)
    this.eventListener.write(JSON.stringify({
      event: 'watch_token',
      data: { organization, token }
    }))
  }
}
