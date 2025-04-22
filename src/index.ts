#!/usr/bin/env node

import { Command } from "commander";
import packageJson from "../package.json" with { type: "json" };
import { helpCommand } from "./commands/actions/help.js";
import { commands } from "./commands/commandsList.js";
import { CommandHandler } from "./handlers/CommandHandler.js";

const version: string = packageJson.version;

const program = new Command();
program
	.name("rtz")
	.description("An awesome CLI for your workflow")
	.version(version, "-v, --version", "output the current version");

const commandHandler = new CommandHandler(program);

// Register all commands
for (const cmd of commands) {
	commandHandler.registerCommand(cmd);
}

// Add help command
program.addCommand(helpCommand);
program.parse(process.argv);
