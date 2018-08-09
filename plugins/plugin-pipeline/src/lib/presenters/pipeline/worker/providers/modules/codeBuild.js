const colors = require('colors/safe');
const { CodeBuild, CloudWatchLogs } = require('aws-sdk');

const SUCCEEDED = 'SUCCEEDED';

const commandRegex = /running command (.+)/i;

const capitalize = str => str.slice(0, 1).toUpperCase() + str.toLowerCase().slice(1);

const logs = async (logGroupName, logStreamName, limit = 100) => {
  const params = { logGroupName, logStreamName, limit };
  const { events = [] } = await new CloudWatchLogs().getLogEvents(params).promise();
  return events;
};

const commands = lines => {
  const sorted = lines.sort(({ timestamp: a }, { timestamp: b }) => b - a);
  const filtered = sorted.filter(({ message }) => message.match(commandRegex));
  return filtered.map(({ message }) => message.match(commandRegex)[1]);
};

module.exports = async id => {
  const client = new CodeBuild();
  const {
    builds: [{ buildComplete, buildStatus, currentPhase, logs: { groupName, streamName } = {} }],
  } = await client.batchGetBuilds({ ids: [id] }).promise();

  if (buildComplete) {
    if (buildStatus !== SUCCEEDED) {
      throw new Error('Build failed!');
    }
    return `Build completed successfully.`;
  }

  const [command] = commands(await logs(groupName, streamName));

  if (!command) {
    return `Current phase "${capitalize(currentPhase)}", status is "${capitalize(buildStatus)}"`;
  }

  return `${colors.yellow.bold(capitalize(currentPhase))}: ${command}`;
};
