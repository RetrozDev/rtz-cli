import chalk from "chalk";
import type { Command } from "commander";

export const helloAction = (options: Command): void => {
	console.info(
		`Hello from rtz-cli! ${chalk.blue("Welcome to the CLI!")} ${chalk.green(options.name)}`,
	);
};
