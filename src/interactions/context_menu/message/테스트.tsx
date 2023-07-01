import type { MessageCommandHandler } from 'slshx';

import {
	createElement,
	useDescription,
	Fragment, Message, Embed, Field, Modal, Button, Input, Row,
	useButton, useModal, useInput,
} from 'slshx';



export default {
	"테스트 메시지메뉴": (): MessageCommandHandler => {
		return (interaction, workerSecret, workerContext, targetMessage) => {
			const guildID = interaction.guild_id ?? "@me";
			const messageUrl = `https://discord.com/channels/${guildID}/${targetMessage.channel_id}/${targetMessage.id}`;
			
			return (
				<Message ephemeral>
					{`[메시지](<${messageUrl}>)의 메시지 메뉴를 누르셨네요.`}
				</Message>
			);
		};
	}
} as const;