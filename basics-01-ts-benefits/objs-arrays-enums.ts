// const person:{
// 	name: string;
// 	age: number;
// } = {
// const person: {
// 	name: string;
// 	age: number;
// 	hobbies: string[];
// 	role: [number, string];
// } = {
// 	name: '빵빵이',
// 	age: 30,
// 	hobbies: ['운동', '요리'],
// 	role: [2, 'author']
// };

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role {ADMIN = "ADMIN", READ_ONLY = 7, AUTHOR}

const person = {
	name: '빵빵이',
	age: 30,
	hobbies: ['운동', '요리'],
	role: Role.ADMIN
};

// person.role.push('admin');
// person.role[1] = 10; // Type 'number' is not assignable to type 'string'.
// person.role = [0, 'admin', 'user'];

let activities: string[];
activities = ['게임', '맛집 다니기']

console.log(person);

for(const hobby of person.hobbies) {
	console.log(hobby);
	// console.log(hobby.map()); // 문자열에 map메서드를 사용할 수 없다고 알려줌!
}

if (person.role === Role.ADMIN) {
	console.log('is admin');
}