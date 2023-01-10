import { build } from 'esbuild';
import env from "../secrets.json" assert {type: 'json'};
const argv = process.argv.slice(2)[0]; // node build.js 할 때 빌드 옵션을 인자로 지정함
const isDeployMode = argv === 'deploy'; // 만약 빌드 옵션이 deploy (명령어 배포)일 경우


const define = {
	/**
	 * miniflare와 배포용 옵션이 활성화되었을 때만 작동하는
	 * Slshx 명령어 자동 배포 코드를 tree shaking하기 위함
	 * 
	 * 프로젝트 내 globalThis.MINIFLARE 코드는 모두 false로 교체됩니다.
	 */
	"globalThis.MINIFLARE": "false",

	/**
	 * 프로젝트 내 아래 키워드의 코드는 모두 오른쪽의 값으로 대체됩니다.
	 * replace 방식이므로 대체될 값은 모두 문자열로 래핑해야 합니다.
	 */
	"env.APPLICATION_ID": JSON.stringify(env["APPLICATION_ID"]),
	"env.PUBLIC_KEY": JSON.stringify(env["PUBLIC_KEY"]),
	"env.SECRET_KEY": JSON.stringify(env["SECRET_KEY"])
};
await build({
	entryPoints: [`src/${argv}.js`],
	outfile: "dist/server.mjs",
	//outExtension: {".js": ".mjs"},

	platform: 'neutral',
	format: 'esm',
	target: 'esnext',
	
	bundle: true,
	treeShaking: true,
	minify: true,
	sourcemap: 'inline',

	jsxFactory: "createElement",
	jsxFragment: "Fragment",

	define
});

const serverType = isDeployMode?
	"명령어 배포용 로컬서버"
	:
	"프로덕션용 서버";
console.log(`✅ - ${serverType}의 빌드 작업이 완료되었습니다!`);