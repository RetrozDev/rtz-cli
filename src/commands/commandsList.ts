import type { Command } from 'commander';
import { helloAction } from './actions/hello.js';

export interface CommandDefinition {
  name: string;
  description: string;
  options?: {
    flag: string;
    description: string;
    default?: string;
  }[];
  action?: (options: Command) => void;
}

export const commands: CommandDefinition[] = [
  {
    name: 'hello',
    description: 'Show a hello message',
    options: [
      {
        flag: '-n, --name <name>',
        description: 'Name to greet',
        default: ' '
      }
    ],
    action: helloAction
  },
  {
    name: 'help',
    description: 'Display available commands'
  }
];