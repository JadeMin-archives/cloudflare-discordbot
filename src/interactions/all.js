/**
 * @fileoverview 모든 종류의 명령어 모음집을 불러옵니다.
 */
import commands from "./slash/callback";
import userCommands from "./context_menu/user/callback";
import messageCommands from "./context_menu/message/callback";


export default {
	commands,
	userCommands,
	messageCommands
};