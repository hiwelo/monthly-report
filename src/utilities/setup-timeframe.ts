import { Context } from '../types';

/**
 * Translates the requested month to a timestamp usable by the GitHub API
 */
export const setupTimeframe = (context: Partial<Context>): void => {
  // gets the requested month from the context or the environment
  context.month = context.month || process.env.month;

  // uses the current month as value if no month requested
  if (!context.month) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    context.month = `${currentYear}-${currentMonth}`;
  }

  // sets timestamp for the GitHub API
  context.since = new Date(context.month).toUTCString();
};
