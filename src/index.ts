import { Command, flags } from '@oclif/command';
import dotEnv from 'dotenv';

class MonthlyReport extends Command {
  static description =
    'exports all issues and pull requests closed for the requested month for the requested GitHub repository';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    repository: flags.string({ char: 'n', description: 'repository' }),
  };

  static args = [{ name: 'file' }];

  async run() {
    const { args, flags } = this.parse(MonthlyReport);

    // declares information from .env file in the environment variables
    dotEnv.config();
  }
}

export = MonthlyReport;
