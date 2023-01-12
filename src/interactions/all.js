import ctxmUser from "./context_menu/user/*.jsx";
import ctxmMessage from "./context_menu/message/*.jsx";
const slash_commands = require(`./slash/*.jsx`);

let result = {
	commands: {},
	userCommands: {},
	messageCommands: {}
};


const pushCommands = (propName, callback, index) => {
	if(propName === 'commands') {
		const commandName = slash_commands.filenames[index].replace(/.*\/(.*)\.jsx$/gi, '$1');
		result[propName][commandName] = callback.default;
	} else {
		const [key, value] = [
			Object.keys(callback.default)[0],
			Object.values(callback.default)[0]
		];
		result[propName][key] = value;
	}
};
ctxmUser.forEach(c=> pushCommands(c, 'userCommands'));
ctxmMessage.forEach(c=> pushCommands(c, 'messageCommands'));
slash_commands.default.forEach((c, i)=> pushCommands('commands', c, i));

export default result;