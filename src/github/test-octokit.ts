import { Context } from '../types';

export const testOctokit = async (context: Partial<Context>): Promise<void> => {
  const { octokit, octokitContext, repository } = context as Context;

  // gets information about the repository from the Octokit API
  try {
    const { data } = await octokit.repos.get({
      ...octokitContext,
    });

    if (repository !== data.full_name) {
      throw new Error(
        'The information returned by the API is not matching the information provided. Can you check the `repository` value provided as parameter of this tool?',
      );
    }
  } catch (error) {
    throw new Error(
      'The connection to the API failed. Are you sure the token is valid?',
    );
  }
};
