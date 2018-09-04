const EventBus = require('./index.js')

const bus = new EventBus()

bus.on('foo', x => {
  return new Promise((resolve, reject) => {
    setTimeout(x => {
      console.log(`It's the foo event!`)
      resolve()
    }, 4000)
  })
})

bus.dispatch('foo', 'Hello World')

bus.afterPending().then(x => {
  console.log('Done.')
})