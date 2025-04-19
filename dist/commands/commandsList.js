import { helloAction } from './actions/hello.js';
import { biomeAction } from './actions/biome.js';
import { startPomodoro } from './actions/pomodoro.js';
export const commands = [
    {
        name: 'hello',
        description: 'Show a hello message',
        options: [
            {
                flag: '-n, --name <name>',
                description: 'Name to greet',
                default: 'World',
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
        name: 'pomodoro',
        description: 'Start a pomodoro timer',
        options: [
            {
                flag: '-s, --sessions <sessions>',
                description: 'Number of sessions',
                default: '1',
            },
            {
                flag: '-w, --work <minutes>',
                description: 'Work duration',
                default: '25',
            },
            {
                flag: '-b, --break <minutes>',
                description: 'Break duration',
                default: '5',
            },
        ],
        action: startPomodoro,
    },
];
