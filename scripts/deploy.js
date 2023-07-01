/**
 * @fileoverview
 * 명령어 배포용 <로컬 서버> 파일을 빌드한 후 서버를 실행해 배포합니다.
 * 
 * <Slshx>.deployCommands를 사용해 명령어를 배포하면 되지만 Slshx 모듈은 Cloudflare Workers 구조에 맞춰 개발되었으므로
 * 먼저 명령어 배포용 <로컬 서버>를 빌드한 후 Miniflare 모듈을 사용하여 Cloudflare Workers 서버를 로컬에서 시뮬레이션합니다.
 */
import {
	Miniflare,
	Log, LogLevel
} from 'miniflare';


const localWorker = new Miniflare({
	log: new Log(LogLevel.DEBUG),
	error: new Log(LogLevel.ERROR),

	wranglerConfigPath: true,
	packagePath: true,
	envPath: true,
	sourceMap: true,

	modules: true,
	buildCommand: "npm run build:deploy",
	scriptPath: "dist/server.mjs",
});
const response = await localWorker.dispatchFetch(`http://localhost:8787/deploy`, {method: 'POST'});

if(response.status === 200) console.log("✅ - 명령어 배포용 로컬서버가 모든 명령어를 배포했습니다!");
else {
	console.error(await response.text());
	throw new Error(`❌ - 명령어 배포용 로컬서버가 유효하지 않은 메시지를 반환했습니다:`);
}