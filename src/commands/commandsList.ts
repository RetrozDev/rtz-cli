import type { Command } from "commander";
import { biomeAction } from "./actions/biome.js";
import { helloAction } from "./actions/hello.js";

export interface CommandDefinition {
	name: string;
	description: string;
	options?: {
		flag: string;
		description: string;
		default?: string;
	}[];
	action?: (options: Command) => void | Promise<void>;
}

export const commands: CommandDefinition[] = [
	{
		name: "hello",
		description: "Show a hello message",
		options: [
			{
				flag: "-n, --name <name>",
				description: "Name to greet",
				default: " ",
			},
		],
		action: helloAction,
	},
	{
		name: "biome-init",
		description: "Install and initialize biomejs",
		options: [
			{
				flag: "-r, --root <root>",
				description: "Root directory for commands",
				default: "./src",
			},
		],
		action: (cmd) =>
			biomeAction({
				// biome-ignore lint/suspicious/noExplicitAny: <TO REMOVE>
				root: (cmd as any).root,
			}),
	},
	{
		name: "help",
		description: "Display available commands",
	},
];
