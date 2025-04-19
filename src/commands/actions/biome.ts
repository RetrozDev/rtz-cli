import chalk from 'chalk';
import { exec } from 'node:child_process';

export const biomeAction = () => {
	console.info(chalk.blue('Installing @biomejs/biome...'));
	exec('npm i -D @biomejs/biome', (err, stdout, stderr) => {
		if (err) {
			console.error(
				chalk.red(`Error installing @biomejs/biome: ${err.message}`),
			);
			return;
		}
		if (stderr) {
			console.error(chalk.yellow(`stderr: ${stderr}`));
		}
		console.log(chalk.green(stdout));

		console.log(chalk.blue('Initializing Biome...'));

		exec('npx @biomejs/biome init', (err, stdout, stderr) => {
			if (err) {
				console.error(chalk.red(`Error initializing Biome: ${err.message}`));
				return;
			}
			if (stderr) {
				console.error(chalk.yellow(`stderr: ${stderr}`));
			}
			console.log(chalk.green(stdout));
		});
	});
};
