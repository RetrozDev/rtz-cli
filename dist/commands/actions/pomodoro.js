import chalk from 'chalk';
const asciiDigits = {
    '0': [' 0000 ', '00  00', '00  00', '00  00', ' 0000 '],
    '1': ['  11  ', ' 111  ', '  11  ', '  11  ', '111111'],
    '2': [' 2222 ', '22  22', '   22 ', '  22  ', '222222'],
    '3': [' 3333 ', '33  33', '   333', '33  33', ' 3333 '],
    '4': ['44  44', '44  44', '444444', '    44', '    44'],
    '5': ['555555', '55    ', '55555 ', '    55', '55555 '],
    '6': [' 6666 ', '66    ', '66666 ', '66  66', ' 6666 '],
    '7': ['777777', '   77 ', '  77  ', ' 77   ', '77    '],
    '8': [' 8888 ', '88  88', ' 8888 ', '88  88', ' 8888 '],
    '9': [' 9999 ', '99  99', ' 99999', '    99', ' 9999 '],
    ':': ['      ', '  ::  ', '      ', '  ::  ', '      '],
};
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
function renderAsciiTime(min, sec) {
    const digits = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    const lines = Array(5).fill('');
    for (const char of digits) {
        const art = asciiDigits[char];
        for (let i = 0; i < lines.length; i++) {
            lines[i] += `${art[i]}  `;
        }
    }
    return lines.join('\n');
}
async function updateTimer(seconds, title, message, color) {
    console.clear();
    console.log(chalk.bold[color](title));
    console.log(chalk[seconds < 60 ? 'red' : seconds < 300 ? 'yellow' : 'green'](renderAsciiTime(Math.floor(seconds / 60), seconds % 60)));
    console.log(chalk[color](`\n${message}`));
    await sleep(1000);
}
export async function startPomodoro(cmd) {
    try {
        const sessions = Number.parseInt(cmd.sessions || '1');
        const work = Number.parseInt(cmd.work || '25') * 60;
        const breakTime = Number.parseInt(cmd.break || '5') * 60;
        for (let i = 1; i <= sessions; i++) {
            // Work session
            for (let t = work; t >= 0; t--) {
                await updateTimer(t, `Work Session ${i}/${sessions}`, '🎯 Focus!', 'blue');
            }
            console.log(chalk.green('\n✨ Session complete!'));
            // Break (except after last session)
            if (i < sessions) {
                for (let t = breakTime; t >= 0; t--) {
                    await updateTimer(t, 'Break Time', '🌿 Relax...', 'cyan');
                }
            }
        }
        console.clear();
        console.log(chalk.magenta(`\n🎊 Completed ${sessions} session${sessions > 1 ? 's' : ''}!`));
    }
    catch (error) {
        console.error(chalk.red('Error:'), error);
    }
}
