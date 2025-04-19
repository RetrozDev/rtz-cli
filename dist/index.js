#!/usr/bin/env node
import { Command } from 'commander';
import { commands } from './commands/commandsList.js';
import { helpCommand } from './commands/actions/help.js';
import { CommandHandler } from './handlers/CommandHandler.js';
const program = new Command();
program
    .name('rtz')
    .description('An awesome CLI for your workflow')
    .version('1.0.0');
const commandHandler = new CommandHandler(program);
// Register all commands
for (const cmd of commands) {
    commandHandler.registerCommand(cmd);
}
// Add help command
program.addCommand(helpCommand);
program.parse(process.argv);
