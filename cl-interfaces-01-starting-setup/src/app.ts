// type AddFc = (a: number, b: number) => number; // 커스텀 타입입

interface AddFc {
	(a: number, b: number): number; //메서드 이름을 작성하지 않는 익명함수로 정의.
//그럼 ts는 이 인터페이스에 익명 함수가 있다는 것을 알고 인터페이스를
//  이 형태의 함수 타입으로 사용하려는 것을 이해한다
}
let add: AddFc;

add = (n1: number, n2: number) => {
	return n1 + n2;
}
// 보통은 커스텀 타입을 사용하는게 일반적이지만 가끔 사용한다.

// 인터페이스란 무엇일까?

// 간단하게 설명하자면 인터페이스는 객체의 구조를 정의한다. 
// 객체가 어떻게 구성되어야 할지 정의한다. 

// 인터페이스 상속
interface Named {
	readonly name?: string;
	outputName?: string;
}

interface AnotherInterface {

}

// 예시
interface Greetable extends Named, AnotherInterface {
	// age: number;

	greet(phrase: string): void;
}
//위처럼 커스텀 타입과 같이 사용한다고 생각하면 된다. 다만 고정된 값은 할당하지는 않는다.
//구조는 정의할 수 있지만 값은 할당할 수 없다.

//클래스는 하나만 상속할 수 있지만 인터페이스는 쉼표를 이용해 여러 개를 상속할 수 있다.
class Person implements Greetable, Named {
	name?: string;
	age = 30;
 
	constructor(name: string = "Default") { 
		// 선택적 매개변수를 사용하면 아래처럼 값이 있을 때와 없을 떄를 구별하는 로직을 작성하거나
		// 매개변수의 기본값을 할당해야한다.
		if(name) {
			this.name = name;
		}
	}

	greet(phrase: string): void {
		if(this.name) {
			console.log(`${phrase} ${this.name}`);
		} else {
			console.log("ㅎㅇㅎㅇ");
		}
	}
}

// 그렇다면 인터페이스를 어떻게 사용할 수 있을까? 왜 인터페이스를 사용할까?

// 1. 객체의 타입을 확인할 수 있따.
let user1: Greetable;

// user1 = {
// 	name: '빵빵이',
// 	age: 30,
// 	greet(phrase: string) {
// 		console.log(`${phrase} ${this.name}`);
// 	}
// }
user1 = new Person("김옥지");
// user1.name = '김노엠' // Cannot assign to 'name' because it is a read-only property.

user1.greet("ㅎㅇㅎㅇ"); // ㅎㅇㅎㅇ 빵빵이
console.log(user1);

//위와 같이 객체의 구조가 인터페이스의 구조와 일치하는지 타입을 확인할 수 있다.

interface option {
	gender: string;
}

interface option2 {
	name: string;
	readonly age?: number;
}

class User10 implements option2, option {
	readonly gender: string;
	name: string;
	age?: number;

	constructor(gender: string, name: string, age?: number) {
		this.gender = gender;
		this.name = name;
		this.age = age;
	}
	
	print() {
		if(this.age) {
			console.log(`name: ${this.name}, age: ${this.age}, gender: ${this.gender}`);
		} else {
			console.log(`name: ${this.name}, gender: ${this.gender}`);
		}
	}
}

let userInfo1 = new User10('남자', '김노엠'); // name: 김노엠, gender: 남자
let userInfo2 = new User10('여자', '김옥지', 33); // name: 김옥지, age: 33, gender: 여자


userInfo1.print();
userInfo2.print();


interface Hero {
	name: string;
}

interface HeroInfo extends Hero {
	age: number;
}

class Hero implements HeroInfo {
	name: string;
	age: number;

	constructor(name: string, age:number) {
		this.name = name;
		this.age = age;
	}
}

const hero1 = new Hero('아이언맨', 47);

console.log(hero1);