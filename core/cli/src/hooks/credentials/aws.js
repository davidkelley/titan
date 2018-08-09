const AWS = require('aws-sdk');
const inquirer = require('inquirer');

const tokenCodeFn = async (serial, cb) => {
  try {
    const { mfa } = await inquirer.prompt([
      {
        name: 'mfa',
        type: 'password',
        message: `MFA Code (${serial})`,
      },
    ]);
    cb(null, mfa);
  } catch (err) {
    cb(err);
  }
};

const credentials = ({ profile }) =>
  new AWS.CredentialProviderChain([
    new AWS.SharedIniFileCredentials({ profile, tokenCodeFn }),
    new AWS.EnvironmentCredentials('AMAZON'),
    new AWS.EnvironmentCredentials('AWS'),
  ]).resolvePromise();

module.exports = async function resolveCredentials(options) {
  try {
    const { profile = 'default', region } = options.config.rc;
    const config = new AWS.Config({ region, credentials: await credentials({ profile }) });
    Object.assign(options.config, { aws: config });
  } catch (err) {
    this.debug(`Failed to load AWS Credentials: ${err.message}`);
  }
};
