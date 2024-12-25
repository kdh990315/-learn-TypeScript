function add(n1: number, n2: number) {
	return n1 + n2;
}

function printResult(num: number): void {
	console.log(`Result: ${num}`);
}

function addAndHandler(n1: number, n2: number, callback: (num: number) => void) {
	const result = n1 + n2;
	callback(result);
}

printResult(add(5, 12));

let combineValues: (a:number, b:number) => number;

combineValues = add;
// combineValues = 5;
// combineValues = printResult; // printResult함수는 1개의 인자만 받지만 ts는 이걸 인지하지 못함.

console.log(combineValues(8, 8));

addAndHandler(10, 20, (result) => {
	console.log(result);
})