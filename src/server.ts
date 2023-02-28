/**
 * @fileoverview 실제 서비스(디스코드 상호작용 엔트포인트 서버)에 사용될 퍼블릭 서버
 */
import type { Request, ExecutionContext } from '@cloudflare/workers-types';
import type { Options } from 'slshx';

// Cloudflare Workers에서 라우터를 더 편하게 만들기 위한 모듈
import { Router as IttyRouter } from 'itty-router';

// slshx 모듈
import { createHandler } from 'slshx';

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
	...interactions,
} as const;



// 디스코드 상호작용 엔드포인트용 주소
Router.post('/interaction', async (request: any, workerSecret: {}, workerContext: ExecutionContext) => {
	try {
		return await createHandler(options)(request, workerSecret, workerContext);
	} catch(error) {
		return await onError(error);
	}
});


// Cloudflare Workers에서도 라우팅될 수 있게끔 라우터한테 패스하기
export default {
	async fetch(request: Request, workerSecret: {}, workerContext: ExecutionContext) {
		return Router.handle(request, workerSecret, workerContext);
	}
};