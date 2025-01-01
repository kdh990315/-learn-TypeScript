abstract class Department {
	static fiscalYear = 2020;

	// private readonly id: string;
	// private name: string;
	protected employees: string[] = [];

	constructor(protected readonly id: string, public name: string) {
		// this.id = id;
		// this.name = n;
		// 위처럼 필드를 정의한 다음 값을 할당했던 두 차례의 
		// 초기화 코드 대신 한번에 정의하고 값을 할당할 수 있음.

		// console.log(Department.fiscalYear);
	}

	static createEmployee(name: string) {
		return {name: name}
	}

	abstract describe(this: Department): void;
		// console.log(`department (${this.id}): ${this.name}`);
	

	addEmployee(employees: string) {
		this.employees.push(employees);
	}

	printEmployeeInformation() {
		console.log(this.employees.length);
		console.log(this.employees);
	}
}

class ITDepartment extends Department {
	public admins: string[];
	constructor(id: string, admins: string[]) {
		super(id, "IT");
		this.admins = admins
	}

	describe(): void {
		console.log(`department (${this.id}): ${this.name}`);
	}
}

class AccountingDepartment extends Department {
	private lastReport: string;
	private static instance: AccountingDepartment;

	get mostRecentReport() {
		if(this.lastReport) {
			return this.lastReport;
		}
		throw new Error("no report found")
	}

	set mostRecentReport(value: string) {
		if(!value) {
			throw new Error('Please pass in a valid value!')
		}
		this.addReport(value);
	}

	private constructor (id: string, private reports: string[]) {
		super(id, 'Accounting');
		this.lastReport = reports[0]
	}

	//privae생성자 예제
	static getInstance() {
		if(AccountingDepartment.instance) {
			return this.instance;
		}
		this.instance = new AccountingDepartment('d2', []);
		return this.instance;
	}

	describe() {
		console.log('Accounting Department - ID : ' + this.id);
	}

	addEmployee(name: string) {
		if(name === "kim") {
			return;
		}
		this.employees.push(name)
	}

	addReport(text: string) {
		this.reports.push(text)
		this.lastReport = text;
	}

	printReports() {
		console.log(this.reports);
	}
}

// static 정적 메서드를 활용한 예제
const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment("d1", ['dong'])

it.addEmployee('dong');
it.addEmployee('manu')

// it.employees[2] = 'choi'; // private로 선언해서 클래스 안에서만 참조 가능

it.describe();
it.printEmployeeInformation();

console.log(it);

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance()
const accounting2 = AccountingDepartment.getInstance()

console.log(accounting);
console.log(accounting2);

// set을 이용하여 값 추가하기
accounting.mostRecentReport = 'Your End Report';

accounting.addReport('Somethings went wrong...')

//get을 이용하여 값 가져오기
console.log(accounting.mostRecentReport);

accounting.printReports();

accounting.addEmployee('kim');
accounting.addEmployee('back');
accounting.addEmployee('hong');
// accounting.printEmployeeInformation();
accounting.describe();

// console.log(accounting);
// const accountingCopy = {name: 's', describe : accounting.describe}

// accountingCopy.describe();
