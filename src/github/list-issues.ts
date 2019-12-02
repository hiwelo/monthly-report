import { Context } from '../types';

/**
 * Lists all closed issues for the current repository since the requested time
 * breakpoint
 */
export const listIssues = async (context: Context): Promise<void> => {
  const { assignee, octokit, octokitContext, since } = context;

  // lists all issues since the time breakpoint
  const { data } = await octokit.issues.listForRepo({
    ...octokitContext,
    assignee,
    since,
    state: 'closed',
  });

  // eslint-disable-next-line require-atomic-updates
  context.issues = data;
};
