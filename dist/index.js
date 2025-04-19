#!/usr/bin/env node
import { Command } from 'commander';
import { commands } from './commands/commandsList.js';
import { helpCommand } from './commands/actions/help.js';
import { CommandHandler } from './handlers/CommandHandler.js';
import packageJson from '../package.json' with { type: 'json' };
const version = packageJson.version;
const program = new Command();
program
    .name('rtz')
    .description('An awesome CLI for your workflow')
    .version(version, '-v, --version', 'output the current version');
const commandHandler = new CommandHandler(program);
// Register all commands
for (const cmd of commands) {
    commandHandler.registerCommand(cmd);
}
// Add help command
program.addCommand(helpCommand);
program.parse(process.argv);
