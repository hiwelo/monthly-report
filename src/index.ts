import { Command, flags } from "@oclif/command";

class MonthlyReport extends Command {
  static description =
    "exports all issues and pull requests closed for the requested month for the requested GitHub repository";

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    repository: flags.string({ char: "n", description: "repository" })
  };

  static args = [{ name: "file" }];

  async run() {
    const { args, flags } = this.parse(MonthlyReport);
  }
}

export = MonthlyReport;
