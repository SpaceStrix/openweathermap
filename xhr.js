const container = document.querySelector('.container');
const listItems = document.querySelector('.list-group');
const userInfo = document.querySelector('.info-user');

listItems.addEventListener('click', (e) => {
	if (e.target.dataset.idUser) {
		getUserHTTP(e.target.dataset.idUser, getUserInfoCallBack);
	}
});

function getPosts(callBack) {
	const xhr = new XMLHttpRequest();
	const apiURL = 'https://jsonplaceholder.typicode.com';
	xhr.open('GET', `${apiURL}/users`);
	xhr.addEventListener('load', () => {
		const response = JSON.parse(xhr.responseText);
		callBack(response);
	});

	xhr.addEventListener('error', () => {
		if (xhr.status >= 400) {
			console.error('Что-то пошло не так');
		}
	});
	xhr.send();
}

function getUserHTTP(id, callBack) {
	const xhr = new XMLHttpRequest();
	const apiURL = 'https://jsonplaceholder.typicode.com';
	xhr.open('GET', `${apiURL}/users/${id}`);
	xhr.addEventListener('load', () => {
		const response = JSON.parse(xhr.responseText);
		callBack(response);
	});
	xhr.send();
}

function rednderUser(response) {
	const list = document.querySelector('.list-group');
	response.forEach((user) => {
		const elementList = document.createElement('li');
		elementList.classList.add('list-group-item', '18rem');
		elementList.style.cursor = 'pointer';
		elementList.textContent = user.name;
		elementList.setAttribute('data-id-user', user.id);

		list.append(elementList);
	});
	container.append(list);
}

function getObjUsers() {
	getPosts(rednderUser);
}

function getUserInfoCallBack(user) {
	if (!user.id) {
		console.log('User not found');
		return;
	}
	renderUserInfo(user);
}

function renderUserInfo(user) {
	userInfo.innerHTML = '';

	const template = templateInfoUser(user);
	userInfo.insertAdjacentHTML('afterbegin', template);
}
function templateInfoUser(user) {
	return `
	<h5 class="card-title">${user.email}</h5>
	`;
}

getObjUsers();
