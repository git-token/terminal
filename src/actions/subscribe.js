export default function subscribe({ organization, token }) {
  return (dispatch) => {
    this.websocket.socket.send(JSON.stringify({
      event: 'watch_token',
      data: {
        organization,
        token
      }
    }))

    this.websocket.on('data', (msg) => {
      console.log('msg', msg)
    })
  }
}
