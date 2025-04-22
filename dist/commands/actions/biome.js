import { exec as execCallback } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import chalk from "chalk";
const exec = promisify(execCallback);
export const defaultPackagesToRemove = [
    "eslint",
    "@eslint/js",
    "eslint-plugin-react-hooks",
    "eslint-plugin-react-refresh",
    "prettier",
];
const removePackages = async () => {
    console.info(chalk.blue("Removing eslint and prettier ..."));
    try {
        const { stdout } = await exec(`npm remove ${defaultPackagesToRemove.join(" ")}`);
        console.log(chalk.green(stdout));
    }
    catch (error) {
        console.warn(chalk.yellow("Warning: Some packages could not be removed. They might not be installed."));
    }
};
const installBiome = async () => {
    console.info(chalk.blue("Installing @biomejs/biome..."));
    const { stdout } = await exec("npm i -D @biomejs/biome");
    console.log(chalk.green(stdout));
};
const initBiome = async () => {
    console.info(chalk.blue("Initializing Biome..."));
    const { stdout } = await exec("npx @biomejs/biome init");
    console.log(chalk.green(stdout));
};
const addScripts = async (root) => {
    console.info(chalk.blue("Updating scripts in package.json..."));
    try {
        const packageJson = JSON.parse(await readFile("package.json", "utf-8"));
        // Remove existing biome scripts if they exist
        const scriptsToRemove = ["format", "lint", "check"];
        for (const script of scriptsToRemove) {
            if (packageJson.scripts?.[script]) {
                delete packageJson.scripts[script];
            }
        }
        // Add new scripts
        packageJson.scripts = {
            ...packageJson.scripts,
            format: `npx @biomejs/biome format --write ${root}`,
            lint: `npx @biomejs/biome lint --write ${root}`,
            check: `npx @biomejs/biome check --write ${root}`,
        };
        await writeFile("package.json", JSON.stringify(packageJson, null, 2));
        console.log(chalk.green("✨ Biome scripts updated in package.json"));
    }
    catch (error) {
        console.error(chalk.red("Error updating package.json:"), error);
        throw error;
    }
};
export const biomeAction = async (options) => {
    try {
        await removePackages();
        await installBiome();
        await initBiome();
        const root = options.root || "./src";
        await addScripts(root); // Renamed from addFormatScript to addScripts
        console.log(chalk.green("✨ Biome setup completed successfully!"));
    }
    catch (error) {
        console.error(chalk.red("Error during Biome setup:"), error);
        process.exit(1);
    }
};
