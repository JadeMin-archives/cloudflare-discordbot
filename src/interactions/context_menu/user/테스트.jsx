import {
	createElement,
	useDescription,
	Fragment, Message, Embed, Field, Modal, Button, Input, Row,
	useButton, useModal, useInput,
} from 'slshx';

export default {
	"테스트 유저메뉴": () => {
		return (interaction, workerConfig, workerContext, targetMessage) => {
			return (
				<Message ephemeral>
					{`<@${interaction.member.user.id}>님이 <@${targetUser.id}>님의 테스트 유저 메뉴를 눌렀습니다.`}
				</Message>
			);
		};
	}
};