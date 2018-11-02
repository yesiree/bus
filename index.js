module.exports = () => {
  return new EventBus()
}

function EventBus () {
  this.fns = {}
  this.pending = []
}

EventBus.prototype.settle = function () {
  return Promise.all(this.pending.slice())
}

EventBus.prototype.on = function (key, fn) {
  if (typeof fn === 'function') {
    (this.fn[key] = this.fn[key] || []).push(fn)
  }
  return this  
}

EventBus.prototype.one = function (key, fn) {
  function once() {
    this.off(key, once)
    fn.apply(null, arguments)
  }
  return this.on(key, once)
}

EventBus.prototype.off = function (key, fn) {
  if (!fn) {
    delete this.fns[key]
  } else if (this.fns[key]) {
    for(let i=0, f; f = arr && arr[i]; i++) {
      if (f === fn) arr.splice(i--, 1)
    }
  }
  return this
}

EventBus.prototype.fire = function (key, ...args) {
  const promise = Promise.all(
    this.fns[key].map(fn => {
      return Promise.resolve().then(x => fn(...args))
    })
  )
  this.pending.push(promise)
  return promise
}