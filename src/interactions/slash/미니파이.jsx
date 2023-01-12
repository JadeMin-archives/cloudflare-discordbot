import {
	createElement,
	useDescription,
	useString, useInteger, useNumber, useBoolean,
	Fragment, Message, Embed, Field, Modal, Button, Input, Row,
	useButton, useModal, useInput,
} from 'slshx';

export default () => {
	// 명령어 설명
	useDescription("주어진 글에 있는 모든 엔터를 제거해 한 줄로 합칩니다.");

	// 명령어에 사용될 컴포넌트 정의
	const [msgInput_id, msgInput_value] = useInput();
	const [replacerInput_id, replacerInput_value] = useInput();
	const modal_id = useModal(() => { //모달 전송 시 반환할 컴포넌트
		const replacer = replacerInput_value || " "; //replacer를 지정하지 않았을 경우 기본값인 공백으로 설정합니다.
		
		return (
			<Message>
				{
					// 엔터를 주어진 대체 문자(replacer)로 변환합니다.
					msgInput_value.replace(/\n+/g, replacer)
				}
			</Message>
		);
	});
	

	// 슬래시 명령어 사용 시 반환할 컴포넌트
	return () => (
		<Modal
			id={modal_id}
			title="미니파이"
		>
			<Input
				id={msgInput_id}
				label="변환할 글을 입력하세요."
				placeholder="변환할 글"
				minLength={2} //최소 길이
				maxLength={100} //최대 길이
				paragraph //멀티라인(여러 줄) 활성화
				required //필수
			/>
			<Input
				id={replacerInput_id}
				label="엔터 키를 변환할 문자"
				placeholder="엔터 키를 어떤 문자로 변환할 지 여기에 입력할 수 있습니다."
				minLength={1} //최소 길이
				maxLength={5} //최대 길이
				paragraph //멀티라인(여러 줄) 활성화
			/>
		</Modal>
	);
};