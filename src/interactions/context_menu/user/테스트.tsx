import type { UserCommandHandler } from 'slshx';

import {
	createElement,
	useDescription,
	Fragment, Message, Embed, Field, Modal, Button, Input, Row,
	useButton, useModal, useInput,
} from 'slshx';



export default {
	"테스트 유저메뉴": (): UserCommandHandler => {
		return (interaction, workerSecret, workerContext, targetUser) => {
			const mentionInteractedUser = `<@${interaction.member!.user.id}>`;
			const mentionTargetUser = `<@${targetUser.id}>`;

			return (
				<Message ephemeral>
					{`${mentionInteractedUser}님이 ${mentionTargetUser}님의 테스트 유저 메뉴를 눌렀습니다.`}
				</Message>
			);
		};
	}
} as const;