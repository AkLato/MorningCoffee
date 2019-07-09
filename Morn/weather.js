class Weather {
    constructor(city, country) {
        this.apiKey = '3d4d51f555e2a6471d9f3c93643acab6';
        this.city = city;
        this.country = country;
    }

    // Fetch weather from API
    async getWeather() {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&APPID=${this.apiKey}`);

        const responseData = await response.json();

        return responseData
    }

    // Change weather location
    changeLocation(city, country) {
        this.city = city;
        this.country = country;
    }
}