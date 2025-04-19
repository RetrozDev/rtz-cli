#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
const program = new Command();
program
    .name('rtz')
    .description('An awesome CLI for your workflow')
    .version('1.0.0');
program
    .command('hello')
    .description('Show a hello message')
    .option('-n, --name <name>', 'Name to greet', 'Retroz CLI')
    .action((options) => {
    console.info(`Hello from rtz-cli! ${chalk.blue('Welcome to the CLI!')} ${chalk.green(options.name)}`);
});
program.parse(process.argv);
