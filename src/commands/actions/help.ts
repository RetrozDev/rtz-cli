import chalk from "chalk";
import { Command } from "commander";
import { commands } from "../commandsList.js";

export const helpCommand = new Command("help")
	.description("Display available commands in a styled format")
	.action(() => {
		console.log(chalk.bold.blue("\n===== RTZ CLI Commands =====\n"));

		for (const command of commands) {
			console.log(`${chalk.blue("•")} ${chalk.bold(command.name)}:`);
			console.log(`  ${chalk.italic(command.description)}`);

			if (command.options) {
				for (const opt of command.options) {
					console.log(
						`  ${chalk.dim("Options:")} ${chalk.yellow(opt.flag)} - ${opt.description}`,
					);
				}
			}
			console.log("");
		}
	});
