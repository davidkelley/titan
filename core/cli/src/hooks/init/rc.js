const rc = require('rc');

const APP = 'titan';

const DEFAULTS = {
  region: process.env.AWS_REGION || 'us-east-1',
};

module.exports = options => {
  Object.assign(options.config, { rc: rc(APP, DEFAULTS) });
};
