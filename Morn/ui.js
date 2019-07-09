class UI {
    constructor() {
        this.location = document.getElementById('w-location')
        this.desc = document.getElementById('w-desc')
        this.string = document.getElementById('w-string')
        this.details = document.getElementById('w-details')
        this.icon = document.getElementById('w-icon')
        this.humidity = document.getElementById('w-humidity')
        this.pressure = document.getElementById('w-pressure')
        this.temp_min = document.getElementById('w-temp_min')
        this.temp_max = document.getElementById('w-temp_max')
        this.wind = document.getElementById('w-wind')

        
    }

    paint(weather) {
        this.location.textContent = weather.name;
        this.desc.textContent = weather.weather[0].main;
        this.string.textContent = `${weather.main.temp} ºC`;
        this.icon.setAttribute('src', `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
        this.humidity.textContent = `Vlhkost ${weather.main.humidity} %`;
        this.pressure.textContent = `Tlak ${weather.main.pressure} hPa`;
        this.temp_min.textContent = `Minimum ${weather.main.temp_min} ºC`;
        this.temp_max.textContent = `Maximum ${weather.main.temp_max} ºC`;
        this.wind.textContent = `Vítr ${weather.wind.speed} km/h`;
    }
}