import userCTXM from "./context_menu/user/*.jsx";
import messageCTXM from "./context_menu/message/*.jsx";
const slashCMD = require(`./slash/*.jsx`);

let result = {
	commands: {},
	userCommands: {},
	messageCommands: {}
};


const pushCommands = (propName, callback, index, _slashCMD) => {
	let key, value;
	if(propName === 'commands') {
		[key, value] = [
			_slashCMD.filenames[index].replace(/.*\/(.*)\.jsx$/gi, '$1'),
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
userCTXM.forEach(c=> pushCommands('userCommands', c));
messageCTXM.forEach(c=> pushCommands('messageCommands', c));
slashCMD.default.forEach((c, i)=> pushCommands('commands', c, i, slashCMD));

export default result;