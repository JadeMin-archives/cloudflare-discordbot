/**
 * @fileoverview
 * 명령어 배포용 로컬 서버
 * slshx 모듈로 명령어 모음을 파싱해서 모든 명령어 배포
 */
// Cloudflare Workers에서 라우터를 더 편하게 만들기 위한 모듈
import type { Request, ExecutionContext } from '@cloudflare/workers-types';
import type { Options } from 'slshx';

import { Router as IttyRouter } from 'itty-router';

// slshx 모듈
import { deployCommands } from 'slshx';

// 명령어 모음집? 불러오기
import interactions from "./interactions/all.js";

// 서버 오류 발생 시 사용될 함수
import onError from "./.modules/catch500.js";

// Cloudflare Workers용 라우터 생성
const Router = IttyRouter();

// 옵션에 사용될 환경 변수 선언
const options: Options = {
	// slshx 모듈의 명령어 파싱에 사용되는 옵션
	applicationId: env.APPLICATION_ID,
	applicationPublicKey: env.PUBLIC_KEY,
	applicationSecret: env.SECRET_KEY,
	...interactions
} as const;



// 명령어 배포에 사용될 주소
Router.post('/deploy', async () => {
	// slshx 모듈의 명령어 배포
	await deployCommands(options);
	return new Response("Successfully Deployed", {status: 200}); //배포 완료
});


// Cloudflare Workers에서도 라우팅될 수 있게끔 라우터한테 패스하기
export default {
	async fetch(request: Request, workerSecret: {}, workerContext: ExecutionContext) {
		return Router.handle(request, workerSecret, workerContext);
	}
};