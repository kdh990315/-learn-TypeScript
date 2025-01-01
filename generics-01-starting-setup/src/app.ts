// // Code goes here!
// const names: Array<string> = []; // string[]
// // names[0].split('')

// const promise: Promise<number> = new Promise((resolve, reject) => {
// 	//반환되는 값이 number 타입이라고 알려줌줌
// 	setTimeout(() =>{
// 		// resolve("준비 완료");
// 		resolve(10); //반환값이 number타입입임
// 	}, 2000);
// })

// promise.then(data => {
// 	data.split(''); 
// 	//위에서 promise는 제네틱 타입을 통해 number형식을 넘겨줄 거라고 
// 	// 선언했기 때문에 문자열 메소드인 split을 사용하려면 오류가 발생한다.
// })

// //제네릭 타입을 활용하면 타입을 더 안정적으로 사용할 수 있다.
// //제네릭 타입 정보를 줌으로 써 작업을 더 유연하게 할 수 있다. 
// // 배열에 어떤 데이터가 저장되는지, 프로미스가 어떤 데이터를 반환하는지의 정보 등등
// // 우리가 직접 제네릭 클래스나 함수를 구축한다면 완전히 다른걸 해볼 수 있겠지만, 어쨋든 제네릭 타입으로 타입과
// // 관련도니 추가 정보를 얻을 수 있따. 더 복잡한 클래스나 함수를 다룰 때, 데이터가 반드시 특정 타입일 필요가 없는
// // 유연성이 있는 데이터가 들어가있는 경우, 하지만 입ㄷ력되는 데이터의 타입 정보는 저장해서 타입스크립트의 
// // 지원을 더 받고 싶을 때 제네릭 타입을 활용허면 좋다

// ----------------------------------------------------------------------------

//제네릭 함수 생성하기 
// 1. 함수 구현
// 두 객체를 병합해서 새로운 객체 하나를 반환하는 함수를 쓴다고 가정.
// function merge(objA: object, objB: object) {
// 	return Object.assign({}, objA, objB)
// }

// const mergedObj = merge({name: '빵빵이'}, {age: 25}) as {name: string, age: number};

// console.log(mergedObj); // {name: '빵빵이', age: 25}
// mergedObj.age; // 접근할 수가 없음!
// 그 이유는 타입스크립트가 모르기 때문, 우리가 전달한 메세지는 객체가 하나 생길거고 타입스크립트는 
// 우리가 객체 하나를 반환할 거라고 추론한다. 

//제네릭 타입은 여러개의 글자도 가능하지만 보통은 한글자 type의 약자인 T를 사용
// 두번째 타입은 보통 U를 사용
// function merge<T, U>(objA: T, objB: U) {
//   return Object.assign({}, objA, objB);
// }

// const mergedObj = merge({ name: '빵빵이' }, { age: 25 });

// console.log(mergedObj); // { name: '빵빵이', age: 25 }
// console.log(mergedObj.age); // 25 (정상 접근 가능)


// //지금은 추론이 가능한데 아까는 왜 추론을 하지 못했을까?
// // 객체는 굉장이 불특정한 타입인데, 그렇다고 해서 ts는 물론 객체와 객체의 교차 타입을 반환할 거라고 추론할 수 있다.
// // 하지만 미상의 두 객체의 교차타입은 그저 또 다른 미상의 객체일 뿐이다.
// // ts는 미상의 객체에 타입 정보르 ㄹ제공하지 않는다. 
// // 하지만 제네릭 타입을 사용하면 ts에 이 두 매개변ㅅ는 서로 다른 타입일 수 있다고 말해주는 것과 같다.
// // 그러면 ts는 우리가 아무 객체 타입을 가지고 작업하는 게 아니라 다른 타입의 데이터를 활용하겠구나, 라고 이해한다.
// // ts에 추가 정보를 주는 것. 정확히 어떤 타입을 다룰지는 모르겟는데, name키를 가졌는지, age키를 가졌는지 
// // 알지 못하고 신경 쓰지 않는다. 제네릭에선 정확한 객체는 중요하지 않다. 
// // 위 예제 경우 뭐가 될진 모르겠지만 어떤 타입이긴 할거고 확실한건 두 번째 객체 타입과는 다를것이다. 라는점.


// const mergeObj2 = merge({name: '김옥지', hobbies: ['sports']}, {age: 26});
// // 위처럼 할 수 있지만 너무도 번거롭다.
// // 그렇게 할 필요가 없는 이유는 ts가 우리가 인수로 전달하는 값의 타입을 추론할 수 있기 때문.
// // 추론한 타입을 이 함수 호출에 대한 T와 U에 연결함.
// // 여기서 제네릭이 훌륭한 점은 서로 다른 두 타입이 있다는 사실을 알려주는 것도 있지만, 
// // 이 함수를 정의할 때 타입을 특정해 놓는 게 아니라 함수를 호출할 때 동적으로 설정할 수 있다는 점.


//제약 조건 작업하기

// function merge<T, U>(objA: T, objB: U) {
//   return Object.assign({}, objA, objB);
// }
// const mergedObj = merge({name: '김옥지', hobbies: ['sports']}, 30);

// console.log(mergedObj); // {name: '김옥지', hobbies: Array(1)}

//위처럼 age객체 대신 30을 입력하면 ts는 그래도 컴파일을 하고 실행한다.
//하지만 30은 객체가 아니라 무시당해 출력이 되지 않는 모습.

//assign메서드는 객체를 합쳐주는 메서드이다. 그래서 T와 U는 어떤 타입이던 상관이 없지만
// 객체이기는 해야함. 이럴 떄 필요한게 제약 조건.

// function merge<T, U extends object>(objA: T , objB: U) {
//   return Object.assign({}, objA, objB);
// }
// const mergedObj = merge({name: '김옥지', hobbies: ['sports']}, 30); // Argument of type 'number' is not assignable to parameter of type 'object'.

// console.log(mergedObj); // {name: '김옥지', hobbies: Array(1)}


// // 제약조건은 제네릭 타임 뒤에 extends type 을 사용하면 된다.
// // 제약 조건은 제네릭 타입을 더 효율적으로 최적화된 방식으로 활용할 수 있도록 해준다.
// // 그러면 불필요한 오류나 예기치 않은 작동을 피할 수 있다.


// 다른 일반 함수

// interface Lengthy {
// 	length: number;
// }

// function countAndPrint<T extends Lengthy>(element: T): [T, string] {
// 	let descriptionText = '값이 없습니다.';
// 	if(element.length > 0) {
// 		descriptionText = `${element.length}개 있습니다.`;
// 	}

// 	return [element, descriptionText];
// }

// console.log(countAndPrint('아아 마이크 테스트')); // (2) ['아아 마이크 테스트', '글자가 10개 있습니다.']


//keyof 제약조건

// function extractAndConvert<T extends object, U extends keyof T> (obj: T, key: U) {
// 	return `Value : ${obj[key]}`
// }

// console.log(extractAndConvert({name: '김옥지'}, "name"));
// // console.log(extractAndConvert({name: '김옥지'}, "age")); // Argument of type '"age"' is not assignable to parameter of type '"name"'.


// 제네릭 클래스

// class DataStorage<T> {
// 	private data: T[] = [];

// 	addItem(item: T) {
// 		this.data.push(item);
// 	}

// 	removeItem(item: T) {
// 		this.data.splice(this.data.indexOf(item), 1);
// 	}

// 	getItem() {
// 		return [...this.data];
// 	}
// }

// const textStorage = new DataStorage<string>();
// textStorage.addItem('빵빵이');
// textStorage.addItem('김옥지');
// textStorage.removeItem('빵빵이');
// console.log(textStorage.getItem());

// const numberStorage = new DataStorage<number>();

//제네릭 클래스를 왜 사용할까?
//위처럼 텍스트가 아닌 숫자를 저장하고 싶을 수도 있다.
//그럼 간단하게 number 타입만 지정해주면 해당 스토리지는 숫자만 넣을 수 있다.
// 유니언 타입을 이용하면 두 타입을 모두 허용하는 스토리지로 설정할 수 도 있다.

// 참조타입의 문제
// class DataStorage<T> {
// 	private data: T[] = [];

// 	addItem(item: T) {
// 		this.data.push(item);
// 	}

// 	removeItem(item: T) {
// 		this.data.splice(this.data.indexOf(item), 1);
// 	}

// 	getItem() {
// 		return [...this.data];
// 	}
// }

// const objStorage = new DataStorage<object>();
// objStorage.addItem({name: '빵빵이'}); 
// objStorage.addItem({name: '김옥지'});
// objStorage.removeItem({name: '빵빵이'});
// console.log(objStorage.getItem()); // 0 : {name: '빵빵이'}
//정상적으로 보일 수 있지만 정상적으로 작동되는 것이 아니다.
//우리는 '빵빵이'를 지우고 싶었는데 '빵빵이'가 지워지지 않고 마지막 요소가 지워진다.
// 그 이유는 우리가 객체를 다루고 있다는 점이다.
//js의 객체는 참조 타입으로 원시값을 다루는 로직은 비 원시 값(객체, 배열 등)을 제대로 다루지 못한다.
// indexOf에 객체를 전달하여 원하는 값을 찾지 못해 -1를 반환, 따라서 마지막 요소를 제거한다.
// 우리가 추가한 옥지와 제거한 옥지는 값은 같아 보이지만 메모리에서는 완전 새로운 객체이고 다른 주소를 가진다.

//첫번째 방법 if문으로 확인하거나 추가 제거하려는 값을 변수에 담아 사용하기기
// class DataStorage<T> {
// 	private data: T[] = [];

// 	addItem(item: T) {
// 		this.data.push(item);
// 	}

// 	removeItem(item: T) {
// 		if(this.data.indexOf(item) === -1) {
// 			return;
// 		}
// 		this.data.splice(this.data.indexOf(item), 1);
// 	}

// 	getItem() {
// 		return [...this.data];
// 	}
// }

// const objStorage = new DataStorage<object>();
// const nameObj = {name: '빵빵이'}
// objStorage.addItem(nameObj); //nameObj 같은 메모리 주소 사용용
// objStorage.addItem({name: '김옥지'});
// objStorage.removeItem(nameObj); // nameObj 같은 메모리 주소 사용
// console.log(objStorage.getItem()); // 0 : {name: '김옥지'}

//두번째 방법 이 타입을 원시 값으로만 작동하게 함
class DataStorage<T extends string | number | boolean> {
	private data: T[] = [];

	addItem(item: T) {
		this.data.push(item);
	}

	removeItem(item: T) {
		if(this.data.indexOf(item) === -1) {
			return;
		}
		this.data.splice(this.data.indexOf(item), 1);
	}

	getItem() {
		return [...this.data];
	}
}
const nameStorage = new DataStorage<string>();
nameStorage.addItem('빵빵이');
nameStorage.addItem('김옥지');
nameStorage.removeItem('빵빵이');

console.log(nameStorage.getItem()); // ['김옥지']

//이렇듯 유연하게 적용하면 되고 제약 조건도 자유롭게 사용하면 된다
//전박적으로 제네릭타입은 개발자가 코딩을 더 수월하게 할 수 있도록 해주고 어떤 조합이든
// 유연성을 확보하도록 도와준다.


//제네릭 타입과 유니온 타입의 차이점
//제네릭은 호출할 때 여러 타입중 하나를 활용해 호출하는 함수를 만든다면
// 유니온 타입은 여러 타입을 다 사용할 수 있는 타입