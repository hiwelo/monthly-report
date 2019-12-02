import { Command, flags } from '@oclif/command';
import Listr from 'listr';
import { setupOctokit, testOctokit } from './github';
import { setupEnvironment } from './utilities';
import { Context } from './types';

class MonthlyReport extends Command {
  static description =
    'exports all issues and pull requests closed for the requested month for the requested GitHub repository';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    repository: flags.string({ char: 'n', description: 'repository' }),
    token: flags.string({
      char: 't',
      description: 'Auth token for the GitHub REST API',
    }),
  };

  async run(): Promise<void> {
    // initial values for the flags and API links
    const { flags } = this.parse(MonthlyReport);
    const api = {
      octokit: undefined,
      octokitContext: undefined,
    };

    // setup the context based on the information from the flags & API
    const initialContext: Partial<Context> = {
      ...flags,
      ...api,
    };

    // define all the tasks to run as part of this command line tool
    const setup = new Listr<Partial<Context>>([
      {
        title: 'Setup context and environment',
        task: setupEnvironment,
      },
      {
        title: 'Setup link to the GitHub API',
        task: setupOctokit,
      },
      {
        title: 'Initialize link to the GitHub API',
        task: testOctokit,
      },
    ]);

    // run all tasks, catch and return any error if applicable
    try {
      await setup.run(initialContext);
    } catch {
      console.error('The process ended with an error. Please check below.');
    }
  }
}

export = MonthlyReport;
