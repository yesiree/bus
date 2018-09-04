function EventBus () {
  this.handlers = {}
  this.pending = []
}

EventBus.prototype.afterPending = function () {
  return Promise.all(this.pending.slice())
}

EventBus.prototype.on = function (key, handler) {
  if (!this.handlers[key]) this.handlers[key] = []
  this.handlers[key].push(handler)
}

EventBus.prototype.off = function (key, handler) {
  if (this.handlers[key]) {
    this.handlers.splice(this.handlers.indexOf(handler), 1)
  }
}

EventBus.prototype.dispatch = function (key, ...args) {
  const promise = Promise.all(
    this.handlers[key].map(handler => {
      return Promise.resolve().then(x => handler(...args))
    })
  )
  this.pending.push(promise)
  return promise
}

module.exports = EventBus