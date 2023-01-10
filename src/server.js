/**
 * @fileoverview 실제 서비스(디스코드 상호작용 엔트포인트 서버)에 사용될 <퍼블릭 서버>
 */
// Cloudflare Workers에서 라우터를 더 편하게 만들기 위한 모듈
import { Router as IttyRouter } from 'itty-router';

// slshx 모듈
import { createHandler } from 'slshx';

// 명령어 모음집?을 불러온다
import interactions from "./interactions/all";

// 서버 오류 발생 시 사용될 함수
import onError from "./.modules/catch500";

// Cloudflare Workers용 라우터 생성
const Router = IttyRouter();

// 옵션에 사용될 환경 변수 선언
const options = {
	// slshx 모듈의 명령어 파싱에 사용되는 옵션
	applicationId: env.APPLICATION_ID,
	applicationPublicKey: env.PUBLIC_KEY,
	...interactions,

	// 봇 초대 링크 생성에 사용될 옵션
	auth: {
		scopes: ["bot", "applications.commands"],
		permissions: 3072
	}
};



// 디스코드 상호작용 엔드포인트용 주소
Router.post('/interaction', async (request, workerSecret, workerContext) => {
	try {
		return await createHandler(options)(request, workerSecret, workerContext);
	} catch(error) {
		return await onError(error);
	}
});

// 봇 초대에 사용될 링크 생성해서 리디렉션
Router.get('/invite', () => {
	// 링크 생성
	const inviteUrl = new URL("https://discord.com/api/oauth2/authorize");
	inviteUrl.searchParams.set('client_id', options.applicationId);
	inviteUrl.searchParams.set('scope', options.auth.scopes.join(' '));
	inviteUrl.searchParams.set('permissions', options.auth.permissions);
	
	// 워커 주소에서 생성된 봇 초대 링크로 리다이렉트
	return Response.redirect(inviteUrl.toString(), 302);
});


// Cloudflare Workers에서도 라우팅될 수 있게끔 라우터한테 패스하기
export default {
	async fetch(request, workerSecret, workerContext) {
		return Router.handle(request, workerSecret, workerContext);
	}
};