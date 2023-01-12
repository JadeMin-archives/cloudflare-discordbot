import userCTXM from "./context_menu/user/*.jsx";
import messageCTXM from "./context_menu/message/*.jsx";
const slashCMD = require(`./slash/*.jsx`);

let result = {
	commands: {},
	userCommands: {},
	messageCommands: {}
};


const pushCommands = (propName, callback, index) => {
	let key, value;
	if(propName === 'commands') {
		[key, value] = [
			slashCMD.filenames[index].replace(/.*\/(.*)\.jsx$/gi, '$1'),
			callback.default
		];
	} else {
		[key, value] = [
			Object.keys(callback.default)[0],
			Object.values(callback.default)[0]
		];
	}
	
	result[propName][key] = value;
};
userCTXM.forEach(c=> pushCommands(c, 'userCommands'));
messageCTXM.forEach(c=> pushCommands(c, 'messageCommands'));
slash_commands.default.forEach((c, i)=> pushCommands('commands', c, i));

export default result;