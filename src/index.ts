import { Command, flags } from '@oclif/command';
import Listr from 'listr';
import { exportClipboard, prepareExport } from './export';
import { listIssues, setupOctokit, testOctokit } from './github';
import { setupEnvironment, setupTimeframe } from './utilities';
import { Context } from './types';

class MonthlyReport extends Command {
  static description =
    'exports all issues and pull requests closed for the requested month for the requested GitHub repository';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    assignee: flags.string({ char: 'a', description: 'assignee' }),
    month: flags.string({ char: 'm', description: 'month' }),
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
      exportContent: [],
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
        title: 'Setup timeframe for this search',
        task: setupTimeframe,
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

    const tasks = new Listr<Context>([
      {
        title: 'Lists all issues since the time breakpoint',
        task: listIssues,
      },
      {
        title: 'Prepare the export',
        task: prepareExport,
      },
      {
        title: 'Export the list of issues in the clipboard',
        task: exportClipboard,
      },
    ]);

    // run all tasks, catch and return any error if applicable
    try {
      const context = (await setup.run(initialContext)) as Context;
      await tasks.run(context);
    } catch {
      console.error('The process ended with an error. Please check below.');
    }
  }
}

export = MonthlyReport;
