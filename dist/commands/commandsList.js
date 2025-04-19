import { helloAction } from './actions/hello.js';
import { biomeAction } from './actions/biome.js';
export const commands = [
    {
        name: 'hello',
        description: 'Show a hello message',
        options: [
            {
                flag: '-n, --name <name>',
                description: 'Name to greet',
                default: ' ',
            },
        ],
        action: helloAction,
    },
    {
        name: 'biome-init',
        description: 'Install and initialize biomejs',
        action: biomeAction,
    },
    {
        name: 'help',
        description: 'Display available commands',
    },
];
