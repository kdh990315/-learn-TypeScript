// 데코레이터는 원래도 클래스에서 많이 사용함
// 데코레이터에서 반드시 알아야 할 사실은 데코레이터는 결국 함수임.
// 특정 방식으로 클래스 같은 데 추가할 수 있는 함수.
// @기호는 타입스크립트가 보고 인식할 수 있는 특수 식별자이다.
// 데코레이터는 @뒤에 무조건 함수가 와야한다. 실행하는게 아니라 지정하면 그 함수가 데코레이터가 된다.
// 데코레이터는 인자가 필요하다. 필요한 인자의 개수는 데코레이터를 추가하는 대상에 따라 달라진다.

// 


function Logger(constructor: Function) {
	console.log('Logging...');
	console.log(constructor);
}

@Logger
class Person {
	name = 'Kim';

	constructor() {
		console.log("Creating person object...");
	}
}

const pers = new Person();

console.log(pers);