import type { Command, Options } from 'slshx';
import type { CommandCollection, ExportedCommandModule } from "./all.d.js";

//@ts-expect-error
import userCTXM from "./context_menu/user/*.tsx";
//@ts-expect-error
import messageCTXM from "./context_menu/message/*.tsx";
//@ts-expect-error
import slashCMD from "./slash/*.tsx";

const _exports: CommandCollection = {
	userCommands: {},
	messageCommands: {},
	commands: {}
};
const pushCommand = (type: keyof CommandCollection, exported: ExportedCommandModule) => {
	const key: string = Object.keys(exported.default)[0];
	const value: Command = Object.values(exported.default)[0];
	
	_exports[type][key] = value;
};


userCTXM.forEach((exported: ExportedCommandModule) => {
	pushCommand('userCommands', exported);
});
messageCTXM.forEach((exported: ExportedCommandModule) => {
	pushCommand('messageCommands', exported);
});
slashCMD.forEach((exported: ExportedCommandModule) => {
	pushCommand('commands', exported);
});

export default _exports;