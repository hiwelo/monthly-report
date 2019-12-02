import clipboardy from 'clipboardy';
import { Context } from '../types';

export const exportClipboard = async (context: Context): Promise<void> => {
  // generates the content to add in the clipboard
  const content = context.exportContent.join('\n');

  // writes to the clipboard
  await clipboardy.write(content);
};
