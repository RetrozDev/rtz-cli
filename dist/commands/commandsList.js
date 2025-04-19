import { helloAction } from './actions/hello.js';
export const commands = [
    {
        name: 'hello',
        description: 'Show a hello message',
        options: [
            {
                flag: '-n, --name <name>',
                description: 'Name to greet',
                default: ' '
            }
        ],
        action: helloAction
    },
    {
        name: 'help',
        description: 'Display available commands in a styled format'
    }
];
