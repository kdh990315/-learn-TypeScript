let userInput: unknown;
let userName: string;

userInput = 5;
userInput = '김노엠';
// userName = userInput; //Type 'unknown' is not assignable to type 'string'.
if( typeof userInput === 'string') {
	userName = userInput
}

function generateError(message: string, code: number): never {
	throw {message: message, errorCode: code};
}

generateError('오류가 발생했습니다!', 500)