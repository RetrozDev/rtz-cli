export class CommandHandler {
    constructor(program) {
        this.program = program;
    }
    registerCommand(cmd) {
        if (cmd.name === "help")
            return;
        const command = this.program.command(cmd.name).description(cmd.description);
        this.registerOptions(command, cmd);
        this.registerAction(command, cmd);
    }
    registerOptions(command, cmd) {
        if (cmd.options) {
            for (const opt of cmd.options) {
                command.option(opt.flag, opt.description, opt.default);
            }
        }
    }
    registerAction(command, cmd) {
        if (cmd.action) {
            command.action(cmd.action);
        }
    }
}
