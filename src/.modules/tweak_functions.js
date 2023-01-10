/**
 * Response의 plain text와 json 데이터를 유동적으로 구하는 함수입니다.
 * 
 * @param {Response} response 데이터를 받을 Response 객체
 * @returns {Promise<{text: String, json: object}>} Response json과 text 데이터를 가진 객체
 */
export const responseWaitForBody = async (response) => {
	let result = {text: await response.clone().text()};
	try {
		result['json'] = await response.clone().json();
	} catch(error){
		if(error?.constructor === SyntaxError) {
			result['json'] = null;
		} else {
			throw error;
		}
	}

	return result;
};