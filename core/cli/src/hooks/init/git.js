const repo = require('git-repo-info');

module.exports = options => {
  Object.assign(options.config, { git: repo() });
};
