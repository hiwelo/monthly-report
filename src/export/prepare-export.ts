import { Context } from '../types';

export const prepareExport = (context: Context): void => {
  const { issues } = context;

  // early-termination if there is no issues
  if (issues === undefined) return;

  // prepare a line of content for each issue
  issues.forEach(issue => {
    const content = `[${issue.number}] ${issue.title}\t${issue.html_url}`;

    context.exportContent = [...context.exportContent, content];
  });
};
