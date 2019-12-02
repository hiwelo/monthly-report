import Octokit from '@octokit/rest';

export interface OctokitContext {
  /** Owner of the repository */
  owner: string;
  /** Repository to use for this tool */
  repo: string;
}

export interface Context {
  /** Requested month of the issues and pull requests to search */
  month: string;
  /** Octokit object linking the project to the GitHub API */
  octokit: Octokit;
  /** Object describing the context used for the Octokit API */
  octokitContext: OctokitContext;
  /** GitHub repository to get the information from */
  repository: string;
  /** Search issues and pull requests updated at or after this time are returned */
  since: string;
  /** Token to use for the GitHub API */
  token: string;
}

export interface Flags {
  /** Version of the CLI tool */
  version: void;
  /** Flag to display the list of commands */
  help: void;
  /** GitHub repository to get the information from */
  repository?: string;
  /** Token to use for the GitHub API */
  token?: string;
}
