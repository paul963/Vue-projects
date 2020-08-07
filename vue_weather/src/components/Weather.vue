<template>
  <!-- Container changes color due to temperature (<20 blue, >20 red) -->
  <div id="app" :class="typeof weather.main !='undefined' && weather.main.temp > 20 ?
    'warm' : 'cold'">

      <!-- Location searc box -->
      <div class="search-box">
        <input type="text" class="search-bar" placeholder="Search..."
          v-model="query"
          @keypress="fetchWeather"
        />
      </div>

      <!-- Location and date container -->
      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>


        <!-- Temperature and weather condition container -->
        <div class="weather-box">
          <div class="temperature">{{ Math.round(weather.main.temp) }}°C</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'app',

  // connection to API
  data () {
    return {
      api_key: 'af1321e4955962297938cd6282d7513a',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {}
    }
  },

  methods: {
    // Method for reading the weather with API for the city introduced 
    fetchWeather (e) {
      if(e.key == "Enter") {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
          .then(res => {
            return res.json();
          }).then(this.setResults);
      }
    },

    // Method for storing results in weather variable
    setResults (results) {
      this.weather = results;
    },

    // Method for retrieving the current date
    dateBuilder () {
      let d = new Date();
      let moths = ["January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = moths[d.getMonth()];
      let year = d.getFullYear();

      return `${day}, ${date} ${month} ${year}`;
    }
  }
}
</script>

<style>
#app{
  min-height: 100vh;
  transition: 0.3s;
}

#app.warm{
  background-image: linear-gradient(to bottom, rgba(204, 102, 0, 0.35), rgba(204, 102, 0, 0.8));
}

#app.cold{
  background-image: linear-gradient(to bottom, rgba(0, 51, 102, 0.25), rgba(0, 51, 102, 0.8));
}

.search-box{
  margin: 0 25%;
  width: 50%;
}

.search-box .search-bar{
  margin-top: 10vh;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  
  appearance: none;
  border: none;
  outline: none;

  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  transition: 0.3s;
}

.search-box .search-bar:focus{
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 2px 6px 8px rgba(0, 0, 0, 0.2);
}

.location-box .location{
  padding: 25px 0px 3px 0px;
  color: #fff;
  font-size: 45px;
  font-weight: 600;
  text-align: center;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.3);
}

.location-box .date{
  color: #fff;
  font-size: 25px;
  text-align: center;
}

.weather-box{
  text-align: center;
}

.weather-box .temperature{
  padding: 15px 0px 0px 0px;
  color: #fff;
  font-size: 90px;
  font-weight: 900;
  text-shadow: 2px 3px rgba(0, 0, 0, 0.5);
}

.weather-box .weather{
  color: #fff;
  font-size: 50px;
  font-style: italic;
  font-weight: 300;
}
</style>
