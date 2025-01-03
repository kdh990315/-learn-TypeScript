//인터섹션 타입 상속과 비슷하다.
//두 타입을 합쳐서 새로운 타입을 만든다.
//두 타입 앨리어스가 유니온 타입으로 되어있을 때 합친다면 두 교차 타입이 타입이 된다.

// interface Admin {
// 	name: string;
// 	privileges: string[];
// }

// interface Employee {
// 	name: string;
// 	startDate: Date;
// }

// interface ElevatedEmployee extends Admin, Employee {}

type Admin = {
	name: string;
	privileges: string[];
}

type Employee = {
	name: string;
	startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const el:ElevatedEmployee = {
	name: 'kim',
	privileges: ['create-server'],
	startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
//두 타입의 교차 타입이 타입이 된다.


//타입 가드
//타입가드는 유니온타입을 사용할 떄 유용한데 타입을 유연하게 정의해서 쓸 수 있다.

// function add(a: Combinable, b: Combinable) {
// 	return a + b;
// }
// //a와 b의 타입이 명확하지 않아서 오류가 난다.

function add(a: Combinable, b: Combinable) {
	if(typeof a === 'string' || typeof b === 'string') {
		return a.toString() + b.toString();
	}
	return a + b;
}

//위처럼 타입가드는 typeof를 활용한다.

type UnknownEmployee = Employee | Admin;

function printEmployeeInfomation(emp: UnknownEmployee) {
	console.log("Name" + emp.name); 
	if('privileges' in emp) {
		console.log("Privileges" + emp.privileges);
	}
	if('startDate' in emp) {
		console.log('Start Date' + emp.startDate);
	}
}
//'privileges' in emp 이건 자바스크립트 코드인데 empp로 받은 객체에 속성으로 존재하는지 확인함.

printEmployeeInfomation(el)


// function printEmployeeInfomation(emp: UnknownEmployee) {
// 	console.log("Name" + emp.name); 
// 	if(typeof emp === 'Employee') {}
// 	if(emp.privileges) {}
// 	console.log("Privileges" + emp.privileges);
// }
//자바스크립트는 string, number, boolean 의 타입만 알고 있다.
//if(typeof emp === 'Employee')도 안되는 이유는 Employee는 우리가 직접 만든 타입이기 떄문에
//타입스크립트에서만 존재하고 js상에서는 존재하지 않는 타입이다.

//	if(emp.privileges) {} 처럼 접근하는 것은 타입스크립트에서 허용하지 않는다. 확인도 안함



//클래스가 대상이 되면 또 다른 종류의 타입 가드를 이용할 수 있다.
//instanceof

class Car {
	drive() {
		console.log('Driving ... ');
	}
}

class Truck {
	drive() {
		console.log('Driving a truck... ');
	}
	loadCargo(amount: number) {
		console.log("Loading cargo..." + amount);
	}
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
	vehicle.drive();
	// if('loadCargo' in vehicle) {
	//vehicle이 truck인스턴스인지를 확인한다.
	//만약 참이라면 vehicle에 loadCargo 메소드가 있을 거라고 알 수 있다.
	//instanceof는 바닐라 자바스크립트가 제공하는 일반 연산자이다.
	if(vehicle instanceof Truck) {
		vehicle.loadCargo(1000);
	}
}
//instanceof는 인터페이스는 사용이 불가함. 왜냐면 인터페이스는 자바스크립트 코드로 컴파일되지 않기 때문.
//그래서 런타임에서 사용할 수 없다. 클래스는 자바스크립트가 지원하기 때문에 가능하다.

useVehicle(v1);
useVehicle(v2);



//구별된 유니온
interface Bird {
	type: 'bird';
	flyingSeepd: number;
}

interface Horse {
	type: 'hores';
	runningSpeed: number;
}
//위에서 사용된 type은 리터럴 형식이다. 어느 타입이 아니다.
//Hores의 타입을 사용할 때 type은 'hores'라는 문자열을 받겠다. 라는 의미이다.

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
	let speed;
	switch (animal.type) {
		case "bird":
			speed = animal.flyingSeepd;
			break;
		case "hores":
			speed = animal.runningSpeed;
	}
	console.log("moving with speed: " + speed);
}

moveAnimal({type: 'bird', flyingSeepd: 10})
//이게 구별된 유리언인 이유는 하나의 공통 속성을 추가했기 때문이다. 모든 객체에 추가해줬다.
//유니언에 속한 모든 객체에 객체를 설명하는 속성을 추가해줬다. 
// 객체를 알려주는 속성을 이용하면 조건을 확인하는 부분에서 타입이 100% 보장된다.
//또 어떤 속성을 활용할 수 있는지 객체에 따라 판단 가능


// interface Bird {
// 	flyingSeepd: number;
// }

// interface Horse {
// 	runningSpeed: number;
// }

// type Animal = Bird | Horse;


// function moveAnimal(animal: Animal) {
// 	// if('flyingSeepd' in animal)
// 	console.log("moving with speed: " + animal.flyingSeepd);
// }
//두 인터페이스 함수중 어떤 인터페이스 타입으로 들어올지 모르기 때문에 오류가 난다.
//우리가 위에서 배운대로 in을 사용하여 할 수도 있지만 오타의 위험이 높다.
//오타가 나도 알려주지 않음.


//형 변환
//어떤 값이 어떤 타입인지를 타입스크립트에게 알려준다. 타입스크립트가 그 타입을 판단하지 못할 때.
//예시로 DOM에 있는 뭔가에 접근할 때가 있는데 html에 p태그를 querySelector로 가져올때
// HTMLParagraphElement | null 이라는 타입으로 가져온다.
//하지만 getElementById 아이디값으로 불러온다면? HTMLElement  | null로 가져온다.
//이 상황이 이상하지 않을 수 있는데 만약 input필드를 가져온다면?

// const pp = document.getElementById('#message-output')

// const userInputEl = document.getElementById('#user-input')!;

// userInputEl.value = "Hi there!"

//위에서 오류가 나는것은 일종의 타입인 HTMLElement는 일반적인것이고, 특정 html요소에 특화된 
//속성을 지원해주지 않는다. 그래서 이 지점에서 타입스크립트에게 알려줘야한다.
//여기서 선택하는건 null이 떄려 죽여도 아니라는 것과 HTMLInputElement라는 타입이라는 것을.
//이걸 형 변환으로 처리해줄 수 있다.

//첫 번쨰 방법

// const userInputEl = <HTMLInputElement>document.getElementById('#user-input')!;
// userInputEl.value = "Hi there!"
//HTMLInputElement은 전역적으로 사용 가능. 그 이유는 tsconfig.json의 compilerOptions의 lib속성에서 
//dom라이브러리를 추가했기 떄문.
//이렇게 하면 타입스크립트는 알게된다, 우리갓 ㅓㄴ택하는 그 무엇 즉 꺾쇠 괄호 뒤에 오는 건 타입이 
//HTMLInputElement이라는 것을.

//두 번째 방법
// const userInputEl = document.getElementById('#user-input') as HTMLInputElement;
// userInputEl.value = "Hi there!"
//이 방법은 리액트의 꺾쇠 괄호와 혼동되기 쉽기 때문에 타입스크립트에서 추가한 문법이다.

//!는 타입스크립트에게 절대 null이 아니라는 것을 명시하는 표시이다.
//만약 확실하지 않다면 if문이나 타입가드를 활용한다.

// const userInputEl = document.getElementById('#user-input');
// if(userInputEl) {
// 	(userInputEl as HTMLInputElement).value = "Hi there!";
// }




//인덱스 속성
//인덱스 속성은 객체를 생성할 때 유용하다.
//객체의 속성 관련해서 보다 유연한 객체를 만들 때.
interface ErrorConainer {
	[prop: string]: string;
}

const errorBag: ErrorConainer = {
	email: "not a valid email!",
	username: "Must start with a capital character!"
}