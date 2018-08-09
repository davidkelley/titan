const { Observable } = require('rxjs');

const Providers = require('./providers');

const IN_PROGRESS = 'InProgress';

const cache = {};

class Worker {
  constructor({ actionTypeId: { provider } }) {
    this.started = false;
    this.executionId = null;
    this.provider = Providers[provider];
    this.observable = new Observable(observer => {
      this.observer = observer;
    });
  }

  start(id) {
    this.executionId = id;
    this.started = true;
  }

  finish() {
    this.observer.complete();
  }

  async progress(action) {
    const { provider, executionId } = this;
    if (provider) {
      this.observer.next(await provider(executionId, action));
    } else {
      this.observer.next(`Provider does not exist`);
    }
    return true;
  }

  async update(action) {
    const { latestExecution: { status, externalExecutionId: id } = {} } = action;
    if (!this.observer) {
      return true;
    }
    switch (status) {
      case IN_PROGRESS:
        this.start(id);
        if (id) {
          return this.progress(action);
        }
        break;
      default:
        if (this.started) {
          return this.finish();
        }
    }
    return true;
  }
}

module.exports = key => (...args) => {
  let { [key]: worker } = cache;
  if (!worker) {
    cache[key] = new Worker(...args);
    worker = cache[key];
  }
  worker.update(...args);
  return worker.observable;
};
