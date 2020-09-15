function randeomColor() {
	const list = [ ...document.querySelector('ul').children ];
	const color = [ 'blue', 'yellow', 'red', 'green', 'orange', 'brown' ];
	list.forEach((item) => {
		const rColor = Math.floor(Math.random() * color.length);
		item.style.background = color[rColor];
	});
}
// setInterval(randeomColor, 1000);
