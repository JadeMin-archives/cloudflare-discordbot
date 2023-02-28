import type { APIInteraction, APIMessage } from 'discord-api-types/v9';
import type { MessageCommandHandler, CommandResponse } from 'slshx';

import {
	createElement,
	useDescription,
	Fragment, Message, Embed, Field, Modal, Button, Input, Row,
	useButton, useModal, useInput,
} from 'slshx';

export default {
	"테스트 메시지메뉴": (): MessageCommandHandler => {
		return (
			interaction: APIInteraction,
			workerSecret: {},
			workerContext: ExecutionContext,
			targetMessage: APIMessage
		): CommandResponse => {
			const messageUrl = `https://discord.com/channels/${interaction.guild_id ?? "@me"}/${targetMessage.channel_id}/${targetMessage.id}`;
			
			return (
				<Message ephemeral>
					{`[메시지](<${messageUrl}>)의 메시지 메뉴를 누르셨네요.`}
				</Message>
			);
		};
	}
};