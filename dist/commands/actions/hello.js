import chalk from 'chalk';
export const helloAction = (options) => {
    console.info(`Hello from rtz-cli! ${chalk.blue('Welcome to the CLI!')} ${chalk.green(options.name)}`);
};
