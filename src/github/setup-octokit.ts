import Octokit from '@octokit/rest';
import { Context } from '../types';

/**
 * Initializes the connection to the GitHub API with the provided token
 */
export const setupOctokit = (context: Partial<Context>): void => {
  // gets repo and owner info from the context
  const [owner, repo] = (context.repository as string).split('/');

  // early-termination if repo is undefined (means that repo info is not correct)
  if (repo === undefined) {
    throw new Error(
      'This command line tool needs to get the repository owner and name from the repository flag. Please format this information like the name of a GitHub repository, e.g. owner/repository.',
    );
  }

  // sets the octokit context
  context.octokitContext = {
    owner,
    repo,
  };

  // initializes the object containing the link to the API
  context.octokit = new Octokit({
    auth: context.token,
  });
};
