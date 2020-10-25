const container = document.querySelector('.container');

function getWeather() {
	navigator.geolocation.getCurrentPosition((position) => {
		const longitude = position.coords.longitude;
		const latitude = position.coords.latitude;

		const apiWeather = `https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&units=metric&appid=e4f36738c8699d692dbac2b492dc82a5&lang=ru`;

		fetch(apiWeather)
			.then((response) => response.json())
			.then((data) => {
				const result = trueObjeWeather(data);
				return result;
			})
			.then((newData) => {
				const createTemplate = createTemplateWeather(newData);
				container.insertAdjacentHTML('afterbegin', createTemplate);
			})
			.catch((err) => console.log(err));
	});
}
getWeather();

function createTemplateWeather(response) {
	const currentDate = new Date();
	return `
	<div class="cards">
	<div class="card-info">
	  <div class="card-date">
		<p class="date-text">${currentDate.getDate()}.${currentDate.getMonth() +
		1}.${currentDate.getFullYear()} | ${response.name}</p>
		<!-- /.date-text -->
		<div class="card-temp">
		  <h2 class="temp">${Math.floor(response.temp)}°</h2>
		  <!-- /.temp -->
		  <div class="full-info">
			<div class="humidity-info">
			  <img src="icons/humidity.png" alt="" class="info-img">
			  <span class="humidity-data">${response.humidity}%</span> 
			  <!-- /.humidity-info -->
		  </div>
		  <div class="wind-info">
			<img src="icons/wind.png" alt="" class="info-img">
			<span class="wind-data">${response.speed} м/с</span> 
			<!-- /.humidity-info -->
		</div>
		  </div>
		  <!-- /.full-info -->
		</div>
		<!-- /.card-temp -->
	  </div>
	  <!-- /.card-date -->
	</div>
	<!-- /.card-info -->
	<div class="card-icon">
	  <img src="https://openweathermap.org/img/wn/${response.icon}@2x.png" class="card-img" alt="...">
	  <span class="clouds">
	  ${response.description}
	</span> <!-- /.clouds -->
	</div>
	<!-- /.card-icon -->
  </div>
  <!-- /.card -->
	`;
}

function trueObjeWeather(data) {
	return {
		name: data.name,
		temp: data.main.temp,
		humidity: data.main.humidity,
		speed: data.wind.speed,
		icon: data.weather[0]['icon'],
		description: data.weather[0].description
	};
}
