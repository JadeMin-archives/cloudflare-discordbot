import userCTXM from "./context_menu/user/*.jsx";
import messageCTXM from "./context_menu/message/*.jsx";
import slashCMD from "./slash/*.jsx";
let _exports = {
	userCommands: {},
	messageCommands: {},
	commands: {}
};
const pushCommand = (type, exported) => {
	const [key, value] = [
		Object.keys(exported.default)[0],
		Object.values(exported.default)[0]
	];
	
	_exports[type][key] = value;
};


userCTXM.forEach(c=> pushCommand('userCommands', c));
messageCTXM.forEach(c=> pushCommand('messageCommands', c));
slashCMD.forEach(c=> pushCommand('commands', c));

export default _exports;