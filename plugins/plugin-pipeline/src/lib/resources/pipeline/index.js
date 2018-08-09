const { CodePipeline } = require('aws-sdk');

const format = require('./format');

module.exports = async ({ name }) => {
  const codepipeline = new CodePipeline();
  const data = [
    codepipeline.getPipeline({ name }).promise(),
    codepipeline.getPipelineState({ name }).promise(),
  ];
  const [{ pipeline }, state] = await Promise.all(data);
  return format(pipeline.stages, state.stageStates);
};
