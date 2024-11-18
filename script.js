const apiKey = `a3461ddedfeb9f8486647706319ec134`;
const api = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=`

const temp = document.querySelector('.temp')
const hum = document.querySelector('.percentagevalue')
const wind = document.querySelector('.windvalue')
const city = document.querySelector('.city')
const content1 = document.querySelector(".maincontent")
const errorContainer = document.querySelector('#error-container')

const weather = document.querySelector("#weatherIcon")
const text = "Weather Suite";
const typingSpeed = 300; // Speed in milliseconds



const searchButton = document.querySelector("#searchBtn")

searchButton.addEventListener("click", async () => {
    try {
        errorContainer.innerHTML = '';
        const inputCity = document.querySelector("#inputCity")
        const city1 = inputCity.value;
        const content = await fetch(api + city1);
        const data = await content.json();
        console.log(data)

        if (content.status === 404) {
            // Create an error message
            const error1 = document.createElement('p');
            error1.textContent = "Invalid City";
            errorContainer.innerHTML = '';
            errorContainer.appendChild(error1);
            content1.style.display = 'none';


            // Append the error message to a container (e.g., a parent element)
            // Clear any previous error messages
            errorContainer.appendChild(error1);

        } else {
            // Display weather data
            content1.style.display = 'flex';

            // Update city name
            const cityname = data.name;
            city.innerHTML = cityname;

            // Convert and display temperature
            const tempValue = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
            temp.innerHTML = tempValue + '°C';

            // Display humidity
            const humValue = data.main.humidity;
            hum.innerHTML = humValue + '%';

            // Display wind speed
            const windValue = data.wind.speed;
            wind.innerHTML = windValue + ' km/h';
            if (data.weather[0].main === 'Clear') {
                weather.src = "./image/clear.png";
            }
            else if (['Cloudy', 'Clouds', 'Mist', 'Fog', 'Smoke', 'Dust', 'Sandstorm'].includes(data.weather[0].main)) {
                weather.src = "./image/cloud.png";
            }
            else if (['PartlyCloudy', 'Haze', 'Windly'].includes(data.weather[0].main)) {
                weather.src = "./image/partly_cloudy.png";
            }
            else if (['Snow', 'Blizzard'].includes(data.weather[0].main)) {
                weather.src = "./image/snow.png";
            }
            else if (['Drizzle', 'Rain', 'Heavy Rain', 'ThunderStorm', 'Sleet', 'Freezing Rain'].includes(data.weather[0].main)) {
                weather.src = "./image/thunder.png";
            }

        }
    } catch (e) {
        const error = document.createElement('p');
        if (errorContainer) {
            error.textContent = e;
            errorContainer.innerHTML = '';
            errorContainer.appendChild(error);
            content1.style.display = 'none';
        }


    }





})

content1.style.display = 'none';
let index = 0;

function typeText() {
    const typedTextElement = document.getElementById('typed-text');
   

    function textprint() {
        
        if (index < text.length) {
            typedTextElement.textContent += text.charAt(index);
            index++;
            setTimeout(textprint, typingSpeed);
        }else {
            setTimeout(() => {
                typedTextElement.textContent = '';
                index = 0;
                typeText();
            }, 1000);
        }
    }
    textprint();
}

// Start the typing effect when the page loads
window.onload = typeText;