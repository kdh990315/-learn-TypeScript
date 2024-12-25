function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  console.log(typeof n1);
  const result = n1 + n2;
  return phrase + result + " " + showResult;
  // return phrase + n1 + n2 + " " + showResult; -> phrase가 문자열이기 때문에 n1와 n2가
  //자연스럽게 문자열로 변환
}


let number1;
number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrese = "Result is : "

const result = add(number1, number2, printResult, resultPhrese);
console.log(result);