const { CodePipeline } = require('aws-sdk');
const { flags } = require('@oclif/command');

const listPipelines = async ({ nextToken = null } = {}) => {
  const pipeline = new CodePipeline();
  const { pipelines, nextToken: next } = await pipeline.listPipelines({ nextToken }).promise();
  if (next) return pipelines.concat(await listPipelines({ nextToken: next }));
  return pipelines;
};

const resolvePipelineName = async query => {
  const pipelines = await listPipelines();
  const regex = new RegExp(query);
  const [pipeline] = pipelines.filter(({ name }) => name.match(regex));
  return pipeline.name;
};

const name = flags.build({
  char: 'n',
  required: true,
  env: 'TITAN_PIPELINE_NAME',
  description: 'name to use',
  parse: resolvePipelineName,
});

module.exports = {
  name,
};
