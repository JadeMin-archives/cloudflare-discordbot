/**
 * @fileoverview Slshx 명령어 파싱 중 오류 발생 시 수행할 작업
 */
export default async (error: Error) => {
	// 디스코드 웹훅으로 로깅하는 기능을 구현하는 걸 추천합니다.
	
	throw error;
};