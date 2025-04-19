import type { Command } from 'commander';
import type { CommandDefinition } from '../commands/commandsList.js';

export class CommandHandler {
  private program: Command;

  constructor(program: Command) {
    this.program = program;
  }

  registerCommand(cmd: CommandDefinition): void {
    if (cmd.name === 'help') return;

    const command = this.program.command(cmd.name).description(cmd.description);
    this.registerOptions(command, cmd);
    this.registerAction(command, cmd);
  }

  private registerOptions(command: Command, cmd: CommandDefinition): void {
    if (cmd.options) {
      for (const opt of cmd.options) {
        command.option(opt.flag, opt.description, opt.default);
      }
    }
  }

  private registerAction(command: Command, cmd: CommandDefinition): void {
    if (cmd.action) {
      command.action(cmd.action);
    }
  }
}