function sum(num1) {
	return function(num2) {
		return num1 + num2;
	};
}
const result = sum(10)(2);
