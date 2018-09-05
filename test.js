const bus = require('./index.js')()

bus.on('foo', x => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`  Foo: ${x}`)
      resolve()
    }, 500)
  })
})

console.log(`Dispatching events, please wait...\n`)
bus.dispatch('foo', '1) Hey')
bus.dispatch('foo', '2) Hello')
bus.dispatch('foo', '3) Hi')

bus.afterPending().then(x => {
  console.log('\nDone.\n')
})