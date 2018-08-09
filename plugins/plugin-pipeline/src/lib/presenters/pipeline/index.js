const worker = require('./worker');

module.exports = obj =>
  Object.values(obj).map(({ stageName, actions }) => ({
    title: stageName,
    tasks: Object.values(actions).map(({ actionName, ...configuration }) => ({
      title: actionName,
      worker: worker([stageName, actionName])(configuration),
    })),
  }));
