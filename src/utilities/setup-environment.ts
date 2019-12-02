import { config as initEnvironment } from 'dotenv';
import { Context } from '../types';

/**
 * Returns an object of flags with information from the CLI or the environment
 * if available
 */
export const setupEnvironment = (context: Partial<Context>): void => {
  // declares information from .env file in the environment variables
  initEnvironment();

  // gets the GitHub auth token from the environment if not available
  if (context.token === undefined) {
    // early-termination if there is no token in the environment
    if (process.env.token === undefined) {
      throw new Error(
        'No GitHub token provided. This command line tool needs a GitHub API token to work provided with the flag --token.',
      );
    }

    context.token = process.env.token;
  }

  // gets the repository from the environment if not available
  if (context.repository === undefined) {
    // early-termination if there is no repository information in the environment
    if (process.env.repository === undefined) {
      throw new Error(
        'No repository provided. This command line tool needs a repository to work provided with the flag --repository.',
      );
    }

    context.repository = process.env.repository;
  }

  // gets the assignee from the environment if not available
  if (context.assignee === undefined) {
    // early-termination if there is no assignee information in the environment
    if (process.env.assignee === undefined) {
      throw new Error(
        'No assignee provided. This command line tool needs a assignee to work provided with the flag --assignee.',
      );
    }

    context.assignee = process.env.assignee;
  }
};
