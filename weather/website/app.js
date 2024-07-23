// Personal API Key for OpenWeatherMap API
const weatherApiKey = "your_api_key&units=imperial";

/* Global Variables */
const weatherApiBaseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
const currentDate = new Date();
const formattedDate = `${currentDate.getMonth() + 1}.${currentDate.getDate()}.${currentDate.getFullYear()}`;

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", handleGenerateClick);

// Function called by event listener
function handleGenerateClick(e) {
  const userZipCode = document.getElementById("zip").value;
  const userFeelings = document.getElementById("feelings").value;

  fetchWeatherData(weatherApiBaseURL, userZipCode, weatherApiKey).then(function (weatherData) {
    submitWeatherData("/add", {
      date: formattedDate,
      temp: weatherData.main.temp,
      content: userFeelings,
    }).then(updateWeatherUI);
  });
}

// Function to GET Web API Data
const fetchWeatherData = async (url, zip, key) => {
  const response = await fetch(url + zip + key);
  try {
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to POST data
const submitWeatherData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to GET Project Data and update UI
const updateWeatherUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById("temp").innerHTML = `Temperature: ${allData.temp}`;
    document.getElementById(
      "content"
    ).innerHTML = `Feelings: ${allData.content}`;
  } catch (error) {
    console.log("error", error);
  }
};
