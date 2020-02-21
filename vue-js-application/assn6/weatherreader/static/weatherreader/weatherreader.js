var app = new Vue({
  el: "#base",

  data: {
    zipCode: -1,
    forecast: null,
    current: null,
    currentStatus: "false",
    currentString: -1,
    defaulty: 0,
    likely: 0,
    unlikely: 0,
  },

  delimiters: ["[%", "%]"],

  methods: {
    getZip: function() {
      return zipCode;
    },
    changeStates: function(text, event) {
      var currentClass = event.target.parentNode.className;
      var newClass = "";
      if(currentClass == "default") {
        if(this.defaulty > 0) {
          this.defaulty--;
        }
        this.likely++;
        newClass = "likely"
      }
      else if(currentClass == "likely") {
        if(this.likely > 0) {
          this.likely--;
        }
        this.unlikely++;
        newClass = "unlikely";
      }
      else if(currentClass == "unlikely") {
        if(this.unlikely > 0) {
          this.unlikely--;
        }
        this.defaulty++;
        newClass = "default";
      }
      event.target.parentNode.className = newClass;
    }
  },

  created() {
    let ipBase = "http://api.ipstack.com/check?";
    let ipKey = "access_key=0a4cf349f3dcf47097f78db5e8b1b59d";
    let ipReq = ipBase + ipKey;

    let weatherBase = "http://api.openweathermap.org/data/2.5/";
    let forecastBase = "forecast?zip=";
    let currentBase = "weather?zip=";
    let usEnd = ",us";
    // ("");
    let imperial = "&units=imperial";
    let weatherKey = "&appid=e41aa422f8716c96e716374177d4fbd8";

    fetch(ipReq)
      .then(response => response.json())
      .then(json => {
        this.zipCode = json.zip;

        let forecastURL =
          weatherBase +
          forecastBase +
          this.zipCode +
          usEnd +
          imperial +
          weatherKey;
        return fetch(forecastURL);
      })
      .then(response => response.json())
      .then(json => {
        console.log("5-day Forecast:");
        this.forecast = [];

        for (let i = 0; i < json.list.length; i++) {
          var temp = "";
          var date = new Date(json.list[i].dt * 1000);
          var time =
            date.toDateString() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds();
          temp = date.toString();
          temp +=
            "\nTemperature: " +
            json.list[i].main.temp_min +
            "°F - " +
            json.list[i].main.temp_max +
            "°F";
          temp += "\nSky Conditions: " + json.list[i].weather[0].main;
          temp += "\nHumidity: " + json.list[i].main.humidity + "%";
          temp += "\nPressure: " + json.list[i].main.pressure + "hPa";

          var tempObj = {};
          tempObj.txt = temp;
          tempObj.id = json.list[i].dt;
          tempObj.vote = "default";

          this.forecast.push(tempObj);
          this.defaulty++;
        }

        let currentURL =
          weatherBase +
          currentBase +
          this.zipCode +
          usEnd +
          imperial +
          weatherKey;
        return fetch(currentURL);
      })
      .then(response => response.json())
      .then(json => {
        current = json;
        var date = new Date(current.dt * 1000);
        var time =
          date.toDateString() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds();
        this.currentString = "Current Weather!";
        this.currentString += "\nDate: " + date.toDateString();
        this.currentString +=
          "\nTemperature: " +
          current.main.temp_min +
          "°F - " +
          current.main.temp_max +
          "°F";
        this.currentString += "\nSky Conditions: " + current.weather[0].main;
        this.currentString += "\nHumidity: " + current.main.humidity + "%";
        this.currentString += "\nPressure: " + current.main.pressure + "hPa";
        currentStatus = "true";
      });
  }
});
