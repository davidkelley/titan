const AWS = require('aws-sdk');
const { Command } = require('@oclif/command');

class BaseCommand extends Command {
  async init() {
    await this.config.runHook('credentials:aws');
    AWS.config = this.config.aws;
  }
}

module.exports = BaseCommand;
