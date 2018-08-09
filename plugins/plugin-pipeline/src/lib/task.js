const Listr = require('listr');
const { Observable } = require('rxjs');

class Observables {
  constructor(internal = {}) {
    this.observers = internal;
  }

  *[Symbol.iterator]() {
    yield* Object.values(this.observers);
  }

  create(key) {
    const observable = new Observable(observer => {
      this.observers[key] = observer;
    });
    return observable;
  }

  message(key, msg) {
    this.observers[key].next(msg);
  }

  complete(key) {
    return this.observers[key].complete();
  }
}

class Task {
  constructor() {
    this.observers = new Observables();
    this.initial = null;
  }

  static generator(obj, fn) {
    return new Listr(Object.values(obj).map(n => fn(n)));
  }

  async setup(struct) {
    return Task.generator(struct, ({ title, tasks, worker }) => ({
      title,
      task: () =>
        (() => {
          if (tasks) {
            return this.setup(tasks);
          }
          if (worker) {
            return worker;
          }
          return true;
        })(),
    }));
  }

  async update(obj) {
    if (!this.list) {
      this.list = await this.setup(obj);
      this.list.run();
    }
    return true;
  }
}

module.exports = () => {
  const task = new Task();
  return async obj => {
    await task.update(obj);
  };
};
