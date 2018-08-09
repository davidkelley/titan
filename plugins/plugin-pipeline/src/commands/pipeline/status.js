const { Observable, from } = require('rxjs');
const { map } = require('rxjs/operators');

const Command = require('../../base');

const task = require('../../lib/task');

const resource = require('../../lib/resources/pipeline');
const presenter = require('../../lib/presenters/pipeline');

const { name } = require('../flags/name');

const interval = num =>
  new Observable(observer => {
    const id = setInterval(() => observer.next(null), num);
    return () => clearInterval(id);
  });

class StatusCommand extends Command {
  async run() {
    const { flags } = this.parse(StatusCommand);
    const pipelineName = await flags.name;
    const observable = interval(500);
    observable
      .pipe(() => from(resource({ name: pipelineName })))
      .pipe(map(presenter))
      .subscribe(task());
  }
}

StatusCommand.description = `
View the current status of a pipeline for changes in execution, as well as
helpful information for the underlying resources.
`;

StatusCommand.flags = {
  name: name(),
};

module.exports = StatusCommand;
