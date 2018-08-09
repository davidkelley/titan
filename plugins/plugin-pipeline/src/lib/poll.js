const { Observable } = require('rxjs');

module.exports = (resolver, { interval = 500 } = {}) =>
  new Observable(observer => {
    const id = setInterval(async () => {
      observer.next(await resolver());
    }, interval);
    return () => clearInterval(id);
  });
